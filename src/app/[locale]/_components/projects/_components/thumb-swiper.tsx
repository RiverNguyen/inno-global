'use client'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
// Import Swiper React components
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
  const remToPx = (rem: number) => {
    if (typeof window === 'undefined') return 0
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
  }
  return (
    <div className='absolute bottom-0 right-0 w-[58.48958rem] p-[0.9375rem] z-10 xsm:hidden'>
      <div
        style={{
          background: 'rgba(0, 0, 0, 0.08)',
          backdropFilter: 'blur(5px)',
        }}
        className='absolute top-0 left-0 w-full h-full z-10'
      />
      <div className='relative z-10'>
        <div className='flex-y-center justify-between  mb-[0.9375rem]'>
          <p className='text-white text-[1.25rem] font-semibold leading-[100%] tracking-[-0.0125rem]'>Dự án khác</p>
          <div className='flex space-x-[0.3125rem] mr-[0.94rem]'>
            <button className='project-thumb-swiper-prev relative size-[1.5625rem] rounded-full flex-center overflow-hidden bg-[rgba(255,255,255,0.14)]'>
              <ChevronLeftIcon className='size-[0.83rem] text-white' />
            </button>
            <button className='project-thumb-swiper-next relative size-[1.5625rem] rounded-full flex-center overflow-hidden bg-[rgba(255,255,255,0.14)]'>
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
          className='relative max-h-[9.94792rem]'
        >
          {data.map((item) => (
            <SwiperSlide
              key={item.id + 'thumb_item'}
              className='w-full max-w-[17.08333rem] !h-[9.94792rem] mr-[0.63rem] rounded-[0.20833rem] overflow-hidden'
            >
              <Image
                width={683}
                height={410}
                src={item.image}
                alt={item.title}
                className='h-full w-full object-cover'
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
