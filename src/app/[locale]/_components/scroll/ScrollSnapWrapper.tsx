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
  includeFooterSnap?: boolean
}>

export default function ScrollSnapWrapper({
  children,
  selector = '[data-snap]',
  minWidth = 1025,
  includeFooterSnap = false,
}: ScrollSnapWrapperProps) {
  const rootRef = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      const sections = gsap.utils.toArray<HTMLElement>(selector)
      if (sections.length === 0) return

      let observer: Observer | null = null
      let index = 0
      let isAnimating = false
      let isProgrammaticScroll = false
      let scrollEndTimer: ReturnType<typeof setTimeout> | null = null
      let actionLockedUntil = 0
      let lastScrollY = window.scrollY
      let lastScrollDirection: 'up' | 'down' = 'down'

      const getFooter = () => (includeFooterSnap ? document.querySelector<HTMLElement>('footer') : null)
      type SnapTarget = {
        kind: 'section' | 'footer'
        element: HTMLElement
      }

      const getSnapTargets = (): SnapTarget[] => {
        const targets: SnapTarget[] = sections.map((section) => ({
          kind: 'section',
          element: section,
        }))
        const footer = getFooter()
        if (footer) {
          targets.push({
            kind: 'footer',
            element: footer,
          })
        }
        return targets
      }

      const canTriggerSnap = () => Date.now() >= actionLockedUntil && !isAnimating

      const syncIndexFromScroll = () => {
        const targets = getSnapTargets()
        if (targets.length === 0) return

        let nearestIndex = 0
        let nearestDistance = Number.POSITIVE_INFINITY
        targets.forEach((target, targetIndex) => {
          const distance = Math.abs(window.scrollY - target.element.offsetTop)
          if (distance < nearestDistance) {
            nearestDistance = distance
            nearestIndex = targetIndex
          }
        })
        index = nearestIndex
      }

      const getDominantTargetIndex = () => {
        const targets = getSnapTargets()
        if (targets.length === 0) return 0

        const viewportHeight = window.innerHeight
        let dominantIndex = index
        let maxVisible = -1

        targets.forEach((target, targetIndex) => {
          const rect = target.element.getBoundingClientRect()
          const visible = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0))
          if (visible > maxVisible) {
            maxVisible = visible
            dominantIndex = targetIndex
          }
        })

        return dominantIndex
      }

      const scrollToTarget = (targetIndex: number) => {
        const targets = getSnapTargets()
        if (targets.length === 0) return
        if (!canTriggerSnap()) return
        if (targetIndex < 0 || targetIndex >= targets.length) return

        const target = targets[targetIndex]
        isAnimating = true
        isProgrammaticScroll = true
        actionLockedUntil = Date.now() + 1100
        index = targetIndex

        gsap.to(window, {
          scrollTo: {
            y: target.element,
            autoKill: false,
          },
          duration: 0.9,
          ease: 'power2.out',
          onComplete: () => {
            isAnimating = false
            isProgrammaticScroll = false
            if (target.kind === 'footer' && !includeFooterSnap) {
              observer?.disable()
            } else {
              observer?.enable()
            }
          },
          onInterrupt: () => {
            isAnimating = false
            isProgrammaticScroll = false
          },
        })
      }

      const snapToDominantTarget = () => {
        if (isAnimating) return
        syncIndexFromScroll()

        const targetIndex = getDominantTargetIndex()
        const targets = getSnapTargets()
        const target = targets[targetIndex]
        if (!target) return

        if (lastScrollDirection === 'up' && target.kind === 'footer' && includeFooterSnap) {
          scrollToTarget(Math.max(0, targets.length - 2))
          return
        }

        const distance = Math.abs(window.scrollY - target.element.offsetTop)
        if (targetIndex !== index || distance > 2) {
          scrollToTarget(targetIndex)
        } else if (target.kind !== 'footer' || includeFooterSnap) {
          observer?.enable()
        }
      }

      const handleNativeScroll = () => {
        if (isProgrammaticScroll) return

        const currentY = window.scrollY
        if (currentY > lastScrollY) lastScrollDirection = 'down'
        else if (currentY < lastScrollY) lastScrollDirection = 'up'
        lastScrollY = currentY

        observer?.disable()

        if (scrollEndTimer) clearTimeout(scrollEndTimer)
        scrollEndTimer = setTimeout(() => {
          snapToDominantTarget()
        }, 2000)
      }

      const mm = gsap.matchMedia()
      mm.add(`(min-width: ${minWidth}px)`, () => {
        observer = Observer.create({
          type: 'wheel,touch',
          preventDefault: true,
          allowClicks: true,
          tolerance: 10,
          wheelSpeed: 1,
          onDown: () => {
            syncIndexFromScroll()
            const targets = getSnapTargets()
            scrollToTarget(Math.min(index + 1, targets.length - 1))
          },
          onUp: () => {
            syncIndexFromScroll()
            scrollToTarget(Math.max(index - 1, 0))
          },
        })

        window.addEventListener('scroll', handleNativeScroll, { passive: true })
        syncIndexFromScroll()

        return () => {
          if (scrollEndTimer) clearTimeout(scrollEndTimer)
          window.removeEventListener('scroll', handleNativeScroll)
          observer?.kill()
          observer = null
        }
      })

      return () => {
        if (scrollEndTimer) clearTimeout(scrollEndTimer)
        window.removeEventListener('scroll', handleNativeScroll)
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
