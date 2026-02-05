'use client'
import { useDebounce } from '@uidotdev/usehooks'
import { useLocale, useTranslations } from 'next-intl'
import { parseAsArrayOf, parseAsString, useQueryStates } from 'nuqs'
import { useEffect, useMemo, useRef, useState } from 'react'
import useSWRInfinite from 'swr/infinite'

import ICSearch from '@/components/icons/ICSearch'
import Breadcrumb from '@/components/shared/Breadcrumb'
import { IProject, ITaxonomies } from '@/interfaces/project.interface'
import { fetcherCMS } from '@/lib/swr'
import FilterPopup from '@/modules/project-list-page/components/FilterPopup'
import ProjectListContent from '@/modules/project-list-page/components/ProjectListContent'
import ProjectListSkeleton from '@/modules/project-list-page/components/ProjectListSkeleton'
import SelectedTags from '@/modules/project-list-page/components/SelectedTags'
import SortPopup from '@/modules/project-list-page/components/SortPopup'

type FilterItem = { label: string; value: string }

type ProjectListApiResponse = {
  success?: boolean
  data?: IProject[]
  total?: number
  totalPages?: number
  page?: number
  limit?: number
  hasMore?: boolean
  hasNextPage?: boolean
  hasPrevPage?: boolean
  nextPage?: number
}

interface ProjectListPageProps {
  initialProjects: ProjectListApiResponse
  taxonomies: ITaxonomies
}

const TAX_QUERY = 'location,investor,service,building_type,starting_year'
const PAGE_LIMIT = 12

function hasNextPageFromResponse(
  pageData: ProjectListApiResponse | null | undefined,
  fallbackPage: number,
) {
  if (!pageData) return true

  const dataCount = Array.isArray(pageData.data) ? pageData.data.length : 0
  if (dataCount === 0) return false

  const currentPage = typeof pageData.page === 'number' ? pageData.page : fallbackPage
  const totalPages = typeof pageData.totalPages === 'number' ? pageData.totalPages : undefined
  if (typeof totalPages === 'number') {
    return currentPage < totalPages
  }

  if (typeof pageData.nextPage === 'number') return true
  if (typeof pageData.hasNextPage === 'boolean') {
    // Some APIs incorrectly set hasNextPage=false even when a full page was returned.
    if (pageData.hasNextPage === false && dataCount >= PAGE_LIMIT) return true
    return pageData.hasNextPage
  }
  if (typeof pageData.hasMore === 'boolean') {
    if (pageData.hasMore === false && dataCount >= PAGE_LIMIT) return true
    return pageData.hasMore
  }

  // If API doesn't provide pagination hints, default to true
  return true
}

