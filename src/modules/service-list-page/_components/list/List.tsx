'use client'

import { useLocale } from 'next-intl'
import { useCallback, useMemo, useRef } from 'react'
import useSWRInfinite from 'swr/infinite'

import { fetcherCMS } from '@/lib/swr'

import ServiceCard from './_components/ServiceCard'
import ServiceGrid from './_components/ServiceGrid'
import ServiceListSkeleton from './_components/ServiceListSkeleton'
import { useFadeInOnAppend } from './_hooks/useFadeInOnAppend'
import { useInfiniteLoadMore } from './_hooks/useInfiniteLoadMore'
import { getHasNextPage, getItemDescription, getItemImageSrc, getItemTitle, PAGE_LIMIT } from './_utils/helpers'
import type { DataSource, PagedApiResponse, ServiceLikeItem } from './_utils/types'

export default function List({
  initialPage,
  dataSource = 'project',
}: {
  initialPage: PagedApiResponse<ServiceLikeItem>
  dataSource?: DataSource
}) {
  const locale = useLocale()

  const baseQueryString = useMemo(() => {
    const params = new URLSearchParams()
    params.append('lang', locale)
    params.append('orderby', 'date')
    params.append('order', 'DESC')
    params.append('limit', PAGE_LIMIT.toString())

    if (dataSource === 'service') {
      params.append('fields', 'thumbnail')
    } else {
      params.append('tax', 'location,investor,service,building_type,starting_year')
    }

    return params.toString()
  }, [dataSource, locale])

  const getKey = (pageIndex: number, previousPageData: PagedApiResponse<ServiceLikeItem> | null) => {
    if (previousPageData) {
      if (!getHasNextPage(previousPageData, PAGE_LIMIT)) return null
    }

    const params = new URLSearchParams(baseQueryString)
    params.set('paged', String(pageIndex + 1))

    if (dataSource === 'service') {
      return `/wp-json/api/v1/get-all-taxonomy/service?${params.toString()}`
    }

    return `/wp-json/api/v1/get-all/project?${params.toString()}`
  }

  const {
    data: pages,
    isLoading,
    size,
    setSize,
  } = useSWRInfinite<PagedApiResponse<ServiceLikeItem>>(getKey, fetcherCMS, {
    revalidateIfStale: false,
    revalidateOnMount: true,
    revalidateOnReconnect: false,
    revalidateOnFocus: false,
    revalidateFirstPage: true,
    fallbackData: [initialPage],
  })

  const items = useMemo(() => {
    return pages?.flatMap((p) => (Array.isArray(p?.data) ? p.data : [])) ?? []
  }, [pages])

  const lastPage = pages?.[pages.length - 1]
  const hasNextPage = getHasNextPage(lastPage, PAGE_LIMIT)
  const isLoadingMore = isLoading || (size > 0 && !!pages && typeof pages[size - 1] === 'undefined')
  const isInitialLoading = isLoading && items.length === 0

  const gridRef = useRef<HTMLDivElement | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  const itemsKey = useMemo(
    () => items.map((it) => String(it?.id ?? it?.slug ?? '')).join('|'),
    [items],
  )

  useFadeInOnAppend({ containerRef: gridRef, itemsKey, itemSelector: '[data-service-item]' })

  const handleLoadMore = useCallback(() => setSize((curr) => curr + 1), [setSize])
  useInfiniteLoadMore({
    sentinelRef: loadMoreRef,
    hasNextPage,
    isLoadingMore,
    onLoadMore: handleLoadMore,
  })

  const listHrefBase = locale === 'vi' ? '/danh-sach-dich-vu' : '/services'
  const projectListHref = locale === 'vi' ? '/danh-sach-du-an' : '/projects'

  return (
    <section className='xsm:pt-[1.45833rem] xsm:pb-[3.33333rem] xsm:px-[0.83333rem] mx-auto w-full max-w-[75rem] py-[6.25rem]'>
      <ServiceGrid ref={gridRef}>
        {isInitialLoading ? (
          <ServiceListSkeleton count={6} />
        ) : (
          <>
            {items.map((item, index) => {
              const title = getItemTitle(item)
              const description = getItemDescription(item)
              const imageSrc = getItemImageSrc(item)

              const href =
                dataSource === 'service' && item?.slug
                  ? `${listHrefBase}/${item.slug}`
                  : projectListHref

              return (
                <ServiceCard
                  key={String(item?.id ?? item?.slug ?? index)}
                  href={href}
                  title={title}
                  description={description}
                  imageSrc={imageSrc}
                />
              )
            })}

            {isLoadingMore ? <ServiceListSkeleton /> : null}

            <div
              ref={loadMoreRef}
              className='col-span-full h-px w-full'
              aria-hidden='true'
            />
          </>
        )}
      </ServiceGrid>
    </section>
  )
}

