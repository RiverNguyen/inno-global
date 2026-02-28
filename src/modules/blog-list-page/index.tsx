'use client'
import { useDebounce } from '@uidotdev/usehooks'
import { useLocale, useTranslations } from 'next-intl'
import { parseAsArrayOf, parseAsString, useQueryStates } from 'nuqs'
import { startTransition, useEffect, useMemo, useRef, useState } from 'react'
import useSWRInfinite from 'swr/infinite'

import ICSearch from '@/components/icons/ICSearch'
import Breadcrumb from '@/components/shared/Breadcrumb'
import { IBlog, ITaxonomies } from '@/interfaces/blog.interface'
import { fetcherCMS } from '@/lib/swr'
import { cn } from '@/lib/utils'
import BlogListContent from '@/modules/blog-list-page/components/BlogListContent'
import BlogListSkeleton from '@/modules/blog-list-page/components/BlogListSkeleton'
import FilterPopup from '@/modules/blog-list-page/components/FilterPopup'
import SelectedTags from '@/modules/blog-list-page/components/SelectedTags'
import SortPopup from '@/modules/blog-list-page/components/SortPopup'
import { scrollToElementInContainer } from '@/utils/scrollToElementInContainer'

type FilterItem = { label: string; value: string }

type BlogListApiResponse = {
  success?: boolean
  data?: IBlog[]
  total?: number
  totalPages?: number
  page?: number
  limit?: number
  hasMore?: boolean
  hasNextPage?: boolean
  hasPrevPage?: boolean
  nextPage?: number
}

interface BlogListPageProps {
  initialBlogs: BlogListApiResponse
  taxonomies: ITaxonomies
}

const TAX_QUERY = 'starting_year'
const PAGE_LIMIT = 12