export default function ProjectListPage({ initialProjects, taxonomies }: ProjectListPageProps) {
  const locale = useLocale()

  const t = useTranslations('ProjectListPage')

  const typeItems: FilterItem[] = useMemo(
    () => taxonomies.types.data.map((type) => ({ label: type.name, value: type.slug })),
    [taxonomies.types.data],
  )
  const serviceItems: FilterItem[] = useMemo(
    () => taxonomies.services.data.map((s) => ({ label: s.name, value: s.slug })),
    [taxonomies.services.data],
  )
  const locationItems: FilterItem[] = useMemo(
    () => taxonomies.locations.data.map((loc) => ({ label: loc.name, value: loc.slug })),
    [taxonomies.locations.data],
  )
  const yearItems: FilterItem[] = useMemo(
    () => taxonomies.years.data.map((y) => ({ label: y.name, value: y.slug })),
    [taxonomies.years.data],
  )

  // Use nuqs to manage query params - automatically syncs with URL
  const [
    {
      building_type: selectedTypes = [],
      service: selectedServices = [],
      location: selectedLocations = [],
      starting_year: selectedYears = [],
      investor: slugInvestor = '',
      sort: sortValue = 'newest',
      s: searchQuery = '',
    },
    setQueryStates,
  ] = useQueryStates(
    {
      building_type: parseAsArrayOf(parseAsString).withDefault([]),
      service: parseAsArrayOf(parseAsString).withDefault([]),
      location: parseAsArrayOf(parseAsString).withDefault([]),
      starting_year: parseAsArrayOf(parseAsString).withDefault([]),
      investor: parseAsString.withDefault(''),
      sort: parseAsString.withDefault('newest'),
      s: parseAsString.withDefault(''),
    },
    {
      history: 'replace',
      shallow: true,
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
  const handleTypesChange = (newTypes: string[]) => {
    setQueryStates({
      building_type: newTypes,
    })
  }

  const handleServicesChange = (newServices: string[]) => {
    setQueryStates({
      service: newServices,
    })
  }

  const handleLocationsChange = (newLocations: string[]) => {
    setQueryStates({
      location: newLocations,
    })
  }

  const handleYearsChange = (newYears: string[]) => {
    setQueryStates({
      starting_year: newYears,
    })
  }

  const baseQueryString = useMemo(() => {
    const params = new URLSearchParams()

    // Add lang parameter
    params.append('lang', locale)

    // Add tax parameter with all taxonomies
    params.append('tax', TAX_QUERY)

    // Add limit (page is controlled by SWR Infinite via `paged`)
    params.append('limit', PAGE_LIMIT.toString())

    // Add filters from state
    selectedLocations.forEach((loc) => {
      params.append('location', loc)
    })

    selectedServices.forEach((service) => {
      params.append('service', service)
    })

    selectedTypes.forEach((type) => {
      params.append('building_type', type)
    })

    selectedYears.forEach((year) => {
      params.append('starting_year', year)
    })

    // Investor filter
    if (slugInvestor) {
      params.append('investor', slugInvestor)
    }

    // Add sort parameters
    params.append('orderby', 'date')
    params.append('order', sortValue === 'newest' ? 'DESC' : 'ASC')

    // Add search parameter
    if (searchQuery) {
      params.append('s', searchQuery)
    }

    return params.toString()
  }, [
    locale,
    slugInvestor,
    selectedTypes,
    selectedServices,
    selectedLocations,
    selectedYears,
    sortValue,
    searchQuery,
  ])

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      selectedTypes.length > 0 ||
      selectedServices.length > 0 ||
      selectedLocations.length > 0 ||
      selectedYears.length > 0 ||
      !!slugInvestor ||
      !!searchQuery
    )
  }, [selectedTypes, selectedServices, selectedLocations, selectedYears, slugInvestor, searchQuery])

  // Fetch from API if filters are active or sort is changed
  const shouldFetchFromAPI = hasActiveFilters || sortValue !== 'newest'

  const getKey = (pageIndex: number, previousPageData: ProjectListApiResponse | null) => {
    if (pageIndex > 0 && !hasNextPageFromResponse(previousPageData, pageIndex)) return null

    const nextPaged =
      pageIndex === 0
        ? 1
        : typeof previousPageData?.nextPage === 'number'
          ? previousPageData.nextPage
          : pageIndex + 1

    const params = new URLSearchParams(baseQueryString)
    params.set('paged', String(nextPaged))
    return `/wp-json/api/v1/get-all/project?${params.toString()}`
  }

  const { data: pages, isLoading, size, setSize } =
    useSWRInfinite<ProjectListApiResponse>(getKey, fetcherCMS, {
      revalidateIfStale: false,
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
      revalidateFirstPage: shouldFetchFromAPI,
      fallbackData: shouldFetchFromAPI ? undefined : [initialProjects],
    })

  const displayProjects = useMemo(() => {
    const list = pages?.flatMap((p) => (Array.isArray(p?.data) ? p.data : [])) ?? []
    return list
  }, [pages])

  const lastPage = pages?.[pages.length - 1]
  const hasNextPage = hasNextPageFromResponse(lastPage, pages?.length ?? 1)

  const isLoadingMore =
    isLoading || (size > 0 && !!pages && typeof pages[size - 1] === 'undefined')

  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  const requestingNextPageRef = useRef(false)

  // Reset back to page 1 when filters/sort/search change
  useEffect(() => {
    requestingNextPageRef.current = false
    void setSize(1)
  }, [baseQueryString, setSize])

  useEffect(() => {
    if (!isLoadingMore) {
      requestingNextPageRef.current = false
    }
  }, [isLoadingMore])

  useEffect(() => {
    const el = loadMoreRef.current
    if (!el) return

    if (!hasNextPage || isLoadingMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return
        if (requestingNextPageRef.current) return
        requestingNextPageRef.current = true
        void setSize(size + 1)
      },
      {
        root: null,
        rootMargin: '800px 0px',
        threshold: 0,
      },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [hasNextPage, isLoadingMore, setSize, size])

  return (
    <>
      <div className='xsm:max-w-full mx-auto max-w-[75rem] bg-white'>
        <Breadcrumb navItems={[{ label: t('breadcrumbHome'), href: '/' }]} lastItem={{ label: t('breadcrumbProject') }} classNameContainer='xsm:hidden pt-[2.34375rem]' />
        <h1 className='xsm:px-[0.83333rem] font-open-sans xsm:text-[1.35417rem] xsm:leading-[120%] xsm:text-[#090909] xsm:tracking-normal xsm:pt-[1.66667rem] xsm:mb-0 mb-[0.41667rem] pt-[3.125rem] text-[2.8125rem] leading-[120%] font-semibold tracking-[-0.02813rem] text-[rbga(9,9,9,0.8)]'>
          {t('title')}
        </h1>
      </div>
      <div className='xsm:pt-[1.25rem] xsm:pb-[0.83rem] sticky top-0 z-5 w-full bg-white py-5'>
        <div className='xsm:max-w-full xsm:flex-col mx-auto flex max-w-[75rem] items-center justify-between'>
          <div
            className='xsm:w-full xsm:order-2 xsm:px-[0.83333rem] xsm:overflow-x-auto xsm:space-x-[0.3125rem] flex items-center space-x-[0.72917rem]'
            style={{
              scrollbarWidth: 'none',
            }}
          >
            <FilterPopup
              label={t('type')}
              items={typeItems}
              value={selectedTypes}
              onChange={handleTypesChange}
            />
            <FilterPopup
              label={t('service')}
              items={serviceItems}
              value={selectedServices}
              onChange={handleServicesChange}
            />
            <FilterPopup
              label={t('location')}
              items={locationItems}
              value={selectedLocations}
              onChange={handleLocationsChange}
            />
            <FilterPopup
              label={t('year')}
              items={yearItems}
              value={selectedYears}
              onChange={handleYearsChange}
            />
          </div>
          <div className='xsm:w-full xsm:space-x-[0.41667rem] xsm:px-[0.83333rem] xsm:mb-[0.72917rem] flex items-center space-x-[0.9375rem]'>
            <div className='xsm:w-auto xsm:grow relative w-[16.61458rem] overflow-hidden'>
              <input
                type='text'
                placeholder={t('placeholderSearch')}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className='font-open-sans xsm:h-[2.08333rem] xsm:p-[0.83333rem] xsm:text-[0.625rem] xsm:pr-[calc(0.83333rem+0.83333rem+0.83333rem)] w-full rounded-[6.25rem] border-none bg-[#F0F0F0] py-[0.83333rem] pr-[calc(0.83333rem+1.14583rem+1.14583rem)] pl-[1.14583rem] text-[0.72917rem] leading-[150%] font-normal text-[rgba(9,9,9,0.6)] focus:ring-0'
              />
              <div className='xsm:right-[0.83333rem] absolute top-1/2 right-[1.14583rem] -translate-y-1/2'>
                <ICSearch className='size-[0.83333rem]' />
              </div>
            </div>
            <SortPopup
              label={t('sortPopup')}
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
            className='xsm:px-[0.83333rem] xsm:w-full xsm:space-x-[1.5625rem] flex flex-wrap items-center gap-x-[1.77083rem] gap-y-[0.52083rem] overflow-x-auto'
            style={{
              scrollbarWidth: 'none',
            }}
          >
            <SelectedTags
              label={t('type')}
              items={typeItems}
              selectedValues={selectedTypes}
              onRemove={(value) =>
                setQueryStates({
                  building_type: selectedTypes.filter((v) => v !== value),
                })
              }
            />
            <SelectedTags
              label={t('service')}
              items={serviceItems}
              selectedValues={selectedServices}
              onRemove={(value) =>
                setQueryStates({
                  service: selectedServices.filter((v) => v !== value),
                })
              }
            />
            <SelectedTags
              label={t('location')}
              items={locationItems}
              selectedValues={selectedLocations}
              onRemove={(value) =>
                setQueryStates({
                  location: selectedLocations.filter((v) => v !== value),
                })
              }
            />
            <SelectedTags
              label={t('year')}
              items={yearItems}
              selectedValues={selectedYears}
              onRemove={(value) =>
                setQueryStates({
                  starting_year: selectedYears.filter((v) => v !== value),
                })
              }
            />
          </div>
          <div
            id='project-list'
            className='xsm:grid-cols-1 xsm:px-[0.83333rem] xsm:pt-[1.66667rem] xsm:gap-y-[1.04167rem] grid grid-cols-3 gap-x-[1.5625rem] gap-y-[2.08333rem] pt-[2.08333rem]'
          >
            <ProjectListContent
              projects={displayProjects}
              isInitialLoading={isLoading && displayProjects.length === 0}
              t={t}
            />
            {isLoadingMore ? <ProjectListSkeleton /> : null}
            <div ref={loadMoreRef} className='col-span-3 h-px w-full' aria-hidden='true' />
          </div>
        </div>
      </div>
    </>
  )
}
