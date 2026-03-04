'use client'

import gsap from 'gsap'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

import { IMedia } from '@/interfaces/media.interface'

const ScrollToTopIcon = ({ circleRef }: { circleRef: React.RefObject<SVGCircleElement | null> }) => {
  return (
    <svg
      width='61'
      height='61'
      viewBox='0 0 61 61'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='size-[3rem] xsm:size-[2rem]'
    >
      <g clipPath='url(#clip0_604_10721)'>
        <circle
          id='circle'
          ref={circleRef}
          cx='30.4477'
          cy='30.3598'
          r='28.8142'
          stroke='#D32F2F'
          strokeWidth='1.82947'
        />
        <path
          d='M30.0777 41.7945L30.0777 21.6703'
          stroke='#D32F2F'
          strokeWidth='3.65894'
        />
        <path
          d='M20.9648 30.7812L30.0726 21.6735L39.1804 30.7812'
          stroke='#D32F2F'
          strokeWidth='3.65894'
        />
      </g>
      <defs>
        <clipPath id='clip0_604_10721'>
          <rect
            width='59.4578'
            height='59.4578'
            fill='white'
            transform='translate(0.71875 0.630859)'
          />
        </clipPath>
      </defs>
    </svg>
  )
}

const CTA = ({ data }: { data: { icon: IMedia; link: string }[] }) => {
  const circleRef = useRef<SVGCircleElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isVisibleRef = useRef(false)

  useEffect(() => {
    const circle = circleRef.current
    if (!circle) return

    const radius = circle.r.baseVal.value
    const circumference = 2 * Math.PI * radius

    circle.style.strokeDasharray = `${circumference} ${circumference}`
    circle.style.strokeDashoffset = `${circumference}`
    circle.style.transform = 'rotate(-90deg)'
    circle.style.transformOrigin = '50% 50%'

    let rafId: number | null = null
    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - window.innerHeight
      const progress = height > 0 ? Math.min(Math.max(scrollTop / height, 0), 1) : 0
      const offset = circumference - progress * circumference
      circle.style.strokeDashoffset = `${offset}`
      rafId = null
    }

    const throttledUpdate = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateProgress)
      }
    }

    updateProgress()
    window.addEventListener('scroll', throttledUpdate, { passive: true })
    window.addEventListener('resize', throttledUpdate)

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      window.removeEventListener('scroll', throttledUpdate)
      window.removeEventListener('resize', throttledUpdate)
    }
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.set(el, { x: 40, autoAlpha: 0, pointerEvents: 'none' })
    }, el)

    let rafId: number | null = null

    const setVisible = (nextVisible: boolean) => {
      if (isVisibleRef.current === nextVisible) return
      isVisibleRef.current = nextVisible

      gsap.killTweensOf(el)

      if (nextVisible) {
        gsap.to(el, {
          x: 0,
          autoAlpha: 1,
          duration: 0.5,
          ease: 'power3.out',
          overwrite: true,
          onStart: () => {
            el.style.pointerEvents = 'auto'
          },
        })
      } else {
        gsap.to(el, {
          x: 40,
          autoAlpha: 0,
          duration: 0.35,
          ease: 'power2.in',
          overwrite: true,
          onComplete: () => {
            el.style.pointerEvents = 'none'
          },
        })
      }
    }

    const update = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      setVisible(scrollTop > 200)
      rafId = null
    }

    const onScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      ctx.revert()
    }
  }, [])

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div
      ref={containerRef}
      className='fixed xsm:right-4 right-8 bottom-16 xsm:bottom-20 z-[100] flex flex-col items-center space-y-4 will-change-transform'
    >
      {data.map((item, index) => (
        <Link
          href={item.link}
          target='_blank'
          key={item.link}
          className='relative block shadow-[0_0_30px_rgba(0,0,0,0.08)] rounded-full'
        >
          {index === data.length - 1 && <div className='ripple_video' />}
          <Image
            src={item.icon.url}
            alt={item.icon.alt}
            width={24}
            height={24}
            unoptimized
            className='size-[3rem] object-contain xsm:size-[2rem]'
          />
        </Link>
      ))}
      <button
        type='button'
        onClick={handleScrollToTop}
        aria-label='Scroll to top'
        className='cursor-pointer h-full w-full'
      >
        <ScrollToTopIcon circleRef={circleRef} />
      </button>
    </div>
  )
}

export default CTA
