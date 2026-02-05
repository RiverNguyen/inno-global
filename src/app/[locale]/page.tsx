'use client'

// import Link from 'next/link'
// import { useTranslations } from 'next-intl'

import gsap from 'gsap'
import { Observer } from 'gsap/all'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { useEffect, useRef } from 'react'

// export const dynamicParams = false
// export function generateStaticParams() {
//   return [{ locale: 'vi' }, { locale: 'en' }]
// }

gsap.registerPlugin(Observer, ScrollToPlugin)

export default function Page() {
  // const t = useTranslations('HomePage')
  const rootRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!rootRef.current) return

    let observer: Observer | null = null

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('[data-snap]')
      if (sections.length === 0) return

      let index = 0
      let isAnimating = false

      const scrollToSection = (nextIndex: number) => {
        if (isAnimating) return
        if (nextIndex < 0 || nextIndex >= sections.length) return

        isAnimating = true
        index = nextIndex

        gsap.to(window, {
          scrollTo: {
            y: sections[index],
            autoKill: false,
          },
          duration: 0.9,
          ease: 'power2.out',
          onComplete: () => {
            isAnimating = false
          },
        })
      }

      observer = Observer.create({
        type: 'wheel,touch',
        preventDefault: true,
        allowClicks: true,
        tolerance: 10,
        wheelSpeed: 1,
        onDown: () => scrollToSection(index + 1),
        onUp: () => scrollToSection(index - 1),
      })
    }, rootRef)

    return () => {
      observer?.kill()
      ctx.revert()
    }
  }, [])

  return (
    <main
      ref={rootRef}
      className='bg-white relative'
    >
      <section
        data-snap
        className='bg-red-200 h-screen'
      ></section>
      <section
        data-snap
        className='bg-black h-[50vh]'
      ></section>
      <section
        data-snap
        className='bg-yellow-100 h-[80vh]'
      ></section>
      <section
        data-snap
        className='bg-black h-[70vh]'
      ></section>
      <section
        data-snap
        className='bg-red-300 h-[50vh]'
      ></section>
      <section
        data-snap
        className='bg-yellow-500 h-[60vh]'
      ></section>
    </main>
  )
}
