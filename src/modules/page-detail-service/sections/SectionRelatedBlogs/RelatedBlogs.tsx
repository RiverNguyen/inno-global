'use client'

import { useParams } from 'next/navigation'
import { useLocale } from 'next-intl'
import { useEffect, useMemo, useRef, useState } from 'react'
import useSWRInfinite from 'swr/infinite'

import CardBlog from '@/components/shared/CardBlog'
import { Skeleton } from '@/components/ui/skeleton'
import { useFadeInOnAppend } from '@/hooks/useFadeInOnAppend'
import { Link } from '@/i18n/navigation'
import { IRelatedBlogItemData, IRelatedBlogsDataRes } from '@/interfaces/detail-service.interface'
import { fetcherCMS } from '@/lib/swr'
import { getInfiniteScrollLockState, subscribeInfiniteScrollLock } from '@/utils/infiniteScrollLock'

interface RelatedBlogsProps {
  totalPages: number
  initRelatedBlogs: IRelatedBlogItemData[]
}

const PAGE_LIMIT = 6

export default function RelatedBlogs({ totalPages, initRelatedBlogs }: RelatedBlogsProps) {
  const locale = useLocale()
  const { slug } = useParams<{ slug: string }>()

  const [lockedSectionId, setLockedSectionId] = useState(() => getInfiniteScrollLockState().lockedSectionId)
  useEffect(() => {
    return subscribeInfiniteScrollLock(() => {
      setLockedSectionId(getInfiniteScrollLockState().lockedSectionId)
    })
  }, [])

  const getKey = (pageIndex: number, previousPageData: IRelatedBlogsDataRes | null) => {
    if (!slug) return null

    if (previousPageData) {
      const hasNext = previousPageData.page < previousPageData.totalPages
      if (!hasNext) return null
    }

    const params = new URLSearchParams()
    params.set('lang', locale)
    params.set('acf', 'true')
    params.set('tax', 'service')
    params.set('service', slug)
    params.set('limit', String(PAGE_LIMIT))
    params.set('paged', String(pageIndex + 1))

    return `/wp-json/api/v1/get-all/post?${params.toString()}`
  }

  const {
    data: pages,
    isLoading,
    size,
    setSize,
  } = useSWRInfinite<IRelatedBlogsDataRes>(getKey, fetcherCMS, {
    revalidateIfStale: false,
    // We already have page 1 from SSR (`initRelatedBlogs`).
    // Only fetch on the client when user scrolls (page 2+).
    revalidateOnMount: false,
    revalidateOnReconnect: false,
    revalidateOnFocus: false,
    revalidateFirstPage: false,
    fallbackData: [
      {
        data: initRelatedBlogs,
        page: 1,
        totalPages: totalPages,
        limit: PAGE_LIMIT,
      },
    ],
  })

  const relatedBlogs = useMemo(() => pages?.flatMap((p) => (Array.isArray(p?.data) ? p.data : [])) ?? [], [pages])

  const lastPage = pages?.[pages.length - 1]
  const hasNextPage = lastPage ? lastPage.page < lastPage.totalPages : true

  const isLoadingMore = isLoading || (size > 0 && !!pages && typeof pages[size - 1] === 'undefined')

  const gridRef = useRef<HTMLDivElement | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  const requestingNextPageRef = useRef(false)

  const itemsKey = useMemo(() => relatedBlogs.map((b) => String(b?.id ?? '')).join('|'), [relatedBlogs])
  useFadeInOnAppend({ containerRef: gridRef, itemsKey })

  useEffect(() => {
    // Reset back to page 1 when slug/locale changes
    requestingNextPageRef.current = false
    void setSize(1)
  }, [locale, setSize, slug])

  useEffect(() => {
    const el = loadMoreRef.current
    if (!el) return
    if (!hasNextPage || isLoadingMore) return

    // If this section is locked, do not attach observer (prevents auto load-more)
    if (lockedSectionId === 'related-blogs') return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return
        if (requestingNextPageRef.current) return
        requestingNextPageRef.current = true
        void setSize((curr) => curr + 1).finally(() => {
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
  }, [hasNextPage, isLoadingMore, lockedSectionId, setSize])

  return (
    <>
      <div
        ref={gridRef}
        className='xsm:grid-cols-1 xsm:gap-[1.04167rem] grid grid-cols-3 gap-[2.08333rem]'
      >
        {Array.isArray(relatedBlogs) &&
          relatedBlogs.map((item, index) => (
            <div
              key={item?.id ?? index}
              data-fade-item
              // Prevent initial SSR items (page 1) from ever animating.
              data-gsap-animated={index < initRelatedBlogs.length ? '1' : undefined}
              className='col-span-1'
            >
              <Link
                locale={locale}
                href={locale === 'vi' ? `/tin-tuc/${item?.slug}` : `/blogs/${item?.slug}`}
                className='block'
              >
                <CardBlog
                  title={item?.title}
                  category={item?.taxonomies?.category?.[0]?.name || ''}
                  date={item?.date}
                  thumbnail={item?.featured_image}
                />
              </Link>
            </div>
          ))}

        {isLoadingMore ? <RelatedBlogsSkeleton count={3} /> : null}

        <div
          ref={loadMoreRef}
          className='col-span-full h-px w-full'
          aria-hidden='true'
        />
      </div>
    </>
  )
}

function RelatedBlogsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className='col-span-1'
        >
          <article className='xsm:space-y-0 xsm:space-x-[0.52083rem] xsm:flex xsm:items-center relative w-full space-y-[0.72917rem]'>
            <Skeleton className='xsm:shrink-0 xsm:w-[5.10417rem] xsm:h-[3.60172rem] xsm:rounded-[0.11802rem] h-[14.94688rem] w-full rounded-[0.20833rem] bg-[#F0F0F0]' />
            <div className='xsm:space-y-[0.5rem] w-full space-y-[0.3125rem]'>
              <div className='flex items-center space-x-[0.625rem] uppercase'>
                <Skeleton className='h-[0.75rem] w-[4.5rem] bg-[#F0F0F0]' />
                <Skeleton className='h-[0.75rem] w-[3.5rem] bg-[#F0F0F0]' />
              </div>
              <div className='space-y-2'>
                <Skeleton className='h-[1.1rem] w-full bg-[#F0F0F0]' />
                <Skeleton className='h-[1.1rem] w-[85%] bg-[#F0F0F0]' />
              </div>
            </div>
          </article>
        </div>
      ))}
    </>
  )
}
