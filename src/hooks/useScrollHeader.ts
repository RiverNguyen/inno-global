'use client'

import { useCallback, useEffect, useRef } from 'react'

import { useIsClient } from '@/hooks/useIsClient'

export function useScrollHeader(headerRef: React.RefObject<HTMLElement>) {
  const lastScrollY = useRef(0)
  const ticking = useRef(false)
  const isClient = useIsClient()

  const updateScrollDirection = useCallback(() => {
    if (!headerRef.current || !isClient) return

    const scrollY = window.scrollY

    if (!ticking.current) {
      requestAnimationFrame(() => {
        const direction = scrollY > lastScrollY.current ? 'down' : 'up'

        // Tăng threshold để giảm số lần update
        if (Math.abs(scrollY - lastScrollY.current) > 15) {
          if (direction === 'down') {
            headerRef.current!.style.transform = 'translateY(-150%)'
          } else {
            headerRef.current!.style.transform = 'translateY(0)'
          }
          lastScrollY.current = scrollY > 0 ? scrollY : 0
        }

        ticking.current = false
      })

      ticking.current = true
    }
  }, [headerRef, isClient])

  useEffect(() => {
    if (!isClient) return

    window.addEventListener('scroll', updateScrollDirection, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollDirection)
  }, [updateScrollDirection, isClient])

  return headerRef
}
