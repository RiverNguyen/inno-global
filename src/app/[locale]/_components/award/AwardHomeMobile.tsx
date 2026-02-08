/* eslint-disable import/order */
'use client'
import Image from 'next/image'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { ISectionAwardAcf } from '@/interfaces/home.interface'

export default function AwardHomeMobile({ data }: { data: ISectionAwardAcf }) {
  const { title, list_awards } = data
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <div className='sm:hidden overflow-hidden pt-[8.65rem] pb-[2.08rem] relative min-h-[19.9rem] px-[0.83rem]'>
      <div className='absolute top-0 left-[0.83rem] w-[calc(100%-1.66rem)]  h-[13.54167rem] overflow-hidden rounded-[1.25rem_1.25rem_0.20833rem_0.20833rem]'>
        <Image
          src={'/home/d-award2.webp'}
          alt='Award'
          width={400}
          height={200}
          className='absolute top-0 left-0 w-full h-full object-cover pointer-events-none'
          quality={100}
        />
        <div className='space-y-[0rem] mt-[1.88rem] relative z-10 flex-center flex-col '>
          <p
            style={{
              background: 'linear-gradient(180deg, #FFF 31.27%, #FFB6B6 63.33%, #FF5050 82.33%)',
              WebkitTextFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
            }}
            className='text-[2.70833rem] leading-[1.2] font-semibold capitalize text-shadow-[0_0_37.912px_rgba(255,255,255,0.25)]'
          >
            {list_awards?.length}
          </p>
          <div
            className='text-white text-center text-[1.04167rem] font-semibold leading-[1.2] tracking-[-0.06667rem] capitalize text-shadow-[0_4px_4px_rgba(0,0,0,0.25)]'
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </div>
      </div>

      <div className='h-[19.89rem] absolute bottom-0 w-full left-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.00)_71.66%,#F9FCFF_87.85%,#D5DCE7_100%)]'></div>

      <div className='z-10 relative'>
        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={16}
          loop={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          initialSlide={0}
          navigation={{
            nextEl: '.swiper-button-next-c',
            prevEl: '.swiper-button-prev-c',
          }}
          className='!overflow-visible'
        >
          {list_awards?.map((item, index) => (
            <SwiperSlide key={index}>
              {({ isActive }) => (
                <div className={'flex flex-col items-center transition-all duration-300'}>
                  <div className='relative flex items-center justify-center'>
                    <Image
                      src={item.image.url}
                      alt={item.image.alt}
                      width={300}
                      height={300}
                      className='object-contain size-[8.95rem] z-1'
                    />
                  </div>
                  <div
                    className={`mt-[0.73rem] px-[0.72917rem] text-[0.625rem] leading-[1.3] text-center py-[0.3125rem] text-white rounded-[3.625rem] transition-colors duration-300 ${
                      isActive ? 'bg-gr-2' : 'bg-en-60 '
                    }`}
                  >
                    {item.year}
                  </div>
                  <div className='absolute w-[8.5625rem] h-[8.59375rem] rounded-[50%] bg-white opacity-60 blur-[30px] top-[1rem] left-[25%]'></div>
                  <p className='mt-[0.94rem] text-[0.72917rem] leading-[1.5] text-text-80 self-stretch'>
                    {item.description}
                  </p>
                </div>
              )}
            </SwiperSlide>
          ))}
          <div className='flex justify-center mt-[0.83rem] items-center space-x-[0.42rem] z-20'>
            <span className='mb-caption-12-12-r text-text-60'>
              {String(activeIndex + 1).padStart(2, '0')}/{String(list_awards?.length).padStart(2, '0')}
            </span>
            <div className='flex items-center space-x-[0.16rem]'>
              {list_awards?.map((_, index) => (
                <div
                  key={index}
                  className={`h-[0.10417rem] rounded-full transition-all duration-300 bg-text-60 ${
                    index === activeIndex ? 'w-[2.1875rem] ' : 'w-[0.67708rem] opacity-[0.32]'
                  }`}
                />
              ))}
            </div>
          </div>
        </Swiper>
        <button className='swiper-button-prev-c absolute left-[0rem] bottom-[-0.8rem] z-20 w-10 h-10 flex items-center justify-center cursor-pointer'>
          <ChevronLeft
            size={30}
            className='w-[1.09375rem] h-[1.45833rem] text-[#D32F2F] transition-colors'
          />
        </button>
        <button className='swiper-button-next-c absolute right-[0rem] bottom-[-0.8rem] z-20 w-10 h-10 flex items-center justify-center cursor-pointer'>
          <ChevronRight
            size={30}
            className='w-[1.09375rem] h-[1.45833rem] text-[#D32F2F] transition-colors'
          />
        </button>
      </div>
    </div>
  )
}
