/* eslint-disable indent */
'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ISectionAwardAcf } from '@/interfaces/home.interface'
import { convertRemToPx } from '@/lib/utils'

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

export default function AwardHome({ data }: { data?: ISectionAwardAcf }) {
  const [activeYearIndex, setActiveYearIndex] = useState(0)
  const [activeItemIndex, setActiveItemIndex] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = statsRef.current
      if (!el) return
      gsap.set(el, { opacity: 0, x: 48 })
      const animate = () => {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
        })
      }
      if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
              requestAnimationFrame(animate)
              observer.disconnect()
            }
          },
          { threshold: 0.25 },
        )
        if (rootRef.current) observer.observe(rootRef.current)
        return () => observer.disconnect()
      }
      requestAnimationFrame(animate)
    },
    { scope: rootRef },
  )

  if (!data) return null
  const { title } = data

  const rawList = Array.isArray(data.list_awards) ? data.list_awards : []
  const yearGroups = groupAwardsByYear(rawList)

  const hasYears = yearGroups.length > 0 && yearGroups.some((g) => g.year)
  const allGroups: YearGroup[] = hasYears ? yearGroups : [{ year: '', items: flattenAllItems(rawList) }]

  const totalAwards = allGroups.reduce((acc, g) => acc + g.items.length, 0)
  const currentGroup = allGroups[activeYearIndex]
  const currentItems = currentGroup?.items ?? []

  // Swiper loop + centeredSlides cần ít nhất slidesPerView*2+1 slides để clone đủ
  // Duplicate items cho đến khi đủ, dùng modulo để track index thực
  const MIN_LOOP_SLIDES = 7
  const loopItems =
    currentItems.length > 0 && currentItems.length < MIN_LOOP_SLIDES
      ? Array(Math.ceil(MIN_LOOP_SLIDES / currentItems.length))
          .fill(currentItems)
          .flat()
      : currentItems

  const handlePrevYear = () => {
    setActiveYearIndex((prev) => (prev - 1 + allGroups.length) % allGroups.length)
    setActiveItemIndex(0)
  }

  const handleNextYear = () => {
    setActiveYearIndex((prev) => (prev + 1) % allGroups.length)
    setActiveItemIndex(0)
  }

  return (
    <div
      ref={rootRef}
      className='xsm:hidden h-screen w-full'
    >
      <div className='relative h-[calc(100vh-25.22rem)] w-[100%]'>
        <Image
          src={'/home/d-bg-award.webp'}
          alt='Award'
          width={1920}
          height={1080}
          className='size-full object-cover'
          quality={100}
        />
        <div
          ref={statsRef}
          className='absolute top-[50%] right-[9.38rem] flex translate-y-[-50%] items-center space-x-[1.61rem]'
        >
          <p
            style={{
              background: 'linear-gradient(180deg, #FFF 31.27%, #FFB6B6 63.33%, #FF5050 82.33%)',
              WebkitTextFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
            }}
            className='text-[9rem] leading-[1.2] font-semibold capitalize text-shadow-[0_0_37.912px_rgba(255,255,255,0.25)]'
          >
            {totalAwards}
          </p>
          <div
            className='pc-h2-54-s text-white capitalize text-shadow-[0_4px_4px_rgba(0,0,0,0.25)]'
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </div>
      </div>

      <div className='relative flex h-[25.22rem] w-full items-center justify-between bg-[#F2F2F2] pr-[8.96rem] pl-[6.77rem]'>
        <Image
          src={'/home/deco.svg'}
          alt='deco'
          width={1340}
          height={700}
          className='pointer-events-none absolute right-0 bottom-0 h-[30rem] w-[70rem] object-cover'
          quality={100}
        />

        {/* Left: subtitle + description */}
        <div className='z-10 flex flex-col justify-center space-y-[1.04rem] sm:w-[28.80208rem]'>
          <h2 className='pc-h2-54-s text-text-100 line-clamp-2'>{currentItems[activeItemIndex]?.name}</h2>
          <p
            key={`${activeYearIndex}-${activeItemIndex}`}
            className='pc-body-20-r text-text-80 animate-fade-in text-[1.04167rem] transition-all duration-500'
          >
            {currentItems[activeItemIndex]?.description}
          </p>
        </div>

        {/* Right: year nav + swiper */}
        <div className='z-10 flex flex-col items-center translate-y-[-1rem]'>
          {/* Year navigation */}
          {hasYears && (
            <div className='mb-[2.76rem] flex items-center gap-[1.56rem]'>
              <button
                onClick={handlePrevYear}
                className='group flex cursor-pointer items-center justify-center transition-all duration-300 hover:translate-x-[-0.5rem]'
              >
                <ChevronLeft
                  strokeWidth={1.3}
                  className='text-[#D32F2F] size-[2.25rem]'
                />
              </button>
              <span className='min-w-[5rem] text-center text-[2.5rem] leading-[1.2] font-semibold tracking-[-0.05rem] text-[#D32F2F]'>
                {currentGroup?.year}
              </span>
              <button
                onClick={handleNextYear}
                className='group flex cursor-pointer items-center justify-center transition-all duration-300 hover:translate-x-[0.5rem]'
              >
                <ChevronRight
                  strokeWidth={1.3}
                  className='text-[#D32F2F] size-[2.25rem]'
                />
              </button>
            </div>
          )}

          {/* Swiper + side arrows */}
          <div className='relative'>
            <Swiper
              key={activeYearIndex}
              modules={[Navigation]}
              spaceBetween={convertRemToPx(4.17)}
              slidesPerView={3}
              centeredSlides
              loop={true}
              grabCursor
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={(swiper) => setActiveItemIndex(swiper.realIndex % currentItems.length)}
              onClick={(swiper) => {
                const slide = swiper.clickedSlide
                if (!slide) return
                const slideRect = slide.getBoundingClientRect()
                const slideCenter = slideRect.left + slideRect.width / 2
                const swiperRect = swiper.el.getBoundingClientRect()
                const swiperCenter = swiperRect.left + swiperRect.width / 2
                const threshold = 15
                if (slideCenter < swiperCenter - threshold) swiper.slidePrev()
                else if (slideCenter > swiperCenter + threshold) swiper.slideNext()
              }}
              navigation={{
                nextEl: '.swiper-button-next-c',
                prevEl: '.swiper-button-prev-c',
              }}
              className='award-swiper sm:w-[42.083rem]'
            >
              {loopItems.map((item, index) => {
                const imageUrl = getImageUrl(item)
                if (!imageUrl) return null
                return (
                  <SwiperSlide key={index}>
                    {({ isActive }) => (
                      <div className='flex flex-col items-center transition-all duration-300'>
                        <div className='relative flex items-center justify-center'>
                          <Image
                            src={imageUrl}
                            alt={item.image?.alt ?? ''}
                            width={300}
                            height={300}
                            className='h-auto w-full object-contain'
                          />
                        </div>
                        <div
                          className={`mt-[1rem] rounded-[3.625rem] px-[0.83rem] py-[0.3rem] min-h-[1.71875rem] transition-colors duration-300 font-medium flex items-center justify-center max-w-[10.5rem] ${
                            isActive ? 'bg-gr-2 text-white' : 'bg-transparent text-black outline outline-[#090909]/60'
                          }`}
                        >
                          <p className='line-clamp-1 text-center text-[0.729rem] leading-[1.5] max-w-[10.5rem] whitespace-nowrap overflow-hidden'>
                            {item.name}
                          </p>
                        </div>
                      </div>
                    )}
                  </SwiperSlide>
                )
              })}
              <div className='z-20 mt-[1.5rem] flex items-center justify-center gap-4'>
                <span className='pc-body-16-r text-text-60'>
                  {String(activeItemIndex + 1).padStart(2, '0')}/{String(currentItems.length).padStart(2, '0')}
                </span>
                <div className='flex items-center space-x-[0.16rem]'>
                  {currentItems.map((_, index) => (
                    <div
                      key={index}
                      onClick={() => swiperRef.current?.slideToLoop(index)}
                      className={`bg-text-60 h-[0.15625rem] cursor-pointer rounded-full transition-all duration-300 ${
                        index === activeItemIndex ? 'w-[2.44rem]' : 'w-[1.2rem] opacity-[0.32]'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </Swiper>

            <button className='swiper-button-prev-c absolute top-[30%] left-[-4rem] z-20 !flex h-10 w-10 cursor-pointer items-center justify-center hover:translate-x-[-0.5rem] group transition-all duration-300'>
              <ChevronLeft
                size={30}
                className='text-text-100 h-[1.45833rem] w-[1.09375rem] transition-colors group-hover:text-[#D32F2F]'
              />
            </button>
            <button className='swiper-button-next-c absolute top-[30%] right-[-4rem] z-20 !flex h-10 w-10 cursor-pointer items-center justify-center hover:translate-x-[0.5rem] group transition-all duration-300'>
              <ChevronRight
                size={30}
                className='text-text-100 h-[1.45833rem] w-[1.09375rem] transition-colors group-hover:text-[#D32F2F]'
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
