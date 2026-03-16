/* eslint-disable import/order */
'use client'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ISectionAwardAcf } from '@/interfaces/home.interface'

type AwardItem = {
  image?: { url?: string; link?: string; alt?: string }
  description?: string
  year?: string
  detail?: unknown[]
  name?: string
}

type YearGroup = {
  year: string
  items: AwardItem[]
}

function getImageUrl(item: AwardItem): string | null {
  const img = item.image as { url?: string; link?: string } | undefined
  return img?.url ?? img?.link ?? null
}

function groupAwardsByYear(raw: unknown[]): YearGroup[] {
  const groups: YearGroup[] = []
  for (const item of raw) {
    const obj = item as AwardItem
    if (Array.isArray(obj.detail) && obj.year) {
      const items = (obj.detail as AwardItem[]).filter((d) => getImageUrl(d))
      if (items.length > 0) {
        groups.push({ year: obj.year, items })
      }
    } else if (obj?.image && getImageUrl(obj)) {
      const existingGroup = groups.find((g) => g.year === (obj.year ?? ''))
      if (existingGroup) {
        existingGroup.items.push(obj)
      } else {
        groups.push({ year: obj.year ?? '', items: [obj] })
      }
    }
  }
  return groups
}

function flattenAllItems(raw: unknown[]): AwardItem[] {
  const items: AwardItem[] = []
  for (const item of raw) {
    const obj = item as AwardItem
    if (Array.isArray(obj.detail)) {
      items.push(...(obj.detail as AwardItem[]))
    } else if (obj?.image) {
      items.push(obj)
    }
  }
  return items.filter((i) => getImageUrl(i))
}

