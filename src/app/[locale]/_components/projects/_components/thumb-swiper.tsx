'use client'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
// Import Swiper React components
import { useTranslations } from 'next-intl'
import type { Swiper as SwiperType } from 'swiper'
import { Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { IProject } from '@/app/[locale]/_components/projects/projects'

interface IThumbSwiperProps {
  data: IProject[]
  setThumbsSwiper: (swiper: SwiperType) => void
}

export default function ThumbSwiper({ data, setThumbsSwiper }: IThumbSwiperProps) {
  const t = useTranslations('ProjectListPage')
  const remToPx = (rem: number) => {
    if (typeof window === 'undefined') return 0
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
  }
  return (
    <div className='xsm:hidden absolute right-0 bottom-0 z-10 w-[58.48958rem] p-[0.9375rem]'>
      <div
        style={{
          background: 'rgba(0, 0, 0, 0.08)',
          backdropFilter: 'blur(5px)',
        }}
        className='absolute top-0 left-0 z-10 h-full w-full'
      />
      <div className='relative z-10'>
        <div className='flex-y-center mb-[0.9375rem] space-x-[2rem]'>
          <p className='text-[1.25rem] leading-[100%] font-semibold tracking-[-0.0125rem] text-white'>
            {t('otherProjects')}
          </p>
          <div className='mr-[0.94rem] flex space-x-[0.3125rem]'>
            <button className='project-thumb-swiper-prev flex-center relative size-[1.5625rem] overflow-hidden rounded-full bg-[rgba(255,255,255,0.14)]'>
              <ChevronLeftIcon className='size-[0.83rem] text-white' />
            </button>
            <button className='project-thumb-swiper-next flex-center relative size-[1.5625rem] overflow-hidden rounded-full bg-[rgba(255,255,255,0.14)]'>
              <ChevronRightIcon className='size-[0.83rem] text-white' />
            </button>
          </div>
        </div>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={remToPx(0.63)}
          slidesPerView='auto'
          grabCursor={true}
          watchSlidesProgress={true}
          modules={[Navigation, Thumbs]}
          navigation={{
            nextEl: '.project-thumb-swiper-next',
            prevEl: '.project-thumb-swiper-prev',
          }}
          className='relative max-h-[9.94792rem] cursor-grab'
        >
          {data.map((item) => (
            <SwiperSlide
              key={item.id + 'thumb_item'}
              className='mr-[0.63rem] relative !h-[9.94792rem] w-full max-w-[17.08333rem] overflow-hidden rounded-[0.20833rem]'
            >
              <Image
                src={item.image || '/default.webp'}
                alt={item.title}
                fill
                className='h-full w-full object-cover'
              />
              <div
                className='absolute bottom-0 left-0 h-[4.27rem] w-full'
                style={{
                  background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 8.26%, rgba(0, 0, 0, 0.40) 77.77%)',
                }}
              ></div>
              <p className='absolute z-[1] bottom-[0.52rem] left-[0.83rem] right-[0.83rem] line-clamp-1 text-white text-[0.9375rem] font-semibold leading-[1.5]'>
                {item?.title}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
