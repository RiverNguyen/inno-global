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

      const lastIndex = sections.length - 1

      let observer: Observer | null = null
      let footerObserver: Observer | null = null
      let index = 0
      let isAnimating = false

      const createMainObserver = () => {
        observer?.kill()

        observer = Observer.create({
          type: 'wheel,touch',
          preventDefault: true,
          allowClicks: true,
          tolerance: 10,
          wheelSpeed: 1,
          onDown: () => scrollToSection(index + 1),
          onUp: () => scrollToSection(index - 1),
        })
      }

      const enableFooterObserver = () => {
        if (footerObserver) return

        footerObserver = Observer.create({
          type: 'wheel,touch',
          tolerance: 10,
          onUp: () => {
            footerObserver?.kill()
            footerObserver = null
            createMainObserver()
            scrollToSection(lastIndex)
          },
        })
      }

      const scrollToSection = (nextIndex: number) => {
        if (isAnimating) return

        // Scroll past last section → kill Observer, enable native footer scroll
        if (nextIndex > lastIndex) {
          observer?.kill()
          observer = null
          enableFooterObserver()
          return
        }

        // Prevent overflow at top
        if (nextIndex < 0) return

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
        createMainObserver()

        return () => {
          observer?.kill()
          footerObserver?.kill()
          observer = null
          footerObserver = null
        }
      })

      return () => {
        observer?.kill()
        footerObserver?.kill()
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