export default function AwardHomeMobile({ data }: { data?: ISectionAwardAcf }) {
  const [activeYearIndex, setActiveYearIndex] = useState(0)
  const [activeItemIndex, setActiveItemIndex] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)

  if (!data) return null
  const { title } = data
  const rawList = Array.isArray(data.list_awards) ? data.list_awards : []
  const yearGroups = groupAwardsByYear(rawList)

  const hasYears = yearGroups.length > 0 && yearGroups.some((g) => g.year)
  const allGroups: YearGroup[] = hasYears ? yearGroups : [{ year: '', items: flattenAllItems(rawList) }]

  const totalAwards = allGroups.reduce((acc, g) => acc + g.items.length, 0)
  const currentGroup = allGroups[activeYearIndex]
  const currentItems = currentGroup?.items ?? []

  const handlePrevYear = () => {
    setActiveYearIndex((prev) => (prev - 1 + allGroups.length) % allGroups.length)
    setActiveItemIndex(0)
  }

  const handleNextYear = () => {
    setActiveYearIndex((prev) => (prev + 1) % allGroups.length)
    setActiveItemIndex(0)
  }

  return (
    <div className='relative min-h-[19.9rem] overflow-hidden px-[0.83rem] pt-[8.65rem] pb-[2.08rem] sm:hidden'>
      <div className='absolute top-0 left-[0.83rem] h-[13.54167rem] w-[calc(100%-1.66rem)] overflow-hidden rounded-[1.25rem_1.25rem_0.20833rem_0.20833rem]'>
        <Image
          src={'/home/d-award2.webp'}
          alt='Award'
          width={400}
          height={200}
          className='pointer-events-none absolute top-0 left-0 h-full w-full object-cover'
          quality={100}
        />
        <div className='flex-center relative z-10 mt-[1.88rem] flex-col space-y-[0rem]'>
          <p
            style={{
              background: 'linear-gradient(180deg, #FFF 31.27%, #FFB6B6 63.33%, #FF5050 82.33%)',
              WebkitTextFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              textBoxEdge: 'cap alphabetic',
              textBoxTrim: 'trim-both',
            }}
            className='text-[2.70833rem] leading-[1.2] font-semibold capitalize text-shadow-[0_0_37.912px_rgba(255,255,255,0.25)] mb-[0.62rem]'
          >
            {totalAwards}
          </p>
          <div
            className='text-center text-[1.04167rem] leading-[1.2] font-semibold tracking-[-0.06667rem] text-white capitalize text-shadow-[0_4px_4px_rgba(0,0,0,0.25)]'
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </div>
      </div>

      <div className='absolute bottom-0 left-0 h-[19.89rem] w-full bg-[linear-gradient(180deg,rgba(255,255,255,0.00)_71.66%,#F9FCFF_87.85%,#D5DCE7_100%)]'></div>

      <div className='relative z-10'>
        {/* Year navigation */}
        {hasYears && (
          <div className='mb-[1.5rem] mt-[-0.5rem] flex items-center justify-center gap-[0.83rem]'>
            <button
              onClick={handlePrevYear}
              className='flex cursor-pointer items-center justify-center transition-transform active:scale-95'
            >
              <ChevronLeft
                strokeWidth={1.3}
                className='text-[#fff] size-[1.25rem]'
              />
            </button>
            <span className='min-w-[3rem] text-center text-[0.9375rem] leading-[1.2] font-semibold tracking-[-0.01875rem] text-[#fff]'>
              {currentGroup?.year}
            </span>
            <button
              onClick={handleNextYear}
              className='flex cursor-pointer items-center justify-center transition-transform active:scale-95'
            >
              <ChevronRight
                strokeWidth={1.3}
                className='text-[#fff] size-[1.25rem]'
              />
            </button>
          </div>
        )}

        <Swiper
          key={activeYearIndex}
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={16}
          loop={currentItems.length > 1}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveItemIndex(swiper.realIndex % currentItems.length)}
          initialSlide={0}
          navigation={{
            nextEl: '.swiper-button-next-c',
            prevEl: '.swiper-button-prev-c',
          }}
          className='!overflow-visible'
        >
          {currentItems.map((item, index) => {
            const imageUrl = getImageUrl(item)
            if (!imageUrl) return null
            return (
              <SwiperSlide key={index}>
                {({ isActive }) => (
                  <div className={'flex flex-col items-center transition-all duration-300'}>
                    <div className='relative flex items-center justify-center'>
                      <Image
                        src={imageUrl}
                        alt={item.image?.alt ?? ''}
                        width={300}
                        height={300}
                        className='z-1 size-[8.95rem] object-contain'
                      />
                    </div>
                    <div
                      className={`mt-[0.73rem] line-clamp-1  rounded-[3.625rem] px-[0.72917rem] py-[0.3125rem] text-center text-[0.625rem] leading-[1.3] text-white transition-colors duration-300 ${
                        isActive ? 'bg-gr-2' : 'bg-en-60'
                      }`}
                    >
                      {item.name ?? item.year}
                    </div>
                    <div className='absolute top-[1rem] left-[25%] h-[8.59375rem] w-[8.5625rem] rounded-[50%] bg-white opacity-60 blur-[30px]'></div>
                    <p className='text-text-80 mt-[0.94rem] self-stretch text-[0.72917rem] leading-[1.5] line-clamp-5'>
                      {item.description}
                    </p>
                  </div>
                )}
              </SwiperSlide>
            )
          })}
          <div className='z-20 mt-[0.83rem] flex items-center justify-center space-x-[0.42rem]'>
            <span className='mb-caption-12-12-r text-text-60'>
              {String(activeItemIndex + 1).padStart(2, '0')}/{String(currentItems.length).padStart(2, '0')}
            </span>
            <div className='flex items-center space-x-[0.16rem]'>
              {currentItems.map((_, index) => (
                <div
                  key={index}
                  onClick={() => swiperRef.current?.slideTo(index)}
                  className={`bg-text-60 h-[0.10417rem] cursor-pointer rounded-full transition-all duration-300 ${
                    index === activeItemIndex ? 'w-[2.1875rem]' : 'w-[0.67708rem] opacity-[0.32]'
                  }`}
                />
              ))}
            </div>
          </div>
        </Swiper>
        <button className='swiper-button-prev-c absolute bottom-[-0.8rem] left-[0rem] z-20 flex h-10 w-10 cursor-pointer items-center justify-center'>
          <ChevronLeft
            size={30}
            className='h-[1.45833rem] w-[1.09375rem] text-[#D32F2F] transition-colors'
          />
        </button>
        <button className='swiper-button-next-c absolute right-[0rem] bottom-[-0.8rem] z-20 flex h-10 w-10 cursor-pointer items-center justify-center'>
          <ChevronRight
            size={30}
            className='h-[1.45833rem] w-[1.09375rem] text-[#D32F2F] transition-colors'
          />
        </button>
      </div>
    </div>
  )
}
