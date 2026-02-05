'use client'

// import Link from 'next/link'
// import { useTranslations } from 'next-intl'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Observer } from 'gsap/Observer'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { useRef } from 'react'

// export const dynamicParams = false
// export function generateStaticParams() {
//   return [{ locale: 'vi' }, { locale: 'en' }]
// }

gsap.registerPlugin(Observer, ScrollToPlugin)

export default function Page() {
  // const t = useTranslations('HomePage')
  const rootRef = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      const sections = gsap.utils.toArray<HTMLElement>('[data-snap]')
      if (sections.length === 0) return

      let observer: Observer | null = null
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

      const mm = gsap.matchMedia()
      mm.add('(min-width: 1025px)', () => {
        observer = Observer.create({
          type: 'wheel,touch',
          preventDefault: true,
          allowClicks: true,
          tolerance: 10,
          wheelSpeed: 1,
          onDown: () => scrollToSection(index + 1),
          onUp: () => scrollToSection(index - 1),
        })

        return () => {
          observer?.kill()
          observer = null
        }
      })

      return () => {
        observer?.kill()
        mm.revert()
      }
    },
    { scope: rootRef },
  )

  return (
    <main
      ref={rootRef}
      className='relative bg-white'
    >
      <section
        data-snap
        className='h-screen bg-red-200'
      ></section>
      <section
        data-snap
        className='h-[50vh] bg-black'
      ></section>
      <section
        data-snap
        className='h-[80vh] bg-yellow-100'
      ></section>
      <section
        data-snap
        className='h-[70vh] bg-black'
      ></section>
      <section
        data-snap
        className='h-[50vh] bg-red-300'
      ></section>
      <section
        data-snap
        className='h-[60vh] bg-yellow-500'
      ></section>
    </main>
  )
}
