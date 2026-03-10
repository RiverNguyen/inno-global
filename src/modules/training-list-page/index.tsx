'use client'
import { useDebounce } from '@uidotdev/usehooks'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { parseAsArrayOf, parseAsString, useQueryStates } from 'nuqs'
import { startTransition, useEffect, useMemo, useRef, useState } from 'react'
import { Swiper as ISwiper } from 'swiper'
import { FreeMode, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSWRInfinite from 'swr/infinite'

import ICSearch from '@/components/icons/ICSearch'
import ROUTES from '@/configs/routes'
import { Link } from '@/i18n/navigation'
import { ITraining, ITrainingAcfData, ITrainingTaxonomies } from '@/interfaces/training.inteface'
import { fetcherCMS } from '@/lib/swr'
import { cn, convertRemToPx } from '@/lib/utils'
import { scrollToElementInContainer } from '@/utils/scrollToElementInContainer'

import FilterPopup from '../project-list-page/components/FilterPopup'
import ProjectListSkeleton from '../project-list-page/components/ProjectListSkeleton'
import SelectedTags from '../project-list-page/components/SelectedTags'
import SortPopup from '../project-list-page/components/SortPopup'

import Banner from './components/Banner'
import TrainingListContent from './components/TrainingListContent'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import './styles.css'

type FilterItem = { label: string; value: string }

type TrainingListApiResponse = {
  success?: boolean
  data?: ITraining[]
  total?: number
  totalPages?: number
  page?: number
  limit?: number
  hasMore?: boolean
  hasNextPage?: boolean
  hasPrevPage?: boolean
  nextPage?: number
}

interface TrainingListPageProps {
  acfData: ITrainingAcfData
  latestTrainingRes: TrainingListApiResponse
  otherTrainingRes: TrainingListApiResponse
  taxonomies: ITrainingTaxonomies
}

const TAX_QUERY = 'training_category,starting_year'
const PAGE_LIMIT = 12

export default function TrainingListPage({
  acfData,
  latestTrainingRes,
  otherTrainingRes,
  taxonomies,
}: TrainingListPageProps) {
  const locale = useLocale()
  const swiperRef = useRef<ISwiper>(null)

  const t = useTranslations('TrainingListPage')
  const latestTrainings = latestTrainingRes?.data || []
  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  const requestingNextPageRef = useRef(false)
  const prevBaseQueryForScrollRef = useRef<string | null>(null)

  const [useInitialFallbackData, setUseInitialFallbackData] = useState(true)

  const [
    {
      training_category: slugCategory = '',
      starting_year: selectedYears = [],
      sort: sortValue = 'newest',
      s: searchQuery = '',
    },
    setQueryStates,
  ] = useQueryStates(
    {
      training_category: parseAsString.withDefault(''),
      starting_year: parseAsArrayOf(parseAsString).withDefault([]),
      sort: parseAsString.withDefault('newest'),
      s: parseAsString.withDefault(''),
    },
    {
      history: 'replace',
      shallow: true,
      scroll: false,
    },
  )

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
    if (slugCategory) activeTaxonomies.add('training_category')

    // Keep default behavior when no filters are selected
    const taxValue = activeTaxonomies.size > 0 ? Array.from(activeTaxonomies).sort().join(',') : TAX_QUERY
    params.append('tax', taxValue)

    if (normalizedYears.length > 0) {
      // API expects comma-separated values, e.g. starting_year=2020,2022
      params.append('starting_year', normalizedYears.join(','))
    }

    // Investor filter
    if (slugCategory) {
      params.append('training_category', slugCategory)
    }

    // Add sort parameters
    params.append('orderby', 'date')
    params.append('order', sortValue === 'newest' ? 'DESC' : 'ASC')

    // Add search parameter
    if (searchQuery) {
      params.append('s', searchQuery)
    }

    return params.toString()
  }, [locale, selectedYears, sortValue, searchQuery, slugCategory])

  const getKey = (pageIndex: number, previousPageData: TrainingListApiResponse | null) => {
    if (previousPageData) {
      const hasNext =
        previousPageData.hasNextPage ??
        previousPageData.hasMore ??
        (typeof previousPageData.nextPage === 'number' ? true : undefined)
      if (hasNext === false) return null
    }

    const params = new URLSearchParams(baseQueryString)
    params.set('paged', String(pageIndex + 1))
    return `/wp-json/api/v1/get-all/training?${params.toString()}`
  }

  const {
    data: pages,
    isLoading,
    isValidating,
    size,
    setSize,
  } = useSWRInfinite<TrainingListApiResponse>(getKey, fetcherCMS, {
    revalidateIfStale: false,
    // We already fetched on the server; don't revalidate on client mount.
    // Only fetch when key changes (filters) or when infinite-loading next pages.
    revalidateOnMount: false,
    revalidateOnReconnect: false,
    revalidateOnFocus: false,
    revalidateFirstPage: false,
    // Keep the current list while fetching a new filtered list (prevents UI "jump").
    keepPreviousData: true,
    fallbackData: useInitialFallbackData ? [otherTrainingRes] : undefined,
  })

  const prevBaseQueryStringRef = useRef<string | null>(null)
  const [isFiltering, setIsFiltering] = useState(false)

  const isLoadingMore = isLoading || (size > 0 && !!pages && typeof pages[size - 1] === 'undefined')
  const shouldShowFilteringSkeleton = isFiltering && isValidating && size === 1

  const [searchInput, setSearchInput] = useState(searchQuery)

  // Debounce search query - update URL after 500ms of no typing
  const debouncedSearchInput = useDebounce(searchInput, 500)

  const yearItems: FilterItem[] = useMemo(
    () => taxonomies.years.data.map((y) => ({ label: y.name, value: y.slug })),
    [taxonomies.years.data],
  )

  const displayTrainings = useMemo(() => {
    const list = pages?.flatMap((p) => (Array.isArray(p?.data) ? p.data : [])) ?? []
    return list
  }, [pages])

  const lastPage = pages?.[pages.length - 1]
  const hasNextPage = lastPage
    ? (lastPage.hasNextPage ?? lastPage.hasMore ?? (typeof lastPage.nextPage === 'number' ? true : true))
    : true

  const handleYearsChange = (newYears: string[]) => {
    setQueryStates({
      starting_year: newYears,
    })
  }

  const handleCategoryChange = (newCategory: string) => {
    startTransition(() => {
      setQueryStates({
        training_category: newCategory,
      })
    })
  }

  useEffect(() => {
    if (!isValidating && isFiltering) {
      setIsFiltering(false)
    }
  }, [isValidating, isFiltering])

  // Reset back to page 1 when filters/sort/search change
  useEffect(() => {
    requestingNextPageRef.current = false
    void setSize(1)

    const prev = prevBaseQueryForScrollRef.current
    prevBaseQueryForScrollRef.current = baseQueryString

    // Chỉ scroll khi user đổi filter/search/sort (query thay đổi), không scroll khi vừa vào trang
    if (prev !== null && prev !== baseQueryString) {
      scrollToElementInContainer('window', 'training-list', 0.6, 6.25)
    }
  }, [baseQueryString, setSize])

  useEffect(() => {
    setUseInitialFallbackData(false)
  }, [])

  useEffect(() => {
    if (debouncedSearchInput !== searchQuery) {
      setQueryStates({ s: debouncedSearchInput })
    }
  }, [debouncedSearchInput, searchQuery, setQueryStates])

  useEffect(() => {
    setSearchInput(searchQuery)
  }, [searchQuery])

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

  useEffect(() => {
    const prev = prevBaseQueryStringRef.current
    prevBaseQueryStringRef.current = baseQueryString
    if (prev === null) return
    if (prev !== baseQueryString) {
      setIsFiltering(true)
    }
  }, [baseQueryString])

  return (
    <>
      <Banner banner={acfData?.banner} />
      <div className='xsm:pt-[2.08rem] relative pt-[6.25rem]'>
        <div className='xsm:max-w-full mx-auto max-w-[75rem]'>
          <h2 className='font-open-sans xsm:px-[0.83333rem] xsm:mb-h2-24-sm xsm:mb-[0.72917rem] mb-[2.08333rem] pc-h2-54-s text-[#090909]'>
            {t('latest')}
          </h2>
          <div className='xsm:mb-[1.04rem] mb-[6.25rem] flex sm:space-x-[1.25rem]'>
            <div className='xsm:w-full relative shrink-0'>
              <Swiper
                slidesPerView='auto'
                pagination={{
                  clickable: true,
                }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper
                }}
                modules={[Pagination, FreeMode]}
                breakpoints={{
                  0: {
                    slidesPerView: 'auto',
                    spaceBetween: convertRemToPx(0.72917),
                    loop: false,
                  },
                  639.98: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    loop: true,
                  },
                }}
                className='xsm:w-full xsm:h-auto xsm:px-[0.83333rem]! h-[32.1875rem] w-[47.23958rem]'
              >
                {Array.isArray(latestTrainings) &&
                  latestTrainings.slice(0, 4).map((training, i) => (
                    <SwiperSlide
                      key={i}
                      className='xsm:w-[15.625rem]! xsm:h-[15.775rem]!'
                    >
                      <Link
                        href={
                          locale === 'vi'
                            ? `${ROUTES.trainingsVi}/${training?.slug}`
                            : `${ROUTES.trainingsEn}/${training?.slug}`
                        }
                        className='xsm:bg-[#F6F6F6] relative block h-full overflow-hidden'
                      >
                        <div className='xsm:h-[7.65rem] relative h-full w-full'>
                          <Image
                            src={training?.featured_image?.url || '/default.webp'}
                            alt={''}
                            fill
                            className='object-cover'
                          />
                          <div className='xsm:hidden absolute inset-0 size-full bg-black opacity-30'></div>
                          <div className='xsm:opacity-60 absolute inset-0 z-1 size-full bg-[linear-gradient(180deg,rgba(0,0,0,0.40)_7.53%,rgba(0,0,0,0.30)_22.22%,rgba(0,0,0,0.00)_33.1%,rgba(0,0,0,0.00)_70.94%,rgba(0,0,0,0.74)_85.87%,#000_96.54%)]'></div>
                        </div>
                        <div className='xsm:p-[0.625rem_0.83333rem_0.83333rem_0.83333rem] z-2 flex flex-col px-[1.46rem] pt-[1.67rem] pb-[1.46rem] sm:absolute sm:top-0 sm:left-0 sm:size-full sm:justify-between'>
                          <div className='xsm:space-y-[0.20833rem] xsm:mb-[0.20833rem] space-y-[1.04rem] sm:w-[30.10417rem]'>
                            <div className='font-open-sans xsm:text-[0.625rem] xsm:leading-[120%] xsm:space-x-[0.3125rem] inline-flex items-center space-x-[0.20833rem] rounded-[5.20833rem] bg-[radial-gradient(298.39%_130.99%_at_6.62%_16.15%,#CA2A2A_15.19%,#D32F2F_53.77%,#FF6E6E_100%)] p-[0.20833rem_0.83333rem] text-[0.72917rem] leading-[150%] font-semibold whitespace-nowrap text-white sm:capitalize'>
                              <span>{t('format')}:</span>
                              <span>{training?.taxonomies?.training_format[0]?.name || '-'}</span>
                            </div>
                            <h3 className='font-open-sans sm:text-trim-both xsm:text-[0.83333rem] xsm:leading-[150%] xsm:text-[#090909] text-[1.66667rem] leading-[120%] font-semibold tracking-[-0.01667rem] text-white'>
                              {training?.title}
                            </h3>
                          </div>
                          <div className='xsm:space-y-[0.20833rem] space-y-[0.41667rem]'>
                            <div className='flex items-center space-x-[0.52083rem]'>
                              <span className='xsm:text-[#090909] font-open-sans xsm:text-[0.72917rem] xsm:tracking-[-0.01458rem] text-[0.83333rem] leading-[150%] tracking-[-0.01667rem] text-[rgba(255,255,255,0.8)]'>
                                {t('lecturer')}:
                              </span>
                              <span className='xsm:text-[#090909] font-open-sans sm:text-trim-both xsm:text-[0.72917rem] xsm:leading-[150%] text-[0.83333rem] leading-normal font-semibold text-white'>
                                {training?.taxonomies?.lecturer[0]?.name || '-'}
                              </span>
                            </div>
                            <div className='flex items-center space-x-[0.52083rem]'>
                              <span className='xsm:text-[#090909] font-open-sans xsm:text-[0.72917rem] xsm:tracking-[-0.01458rem] text-[0.83333rem] leading-[150%] tracking-[-0.01667rem] text-[rgba(255,255,255,0.8)]'>
                                {t('participant')}:
                              </span>
                              <span className='xsm:text-[#090909] font-open-sans sm:text-trim-both xsm:text-[0.72917rem] xsm:leading-[150%] text-[0.83333rem] leading-normal font-semibold text-white'>
                                {training?.taxonomies?.participant[0]?.name || '-'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
              </Swiper>
              <div className='xsm:hidden absolute top-1/2 right-0 left-0 z-10 flex w-full -translate-y-1/2 items-center justify-between px-[1.66667rem]'>
                <button
                  type='button'
                  onClick={() => swiperRef.current?.slidePrev()}
                  className='group relative flex items-center justify-center overflow-hidden rounded-[5.20833rem] bg-white p-[0.625rem] before:absolute before:inset-0 before:bg-[radial-gradient(298.39%_130.99%_at_6.62%_16.15%,#FF6E6E_0%,#D32F2F_46.23%,#CA2A2A_84.81%)] before:opacity-0 before:transition-all before:duration-600 before:ease-[cubic-bezier(0.44,0,0,1)] before:content-[""] lg:hover:before:opacity-100'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    viewBox='0 0 16 16'
                    fill='currentColor'
                    className='relative z-1 size-[0.83333rem] text-[#090909] opacity-80 transition-all duration-600 ease-[cubic-bezier(0.44,0,0,1)] lg:group-hover:text-white lg:group-hover:opacity-100'
                  >
                    <path d='M6.50145 7.99902L4.33799 8.00576L6.5 7.99902L10.4662 3.76312L9.52344 2.82031L4.33799 8.00576L9.52344 13.1912L10.4663 12.2484L6.50145 7.99902Z' />
                  </svg>
                </button>
                <button
                  type='button'
                  onClick={() => swiperRef.current?.slideNext()}
                  className='group relative flex items-center justify-center overflow-hidden rounded-[5.20833rem] bg-white p-[0.625rem] before:absolute before:inset-0 before:bg-[radial-gradient(298.39%_130.99%_at_6.62%_16.15%,#FF6E6E_0%,#D32F2F_46.23%,#CA2A2A_84.81%)] before:opacity-0 before:transition-all before:duration-600 before:ease-[cubic-bezier(0.44,0,0,1)] before:content-[""] lg:hover:before:opacity-100'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    viewBox='0 0 16 16'
                    fill='currentColor'
                    className='relative z-1 size-[0.83333rem] text-[#090909] opacity-80 transition-all duration-600 ease-[cubic-bezier(0.44,0,0,1)] lg:group-hover:text-white lg:group-hover:opacity-100'
                  >
                    <path d='M9.49855 7.99902L11.662 8.00576L9.5 7.99902L5.53375 3.76312L6.47656 2.82031L11.662 8.00576L6.47656 13.1912L5.53375 12.2484L9.49855 7.99902Z' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='xsm:hidden grow space-y-[1.25rem]'>
              {Array.isArray(latestTrainings) &&
                latestTrainings.slice(4).map((training, i) => (
                  <Link
                    href={
                      locale === 'vi'
                        ? `${ROUTES.trainingsVi}/${training?.slug}`
                        : `${ROUTES.trainingsEn}/${training?.slug}`
                    }
                    className='relative block h-[15.46875rem] overflow-hidden'
                    key={i}
                  >
                    <Image
                      src={training?.featured_image?.url || '/default.webp'}
                      alt={''}
                      fill
                      className='size-full object-cover'
                    />
                    <div className='absolute inset-0 size-full bg-[#000] opacity-30'></div>
                    <div className='absolute inset-0 z-1 size-full bg-[linear-gradient(180deg,rgba(0,0,0,0.40)_7.53%,rgba(0,0,0,0.30)_22.22%,rgba(0,0,0,0.00)_33.1%,rgba(0,0,0,0.00)_70.94%,rgba(0,0,0,0.74)_85.87%,#000_96.54%)]'></div>
                    <div className='absolute z-2 flex size-full flex-col justify-between p-[0.9375rem]'>
                      <div className='w-[17.08333rem] space-y-[0.41667rem]'>
                        <div className='font-open-sans inline-flex items-center space-x-[0.20833rem] rounded-[5.20833rem] bg-[radial-gradient(298.39%_130.99%_at_6.62%_16.15%,#CA2A2A_15.19%,#D32F2F_53.77%,#FF6E6E_100%)] p-[0.20833rem_0.83333rem] text-[0.625rem] leading-[150%] font-semibold whitespace-nowrap text-white capitalize'>
                          <span>{t('format')}:</span>
                          <span>{training?.taxonomies?.training_format[0]?.name}</span>
                        </div>
                        <h3 className='font-open-sans text-trim-both text-[1.04167rem] leading-[150%] font-semibold tracking-[-0.01667rem] text-white'>
                          {training?.title}
                        </h3>
                      </div>
                      <div className='space-y-[0.20833rem]'>
                        <div className='flex items-center space-x-[0.3125rem]'>
                          <span className='font-open-sans text-[0.83333rem] leading-[150%] tracking-[-0.01667rem] text-[rgba(255,255,255,0.8)]'>
                            {t('lecturer')}:
                          </span>
                          <span className='font-open-sans text-trim-both text-[0.83333rem] leading-normal font-semibold text-white'>
                            {training?.taxonomies?.lecturer[0]?.name}
                          </span>
                        </div>
                        <div className='flex items-center space-x-[0.3125rem]'>
                          <span className='font-open-sans text-[0.83333rem] leading-[150%] tracking-[-0.01667rem] text-[rgba(255,255,255,0.8)]'>
                            {t('participant')}:
                          </span>
                          <span className='font-open-sans text-trim-both text-[0.83333rem] leading-normal font-semibold text-white'>
                            {training?.taxonomies?.participant[0]?.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
        <h2
          id='training-list'
          className='xsm:max-w-full xsm:pt-[1.04rem] xsm:px-[0.83333rem] font-open-sans xsm:mb-h2-24-sm xsm:mb-0 mx-auto mb-[0.52083rem] max-w-[75rem] pc-h2-54-s text-[#090909]'
        >
          {t('other')}
        </h2>
        <div className='xsm:pt-[1.25rem] xsm:pb-[0.83333rem] sticky top-0 z-100 bg-white py-[1.25rem]'>
          <div className='xsm:px-[0.83333rem] xsm:flex-col xsm:max-w-full mx-auto flex max-w-[75rem] items-center justify-between'>
            <div className='xsm:order-2 xsm:space-x-[0.3125rem] flex items-center space-x-[0.72917rem]'>
              <button
                type='button'
                onClick={() => handleCategoryChange('')}
                className={cn(
                  'font-open-sans xsm:p-[0.52083rem_0.83333rem] xsm:h-auto xsm:text-[0.625rem] xsm:leading-[140%] xsm:tracking-[-0.00625rem] xsm:font-semibold relative flex h-[2.25rem] cursor-pointer items-center justify-center space-x-[0.52083rem] overflow-hidden rounded-[5.20833rem] border border-[rgba(9,9,9,0.08)] p-[0.75rem_0.75rem] text-[0.72917rem] leading-[150%] font-normal whitespace-nowrap text-[#090909] before:absolute before:inset-0 before:bg-[radial-gradient(298.39%_130.99%_at_6.62%_16.15%,#CA2A2A_15.19%,#D32F2F_53.77%,#FF6E6E_100%)] before:opacity-0 before:transition-all before:duration-300 before:ease-out before:content-[""] lg:hover:text-white lg:hover:before:opacity-100',
                  !slugCategory && 'text-white before:opacity-100',
                )}
              >
                <span className='relative z-1 sm:[text-box-edge:cap_alphabetic] sm:[text-box-trim:trim-both]'>
                  {t('all')}
                </span>
              </button>
              {Array.isArray(taxonomies.categories.data) &&
                taxonomies.categories.data.map((category) => (
                  <button
                    type='button'
                    key={category.id}
                    onClick={() => handleCategoryChange(category?.slug || '')}
                    className={cn(
                      'font-open-sans xsm:p-[0.52083rem_0.83333rem] xsm:h-auto xsm:text-[0.625rem] xsm:leading-[140%] xsm:tracking-[-0.00625rem] xsm:font-semibold relative flex h-[2.25rem] cursor-pointer items-center justify-center space-x-[0.52083rem] overflow-hidden rounded-[5.20833rem] border border-[rgba(9,9,9,0.08)] p-[0.75rem_0.75rem] text-[0.72917rem] leading-[150%] font-normal whitespace-nowrap text-[#090909] before:absolute before:inset-0 before:bg-[radial-gradient(298.39%_130.99%_at_6.62%_16.15%,#CA2A2A_15.19%,#D32F2F_53.77%,#FF6E6E_100%)] before:opacity-0 before:transition-all before:duration-300 before:ease-out before:content-[""] lg:hover:text-white lg:hover:before:opacity-100',
                      slugCategory === category?.slug && 'text-white before:opacity-100',
                    )}
                  >
                    <span className='relative z-1 sm:[text-box-edge:cap_alphabetic] sm:[text-box-trim:trim-both]'>
                      {category?.name}
                    </span>
                  </button>
                ))}
              <FilterPopup
                label={t('year')}
                items={yearItems}
                value={selectedYears}
                onChange={handleYearsChange}
              />
            </div>
            <div className='xsm:w-full xsm:space-x-[0.41667rem] xsm:mb-[0.72917rem] flex items-center '>
              <div className='xsm:w-auto xsm:grow relative w-[16.9375rem] overflow-hidden mr-[0.9375rem]'>
                <input
                  type='text'
                  placeholder={t('placeholderSearch')}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className='font-open-sans xsm:h-[2.08333rem] xsm:p-[0.83333rem] xsm:text-[0.625rem] xsm:pr-[calc(0.83333rem+0.83333rem+0.83333rem)] w-full rounded-[6.25rem] border-none bg-[#F0F0F0] py-[0.5rem] pr-[calc(0.83333rem+1.14583rem+1.14583rem)] pl-[1.14583rem] text-[0.72917rem] leading-[150%] font-normal text-[rgba(9,9,9,0.6)] focus:ring-0'
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

        <div className='xsm:pb-[3.125rem] pb-[6.25rem]'>
          <div className='xsm:max-w-full mx-auto max-w-[75rem]'>
            {selectedYears.length > 0 && (
              <div
                className='xsm:px-[0.83333rem] xsm:pt-0 xsm:w-full xsm:gap-x-[1.5625rem] flex items-center gap-x-[1.77083rem] gap-y-[0.52083rem] overflow-x-auto pt-[2.08333rem] sm:flex-wrap'
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
            )}

            <div className='xsm:px-[0.83333rem] xsm:pt-[0.72917rem] xsm:gap-y-[1.25rem] tablet:grid-cols-2 grid grid-cols-1 gap-x-[2.08333rem] gap-y-[3.4375rem] pt-[2.08333rem] lg:grid-cols-3'>
              <TrainingListContent
                trainings={displayTrainings}
                isInitialLoading={isLoading && displayTrainings.length === 0}
                isFiltering={shouldShowFilteringSkeleton}
                t={t}
              />
              {isLoadingMore ? <ProjectListSkeleton /> : null}
              <div
                ref={loadMoreRef}
                className='col-span-full h-px w-full'
                aria-hidden='true'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
