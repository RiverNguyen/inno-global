'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import { useRef } from 'react'

const stats = [
  {
    value: 500,
    suffix: '+',
    label: 'Dự án đã thực hiện',
  },
  {
    value: 300,
    suffix: '+',
    label: 'Nhân sự đang làm việc',
  },
  {
    value: 100,
    suffix: '+',
    label: 'Khách hàng và đối tác',
  },
  {
    value: 39,
    suffix: '+',
    label: 'Công trình đạt giải thưởng',
  },
  {
    value: 10,
    suffix: '+',
    label: 'Công ty trong hệ thống',
  },
]

function StatCard({ stat }: { stat: (typeof stats)[number] }) {
  return (
    <>
      <div className='pc-h1-64-s text-primary-red tabular-nums leading-none xsm:mb-28-number'>
        <div className='inline-flex items-end'>
          {String(stat.value)
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
          {stat.suffix ? (
            <span className='ml-[0.1em] inline-block text-[2rem] translate-y-[-1rem] xsm:translate-y-[0.25rem] font-bold xsm:mb-28-number'>
              {stat.suffix}
            </span>
          ) : null}
        </div>
      </div>
      <p className='pc-body-18-r-primary text-text-60 xsm:pc-sub-12-r'>{stat.label}</p>
    </>
  )
}

export default function AboutUsHome() {
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
      className='relative h-screen w-full xsm:h-fit'
    >
      <Image
        src='/home/d-bg-about-us.jpg'
        alt=''
        fill
        sizes='100vw'
        className='object-cover size-full xsm:hidden'
      />
      <Image
        src='/home/d-bg-about-us-mb.png'
        alt=''
        fill
        sizes='100vw'
        className='object-cover w-full h-auto sm:hidden absolute bottom-0 left-0'
      />
      <div className='sm:absolute-center z-10 h-screen xsm:h-fit container flex justify-end xsm:pt-[3.33rem] xsm:px-[0.83rem]'>
        <div className='sm:w-[36.4rem] h-fit sm:my-auto'>
          <h2 className='pc-h1-64-s text-text-100 xsm:mb-h2-24-sm'>
            Về chúng tôi <br />
            chất lượng – niềm tin
          </h2>
          <p className='pc-body-20-r text-text-80 mt-[02.08rem] xsm:mt-[0.94rem] xsm:mb-body-14-r'>
            INNO là đơn vị thi công – kiến trúc tiên phong, ứng dụng giải pháp sáng tạo để đảm bảo chất lượng và độ bền
            công trình. Chúng tôi theo đuổi thiết kế tối ưu, thẩm mỹ và linh hoạt, tạo nên không gian sống hiện đại.
          </p>
          <div className='mt-[1.67rem] xsm:mt-[1.46rem]'>
            <div className='xsm:hidden grid grid-cols-3 gap-x-[2.6rem] gap-y-[1.88rem]'>
              {stats.map((stat) => (
                <div key={`pc-${stat.label}`}>
                  <StatCard stat={stat} />
                </div>
              ))}
            </div>

            <div className='sm:hidden xsm:pb-[7.34rem]'>
              {[0, 2, 4].map((startIndex) => {
                const rowStats = stats.slice(startIndex, startIndex + 2)

                return (
                  <div
                    key={`mb-${startIndex}`}
                    className='grid grid-cols-2 border-t border-[rgba(9,9,9,0.12)]'
                  >
                    {rowStats.map((stat, colIndex) => (
                      <div
                        key={stat.label}
                        className={`pt-[0.83rem] pb-[0.73rem] ${colIndex === 0 ? (rowStats.length > 1 ? 'pr-[0.52rem]' : '') : 'pl-[0.52rem]'}`}
                      >
                        <StatCard stat={stat} />
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