export default function BlogListPage({ initialBlogs, taxonomies }: BlogListPageProps) {
  const locale = useLocale()

  const t = useTranslations('BlogListPage')

  // Filter out unwanted categories (e.g., "uncategorized", empty names)
  const filteredCategories = useMemo(() => {
    return (taxonomies.categories?.data ?? []).filter((cat) => {
      if (!cat?.id) return false
      if (cat.id === 1) return false
      if (cat.id === 7) return false
      if (!cat?.name?.trim()) return false
      if (cat.name.trim().toLowerCase() === 'uncategorized') return false

      return true
    })
  }, [taxonomies.categories?.data])

  const yearItems: FilterItem[] = useMemo(
    () => taxonomies.years.data.map((y) => ({ label: y.name, value: y.slug })),
    [taxonomies.years.data],
  )

  // Use nuqs to manage query params — syncs with URL without full server round-trip
  const [
    {
      starting_year: selectedYears = [],
      category: selectedCategory = '',
      sort: sortValue = 'newest',
      s: searchQuery = '',
    },
    setQueryStates,
  ] = useQueryStates(
    {
      starting_year: parseAsArrayOf(parseAsString).withDefault([]),
      category: parseAsString.withDefault(''),
      sort: parseAsString.withDefault('newest'),
      s: parseAsString.withDefault(''),
    },
    {
      history: 'replace',
      shallow: true, // client-only URL update (history.replaceState), no router.replace → no server GET
      scroll: false,
    },
  )

  // Local state for search input (for immediate UI update)
  const [searchInput, setSearchInput] = useState(searchQuery)

  // Debounce search query - update URL after 500ms of no typing
  const debouncedSearchInput = useDebounce(searchInput, 500)

  // Update URL when debounced search value changes
  useEffect(() => {
    if (debouncedSearchInput !== searchQuery) {
      setQueryStates({ s: debouncedSearchInput })
    }
  }, [debouncedSearchInput, searchQuery, setQueryStates])

  // Sync local state with URL param when it changes externally
  useEffect(() => {
    setSearchInput(searchQuery)
  }, [searchQuery])

  // Wrapper functions to reset page when filters change
  const handleYearsChange = (newYears: string[]) => {
    setQueryStates({
      starting_year: newYears,
    })
  }

  const baseQueryString = useMemo(() => {
    const params = new URLSearchParams()

    // Add lang parameter
    params.append('lang', locale)

    // Add limit (page is controlled by SWR Infinite via `paged`)
    params.append('limit', PAGE_LIMIT.toString())

    // Add filters from state (normalize order so SWR keys stay stable)
    const normalizedYears = [...selectedYears].sort()

    // Build tax param to match active filters
    const activeTaxonomies = new Set<string>()
    if (normalizedYears.length > 0) activeTaxonomies.add('starting_year')
    if (selectedCategory) activeTaxonomies.add('category')

    // Keep default behavior when no filters are selected
    const taxValue = activeTaxonomies.size > 0 ? Array.from(activeTaxonomies).sort().join(',') : TAX_QUERY
    params.append('tax', taxValue)

    if (normalizedYears.length > 0) {
      // API expects comma-separated values, e.g. starting_year=2020,2022
      params.append('starting_year', normalizedYears.join(','))
    }
    if (selectedCategory) {
      params.append('category', selectedCategory)
    }

    // Add sort parameters
    params.append('orderby', 'date')
    params.append('order', sortValue === 'newest' ? 'DESC' : 'ASC')

    // Add search parameter
    if (searchQuery) {
      params.append('s', searchQuery)
    }

    return params.toString()
  }, [locale, selectedYears, selectedCategory, sortValue, searchQuery])

  const [useInitialFallbackData, setUseInitialFallbackData] = useState(true)

  // Only use server-provided `initialBlogs` for the very first paint.
  // When filters change, we don't want to "flash" back to the default list (initialBlogs).
  useEffect(() => {
    setUseInitialFallbackData(false)
  }, [])

  // Track filter changes to show skeleton only for filtering (not for initial mount).
  const prevBaseQueryStringRef = useRef<string | null>(null)
  const [isFiltering, setIsFiltering] = useState(false)

  useEffect(() => {
    const prev = prevBaseQueryStringRef.current
    prevBaseQueryStringRef.current = baseQueryString
    if (prev === null) return
    if (prev !== baseQueryString) {
      setIsFiltering(true)
    }
  }, [baseQueryString])

  const getKey = (pageIndex: number, previousPageData: BlogListApiResponse | null) => {
    if (previousPageData) {
      const hasNext =
        previousPageData.hasNextPage ??
        previousPageData.hasMore ??
        (typeof previousPageData.nextPage === 'number' ? true : undefined)
      if (hasNext === false) return null
    }

    const params = new URLSearchParams(baseQueryString)
    params.set('paged', String(pageIndex + 1))
    return `/wp-json/api/v1/get-all/post?${params.toString()}`
  }

  const {
    data: pages,
    isLoading,
    isValidating,
    size,
    setSize,
  } = useSWRInfinite<BlogListApiResponse>(getKey, fetcherCMS, {
    revalidateIfStale: false,
    // We already fetched on the server; don't revalidate on client mount.
    // Only fetch when key changes (filters) or when infinite-loading next pages.
    revalidateOnMount: false,
    revalidateOnReconnect: false,
    revalidateOnFocus: false,
    revalidateFirstPage: false,
    // Keep the current list while fetching a new filtered list (prevents UI "jump").
    keepPreviousData: true,
    fallbackData: useInitialFallbackData ? [initialBlogs] : undefined,
  })

  const displayBlogs = useMemo(() => {
    const list = pages?.flatMap((p) => (Array.isArray(p?.data) ? p.data : [])) ?? []
    return list
  }, [pages])

  const lastPage = pages?.[pages.length - 1]
  const hasNextPage = lastPage
    ? (lastPage.hasNextPage ?? lastPage.hasMore ?? (typeof lastPage.nextPage === 'number' ? true : true))
    : true

  const isLoadingMore = isLoading || (size > 0 && !!pages && typeof pages[size - 1] === 'undefined')
  const shouldShowFilteringSkeleton = isFiltering && isValidating && size === 1

  useEffect(() => {
    if (!isValidating && isFiltering) {
      setIsFiltering(false)
    }
  }, [isValidating, isFiltering])

  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  const requestingNextPageRef = useRef(false)
  const prevBaseQueryForScrollRef = useRef<string | null>(null)

  // Reset back to page 1 when filters/sort/search change
  useEffect(() => {
    requestingNextPageRef.current = false
    void setSize(1)

    const prev = prevBaseQueryForScrollRef.current
    prevBaseQueryForScrollRef.current = baseQueryString

    // Chỉ scroll khi user đổi filter/search/sort (query thay đổi), không scroll khi vừa vào trang
    if (prev !== null && prev !== baseQueryString) {
      scrollToElementInContainer('window', 'blog-list', 0.6, 7.5)
    }
  }, [baseQueryString, setSize])

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
    <>
      <div className='xsm:max-w-full mx-auto max-w-[75rem] bg-white'>
        <Breadcrumb
          navItems={[{ label: t('breadcrumbHome'), href: '/' }]}
          lastItem={{ label: t('breadcrumbBlog') }}
          classNameContainer='xsm:hidden pt-[2.34375rem]'
        />
        <h1 className='xsm:px-[0.83333rem] font-open-sans xsm:text-[1.35417rem] xsm:leading-[120%] xsm:text-[#090909] xsm:tracking-normal xsm:pt-[1.66667rem] xsm:mb-0 text-primary/80 mb-[0.41667rem] pt-[3.125rem] text-[2.8125rem] leading-[120%] font-semibold tracking-[-0.02813rem]'>
          {t('title')}
        </h1>
      </div>
      <div className='xsm:pt-[1.25rem] xsm:pb-[0.83rem] sticky top-0 z-100 w-full bg-white py-[1.25rem]'>
        <div className='xsm:max-w-full xsm:flex-col mx-auto flex max-w-[75rem] items-center justify-between'>
          <div
            className='xsm:w-full xsm:order-2 xsm:px-[0.83333rem] xsm:overflow-x-auto xsm:space-x-[0.3125rem] flex items-center space-x-[0.72917rem]'
            style={{
              scrollbarWidth: 'none',
            }}
          >
            <button
              type='button'
              onClick={() => {
                if (selectedCategory) {
                  startTransition(() => {
                    setQueryStates((prev) => ({
                      ...prev,
                      category: '',
                    }))
                  })
                }
              }}
              className={cn(
                'flex-center xsm:h-[1.92708rem] xsm:px-[0.83333rem] xsm:border xsm:border-[rgba(9,9,9,0.08)] h-[2.5rem] rounded-[5.20833rem] px-[1.14583rem]',
                !selectedCategory
                  ? 'xsm:bg-[radial-gradient(298.39%_130.99%_at_6.62%_16.15%,#FF6E6E_0%,#D32F2F_46.23%,#CA2A2A_84.81%)] bg-[radial-gradient(298.39%_130.99%_at_6.62%_16.15%,_#CA2A2A_15.19%,_#D32F2F_53.77%,_#FF6E6E_100%)]'
                  : 'border border-[rgba(9,9,9,0.08)] bg-white',
              )}
            >
              <span
                className={cn(
                  'font-open-sans xsm:text-[0.625rem] xsm:font-semibold xsm:leading-[140%] xsm:tracking-[-0.00625rem] text-[0.72917rem] leading-[150%] whitespace-nowrap',
                  !selectedCategory ? 'text-white' : 'text-[#090909]',
                )}
              >
                {t('tabAll')}
              </span>
            </button>

            {filteredCategories.map((cat) => {
              const isActive = selectedCategory === cat.slug
              return (
                <button
                  key={cat.id}
                  type='button'
                  onClick={() => {
                    if (selectedCategory !== cat.slug) {
                      startTransition(() => {
                        setQueryStates((prev) => ({
                          ...prev,
                          category: cat.slug,
                        }))
                      })
                    }
                  }}
                  className={`flex-center xsm:h-[1.92708rem] xsm:px-[0.83333rem] h-[2.5rem] rounded-[5.20833rem] px-[1.14583rem] ${
                    isActive
                      ? 'bg-gr-2 xsm:border xsm:border-[rgba(9,9,9,0.08)] xsm:bg-[radial-gradient(298.39%_130.99%_at_6.62%_16.15%,#FF6E6E_0%,#D32F2F_46.23%,#CA2A2A_84.81%)]'
                      : 'border border-[rgba(9,9,9,0.08)] bg-white'
                  }`}
                >
                  <span
                    className={`font-open-sans xsm:text-[0.625rem] xsm:font-semibold xsm:leading-[140%] xsm:tracking-[-0.00625rem] text-[0.72917rem] leading-[150%] whitespace-nowrap ${
                      isActive ? 'text-white' : 'text-[#090909]'
                    }`}
                  >
                    {cat.name}
                  </span>
                </button>
              )
            })}

            <FilterPopup
              label={t('year')}
              items={yearItems}
              value={selectedYears}
              onChange={handleYearsChange}
            />
          </div>
          <div className='xsm:w-full xsm:space-x-[0.41667rem] xsm:px-[0.75rem] xsm:mb-[0.72917rem] flex items-center space-x-[0.9375rem]'>
            <div className='xsm:w-auto xsm:grow relative w-[16.61458rem] overflow-hidden'>
              <input
                type='text'
                placeholder={t('placeholderSearch')}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className='font-open-sans xsm:h-[2.08333rem] xsm:p-[0.83333rem] xsm:text-[0.625rem] xsm:px-[0.83333rem] placeholder:text-primary/60 text-primary/80 h-[2.5rem] w-full rounded-[5.20833rem] border-none bg-[#F0F0F0] px-[1.14583rem] text-[0.72917rem] leading-[150%] font-normal focus:ring-0'
              />
              <div className='xsm:right-[0.83333rem] absolute top-1/2 right-[1.14583rem] -translate-y-1/2'>
                <ICSearch className='size-[0.83333rem]' />
              </div>
            </div>
            <SortPopup
              label={t('sortPopup')}
              keySp='sort'
              items={[
                {
                  label: t('newestToOldest'),
                  value: 'newest',
                },
                {
                  label: t('oldestToNewest'),
                  value: 'oldest',
                },
              ]}
              value={sortValue}
              onChange={(value) => setQueryStates({ sort: value })}
            />
          </div>
        </div>
      </div>
      <div className='xsm:pt-[1.66667rem] xsm:pb-[3.33333rem] bg-[#F8F8F8] pt-[2.29rem] pb-[7.29167rem]'>
        <div className='xsm:max-w-full mx-auto max-w-[75rem]'>
          <div
            className='xsm:px-[0.83333rem] xsm:w-full xsm:gap-x-[1.5625rem] flex items-center gap-x-[1.77083rem] gap-y-[0.52083rem] overflow-x-auto sm:flex-wrap'
            style={{
              scrollbarWidth: 'none',
            }}
          >
            <SelectedTags
              label={t('year')}
              items={yearItems}
              selectedValues={selectedYears}
              onRemove={(value) =>
                setQueryStates((prev) => ({
                  ...prev,
                  starting_year: prev.starting_year.filter((v) => v !== value),
                }))
              }
            />
          </div>
          <div
            id='blog-list'
            className='xsm:px-[0.83333rem] xsm:pt-[1.66667rem] xsm:gap-y-[1.04167rem] tablet:grid-cols-2 grid grid-cols-1 gap-x-[1.5625rem] gap-y-[2.08333rem] pt-[2.08333rem] lg:grid-cols-3'
          >
            <BlogListContent
              blogs={displayBlogs}
              isInitialLoading={isLoading && displayBlogs.length === 0}
              isFiltering={shouldShowFilteringSkeleton}
              t={t}
              locale={locale}
            />
            {isLoadingMore ? <BlogListSkeleton /> : null}
            <div
              ref={loadMoreRef}
              className='col-span-full h-px w-full'
              aria-hidden='true'
            />
          </div>
        </div>
      </div>
    </>
  )
}
