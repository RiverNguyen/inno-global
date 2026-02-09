'use client'

import { useParams } from 'next/navigation'
import { useLocale } from 'next-intl'
import { useEffect, useMemo, useRef } from 'react'
import useSWRInfinite from 'swr/infinite'

import ProjectCard from '@/components/shared/ProjectCard'
import { Skeleton } from '@/components/ui/skeleton'
import { useFadeInOnAppend } from '@/hooks/useFadeInOnAppend'
import { IRelatedProjectItemData, IRelatedProjectsDataRes } from '@/interfaces/detail-service.interface'
import { fetcherCMS } from '@/lib/swr'

interface RelatedProjectsProps {
  totalPages: number
  initRelatedProjects: IRelatedProjectItemData[]
  limit?: number
}

export default function RelatedProjects({ totalPages, initRelatedProjects, limit = 4 }: RelatedProjectsProps) {
  const locale = useLocale()
  const { slug } = useParams<{ slug: string }>()

  const getKey = (pageIndex: number, previousPageData: IRelatedProjectsDataRes | null) => {
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
    params.set('limit', String(limit))
    params.set('paged', String(pageIndex + 1))

    return `/wp-json/api/v1/get-all/project?${params.toString()}`
  }

  const {
    data: pages,
    isLoading,
    size,
    setSize,
  } = useSWRInfinite<IRelatedProjectsDataRes>(getKey, fetcherCMS, {
    revalidateIfStale: false,
    // We already have page 1 from SSR (`initRelatedProjects`).
    // Only fetch on the client when user scrolls (page 2+).
    revalidateOnMount: false,
    revalidateOnReconnect: false,
    revalidateOnFocus: false,
    revalidateFirstPage: false,
    fallbackData: [
      {
        data: initRelatedProjects,
        page: 1,
        totalPages: totalPages,
        limit,
      },
    ],
  })

  const projects = useMemo(() => pages?.flatMap((p) => (Array.isArray(p?.data) ? p.data : [])) ?? [], [pages])

  const lastPage = pages?.[pages.length - 1]
  const hasNextPage = lastPage ? lastPage.page < lastPage.totalPages : true

  const isLoadingMore = isLoading || (size > 0 && !!pages && typeof pages[size - 1] === 'undefined')

  const gridRef = useRef<HTMLDivElement | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  const requestingNextPageRef = useRef(false)

  const itemsKey = useMemo(() => projects.map((p) => String(p?.id ?? '')).join('|'), [projects])
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
  }, [hasNextPage, isLoadingMore, setSize])

  return (
    <div
      ref={gridRef}
      className='xsm:grid-cols-1 xsm:gap-[1.04167rem] grid grid-cols-2 gap-[2.08333rem]'
    >
      {Array.isArray(projects) &&
        projects.map((item, index) => (
          <div
            key={item?.id ?? index}
            data-fade-item
            // Prevent initial SSR items (page 1) from ever animating.
            data-gsap-animated={index < initRelatedProjects.length ? '1' : undefined}
            className='col-span-1'
          >
            <ProjectCard
              project={item}
              classNameThumbnail='h-[23.07292rem] xsm:h-[11.30984rem]'
            />
          </div>
        ))}

      {isLoadingMore ? <RelatedProjectsSkeleton count={2} /> : null}

      <div
        ref={loadMoreRef}
        className='col-span-full h-px w-full'
        aria-hidden='true'
      />
    </div>
  )
}

function RelatedProjectsSkeleton({ count = 2 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className='col-span-1'
        >
          <div className='group relative overflow-hidden'>
            <Skeleton className='xsm:h-[11.30984rem] xsm:rounded-[0.1576rem] h-[23.07292rem] w-full rounded-[0.20833rem] bg-[#F0F0F0]' />
            <div className='pt-[0.72917rem]'>
              <div className='mb-[0.3125rem] flex items-center justify-between'>
                <Skeleton className='h-[1.40625rem] w-[12rem] bg-[#F0F0F0]' />
                <Skeleton className='xsm:hidden h-[1.09375rem] w-[4rem] bg-[#F0F0F0]' />
              </div>
              <div className='flex flex-col space-y-[0.46875rem]'>
                <div className='flex items-center space-x-[0.3125rem]'>
                  <Skeleton className='size-[0.83333rem] rounded bg-[#F0F0F0]' />
                  <Skeleton className='h-[1.09375rem] w-[3rem] bg-[#F0F0F0]' />
                  <Skeleton className='h-[1.09375rem] w-[8rem] bg-[#F0F0F0]' />
                </div>
                <div className='flex items-center space-x-[0.3125rem]'>
                  <Skeleton className='size-[0.83333rem] rounded bg-[#F0F0F0]' />
                  <Skeleton className='h-[1.09375rem] w-[3rem] bg-[#F0F0F0]' />
                  <Skeleton className='h-[1.09375rem] w-[6rem] bg-[#F0F0F0]' />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
