'use client'

import { useEffect, useRef } from 'react'

export function useInfiniteLoadMore({
  sentinelRef,
  hasNextPage,
  isLoadingMore,
  onLoadMore,
}: {
  sentinelRef: React.RefObject<Element | null>
  hasNextPage: boolean
  isLoadingMore: boolean
  onLoadMore: () => Promise<unknown> | void
}) {
  const requestingNextPageRef = useRef(false)

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    if (!hasNextPage || isLoadingMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return
        if (requestingNextPageRef.current) return
        requestingNextPageRef.current = true
        Promise.resolve(onLoadMore()).finally(() => {
          requestingNextPageRef.current = false
        })
      },
      {
        root: null,
        rootMargin: '800px 0px',
        threshold: 0,
      },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [hasNextPage, isLoadingMore, onLoadMore, sentinelRef])
}
