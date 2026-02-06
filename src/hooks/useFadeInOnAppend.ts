'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMemo, useRef } from 'react'

export function useFadeInOnAppend({
  containerRef,
  itemsKey,
  itemSelector = '[data-fade-item]',
}: {
  containerRef: React.RefObject<HTMLElement | null>
  itemsKey: string
  itemSelector?: string
}) {
  const animateObserverRef = useRef<IntersectionObserver | null>(null)
  const didHydrateRef = useRef(false)

  const deps = useMemo(() => [itemsKey, itemSelector], [itemsKey, itemSelector])

  useGSAP(
    () => {
      const container = containerRef.current
      if (!container) return

      const prefersReducedMotion =
        typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches

      const items = Array.from(container.querySelectorAll<HTMLElement>(itemSelector))
      // If we run before items are rendered (e.g. params/data not ready yet),
      // don't flip the "hydrated" flag. Otherwise the first real paint would animate.
      if (items.length === 0) return

      // On first client run (SSR -> hydrate), keep initial list visible (no re-animation).
      // We still want animations for items appended later (infinite scroll).
      if (!didHydrateRef.current) {
        didHydrateRef.current = true
        for (const el of items) {
          el.dataset.gsapAnimated = '1'
          gsap.set(el, { autoAlpha: 1, y: 0, scale: 1, clearProps: 'opacity,transform' })
        }
        return
      }

      // Ensure stable order info for staggering
      for (let i = 0; i < items.length; i++) {
        items[i].dataset.fadeOrder = String(i)
      }

      // Cleanup previous observer (re-create when list changes)
      animateObserverRef.current?.disconnect()

      // Initialize hidden state for items that haven't animated yet
      for (const el of items) {
        if (el.dataset.gsapAnimated === '1') continue
        if (prefersReducedMotion) {
          el.dataset.gsapAnimated = '1'
          gsap.set(el, { autoAlpha: 1, y: 0, clearProps: 'opacity,transform' })
          continue
        }
        gsap.set(el, { autoAlpha: 0, y: 24, scale: 0.98 })
      }

      if (prefersReducedMotion) return

      animateObserverRef.current = new IntersectionObserver(
        (entries) => {
          const newlyVisible = entries
            .filter((e) => e.isIntersecting)
            .map((e) => e.target as HTMLElement)
            .filter((el) => el.dataset.gsapAnimated !== '1')

          if (newlyVisible.length === 0) return

          newlyVisible.sort((a, b) => {
            const ai = Number(a.dataset.fadeOrder ?? 0)
            const bi = Number(b.dataset.fadeOrder ?? 0)
            return ai - bi
          })

          newlyVisible.forEach((el) => {
            el.dataset.gsapAnimated = '1'
            animateObserverRef.current?.unobserve(el)
          })

          gsap.to(newlyVisible, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            delay: 0.08,
            ease: 'power2.out',
            stagger: 0.09,
            clearProps: 'opacity,transform',
            overwrite: 'auto',
          })
        },
        {
          root: null,
          rootMargin: '0px 0px -10% 0px',
          threshold: 0.1,
        },
      )

      for (const el of items) {
        if (el.dataset.gsapAnimated === '1') continue
        animateObserverRef.current.observe(el)
      }
    },
    { dependencies: deps, scope: containerRef },
  )
}

