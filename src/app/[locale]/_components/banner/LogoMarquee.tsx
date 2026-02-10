'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { IAcfImage } from '@/interfaces/acf-wp.interface'

type LogoMarqueeProps = {
  logos: IAcfImage[]
}

export default function LogoMarquee({ logos }: LogoMarqueeProps) {
  const [logoRepeat, setLogoRepeat] = useState(2)
  const marqueeTrackRef = useRef<HTMLDivElement | null>(null)
  const marqueeGroupRef = useRef<HTMLDivElement | null>(null)
  const marqueeViewportRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!marqueeViewportRef.current || !marqueeGroupRef.current) return

    const viewport = marqueeViewportRef.current
    const group = marqueeGroupRef.current
    let rafId = 0

    const computeRepeat = () => {
      const groupWidth = group.scrollWidth
      const viewportWidth = viewport.clientWidth
      if (!groupWidth || !viewportWidth) return

      // We animate by exactly 1 groupWidth, so we need enough groups to cover:
      // 1) the visible viewport and 2) one extra group to avoid gaps while wrapping.
      const needed = Math.max(2, Math.ceil(viewportWidth / groupWidth) + 2)
      setLogoRepeat((prev) => (prev === needed ? prev : needed))
    }

    const scheduleCompute = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(computeRepeat)
    }

    scheduleCompute()

    const resizeObserver = new ResizeObserver(scheduleCompute)
    resizeObserver.observe(viewport)
    resizeObserver.observe(group)

    window.addEventListener('load', scheduleCompute)

    return () => {
      cancelAnimationFrame(rafId)
      resizeObserver.disconnect()
      window.removeEventListener('load', scheduleCompute)
    }
  }, [])

  useGSAP(
    () => {
      if (!marqueeTrackRef.current || !marqueeGroupRef.current) return

      const track = marqueeTrackRef.current
      const group = marqueeGroupRef.current
      const speed = 70 // px per second
      let groupWidth = 0
      let x = 0
      let wrapX: ((value: number) => number) | null = null

      gsap.set(track, { force3D: true })
      const setX = gsap.quickSetter(track, 'x', 'px') as (value: number) => void

      const measure = () => {
        groupWidth = group.scrollWidth
        if (!groupWidth) return
        wrapX = gsap.utils.wrap(-groupWidth, 0)
        x = wrapX(x)
      }

      const loop = (_time: number, delta: number) => {
        if (!groupWidth || !wrapX) return
        x -= (speed * delta) / 1000
        x = wrapX(x)
        setX(x)
      }

      const raf = requestAnimationFrame(measure)
      window.addEventListener('load', measure)
      window.addEventListener('resize', measure)
      gsap.ticker.add(loop)

      return () => {
        cancelAnimationFrame(raf)
        window.removeEventListener('load', measure)
        window.removeEventListener('resize', measure)
        gsap.ticker.remove(loop)
      }
    },
    { scope: marqueeTrackRef, dependencies: [logoRepeat] },
  )

  return (
    <div className='absolute bottom-0 left-0 h-[5.47rem] xsm:h-[2.4rem] w-full z-10'>
      <div className='absolute left-0 top-0 size-full bg-[rgba(0,0,0,0.28)] backdrop-blur-[2.08px] xsm:backdrop-blur-[0.91px]'></div>
      <div className='absolute inset-0'>
        <div
          ref={marqueeViewportRef}
          className='mx-auto h-full w-full overflow-hidden'
        >
          <div
            ref={marqueeTrackRef}
            className='flex h-full w-max items-center whitespace-nowrap will-change-transform transform-gpu'
          >
            {Array.from({ length: logoRepeat ?? 0 }).map((_, repeatIndex) => (
              <div
                key={repeatIndex}
                ref={repeatIndex === 0 ? marqueeGroupRef : undefined}
                className='flex h-full items-center gap-[2.18rem] pr-[2.18rem] shrink-0'
              >
                {logos?.map((logo, index) => (
                  <Image
                    key={`${logo.id}-${repeatIndex}-${index}`}
                    src={logo.url}
                    alt=''
                    aria-hidden={repeatIndex !== 0}
                    width={100}
                    height={100}
                    unoptimized
                    className='h-auto w-auto sm:min-h-[1.63474rem] sm:max-h-[3.5rem] object-contain shrink-0 max-h-[1rem] min-h-[0.72rem]'
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
