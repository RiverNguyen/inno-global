/* eslint-disable no-duplicate-imports */
'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
// @ts-ignore
import { Observer } from 'gsap/Observer'
// @ts-ignore
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import type { PropsWithChildren } from 'react'
import { useRef } from 'react'

gsap.registerPlugin(Observer, ScrollToPlugin)

type ScrollSnapWrapperProps = PropsWithChildren<{
  selector?: string
  minWidth?: number
}>

export default function ScrollSnapWrapper({
  children,
  selector = '[data-snap]',
  minWidth = 1025,
}: ScrollSnapWrapperProps) {
  const rootRef = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      const sections = gsap.utils.toArray<HTMLElement>(selector)
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
      mm.add(`(min-width: ${minWidth}px)`, () => {
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
      {children}
    </main>
  )
}
