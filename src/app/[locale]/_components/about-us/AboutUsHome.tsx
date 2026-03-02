'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import { useRef } from 'react'

import { ISectionAboutUsAcf } from '@/interfaces/home.interface'

function StatCard({ number, subtitle }: { number: string; subtitle: string }) {
  return (
    <>
      <div className='pc-h1-64-s text-primary-red xsm:mb-28-number leading-none tabular-nums'>
        <div className='inline-flex items-end'>
          {String(number)
            .split('')
            .map((char, charIndex) => {
              if (!/^\d$/.test(char)) {
                return (
                  <span
                    key={`${char}-${charIndex}`}
                    className='inline-block'
                  >
                    {char}
                  </span>
                )
              }

              const digit = Number(char)
              const steps = charIndex === 0 ? digit : 10 + digit
              const delay = charIndex * 0.2
              return (
                <span
                  key={`${char}-${charIndex}`}
                  className='relative inline-block h-[1em] overflow-hidden align-bottom'
                >
                  <span
                    className='block will-change-transform'
                    data-digit-track
                    data-digit={digit}
                    data-steps={steps}
                    data-delay={delay}
                  >
                    {Array.from({ length: steps + 1 }).map((_, idx) => {
                      const value = idx === steps ? digit : idx % 10
                      return (
                        <span
                          key={idx}
                          data-digit-item
                          className='block h-[1em] leading-none'
                        >
                          {value}
                        </span>
                      )
                    })}
                  </span>
                </span>
              )
            })}
          <span className='xsm:translate-y-[0.25rem] xsm:mb-28-number ml-[0.1em] inline-block translate-y-[-1rem] text-[2rem] font-bold'>
            +
          </span>
        </div>
      </div>
      <p className='pc-body-18-r-primary text-text-60 xsm:pc-sub-12-r whitespace-nowrap'>{subtitle}</p>
    </>
  )
}

export default function AboutUsHome({ data }: { data?: ISectionAboutUsAcf }) {
  if (!data) return null
  const { background_pc, background_mb, title, description, number } = data
  const rootRef = useRef<HTMLDivElement | null>(null)
  const hasAnimatedRef = useRef(false)

  useGSAP(
    () => {
      if (!rootRef.current) return

      const tracks = gsap.utils.toArray<HTMLElement>('[data-digit-track]', rootRef.current)

      const animate = () => {
        if (hasAnimatedRef.current) return
        hasAnimatedRef.current = true

        tracks.forEach((track) => {
          const target = Number(track.dataset.digit ?? 0)
          const steps = Number(track.dataset.steps ?? target)
          const delay = Number(track.dataset.delay ?? 0)
          gsap.set(track, { y: '0em' })
          gsap.to(track, {
            y: `${-steps}em`,
            duration: 2,
            ease: 'power2.out',
            delay,
          })
        })
      }

      if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
              requestAnimationFrame(animate)
              observer.disconnect()
            }
          },
          { threshold: 0.2 },
        )
        observer.observe(rootRef.current)
        return () => observer.disconnect()
      }

      requestAnimationFrame(animate)
    },
    { scope: rootRef },
  )

  return (
    <div
      ref={rootRef}
      className='xsm:h-fit relative h-screen w-full'
    >
      <Image
        src={background_pc.url}
        alt=''
        fill
        sizes='100vw'
        className='xsm:hidden pointer-events-none size-full object-cover'
      />
      <Image
        src={background_mb.url}
        alt=''
        width={375}
        height={385}
        className='pointer-events-none absolute bottom-0 left-0 !h-auto w-full object-cover sm:hidden'
      />
      <div
        className='pointer-events-none absolute bottom-[-3px] left-0 h-[3.13rem] w-full sm:hidden'
        style={{
          background:
            'linear-gradient(180deg, rgba(248, 248, 248, 0.00) 29.34%, rgba(248, 248, 248, 0.60) 44.75%, rgba(248, 248, 248, 0.90) 64.91%, #FFF 97.1%)',
        }}
      ></div>
      <div className='sm:absolute-center xsm:h-fit xsm:pt-[3.33rem] xsm:px-[0.83rem] z-10 container flex h-screen justify-end'>
        <div className='h-fit sm:my-auto sm:w-[36.4rem]'>
          <h2
            className='pc-h1-64-s text-text-100 xsm:mb-h2-24-sm'
            dangerouslySetInnerHTML={{ __html: title }}
          ></h2>
          <p className='pc-body-20-r text-text-80 xsm:mt-[0.94rem] xsm:mb-body-14-r mt-[02.08rem]'>{description}</p>
          <div className='xsm:mt-[1.46rem] mt-[1.67rem]'>
            <div className='xsm:hidden grid grid-cols-3 gap-x-[2.6rem] gap-y-[1.88rem]'>
              {Array.isArray(number) &&
                number.map((stat) => (
                  <div key={`pc-${stat.number}`}>
                    <StatCard
                      number={stat.number}
                      subtitle={stat.subtitle}
                    />
                  </div>
                ))}
            </div>

            <div className='xsm:pb-[7.34rem] sm:hidden'>
              {Array.isArray(number) && [0, 2, 4].map((startIndex) => {
                const rowStats = number.slice(startIndex, startIndex + 2)

                return (
                  <div
                    key={`mb-${startIndex}`}
                    className='grid grid-cols-2 border-t border-[rgba(9,9,9,0.12)]'
                  >
                    {rowStats.map(({ number, subtitle }, colIndex) => (
                      <div
                        key={colIndex}
                        className={`pt-[0.83rem] pb-[0.73rem] ${colIndex === 0 ? (rowStats.length > 1 ? 'pr-[0.52rem]' : '') : 'pl-[0.52rem]'}`}
                      >
                        <StatCard
                          number={number}
                          subtitle={subtitle}
                        />
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
