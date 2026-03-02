'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ISectionAwardAcf } from '@/interfaces/home.interface'

export default function AwardHome({ data }: { data?: ISectionAwardAcf }) {
  if (!data) return null
  const { title, subtitle } = data
  const list_awards = Array.isArray(data.list_awards) ? data.list_awards : []
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className='xsm:hidden h-screen w-full'>
      <div className='relative h-[calc(100vh-25.22rem)] w-[100%]'>
        <Image
          src={'/home/d-bg-award.webp'}
          alt='Award'
          width={1920}
          height={1080}
          className='size-full object-cover'
          quality={100}
        />
        <div className='absolute top-[50%] right-[9.38rem] flex translate-y-[-50%] items-center space-x-[1.61rem]'>
          <p
            style={{
              background: 'linear-gradient(180deg, #FFF 31.27%, #FFB6B6 63.33%, #FF5050 82.33%)',
              WebkitTextFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
            }}
            className='text-[10rem] leading-[1.2] font-semibold capitalize text-shadow-[0_0_37.912px_rgba(255,255,255,0.25)]'
          >
            {list_awards?.length}
          </p>
          <div
            className='text-[3.333rem] leading-[1.2] font-semibold tracking-[-0.06667rem] text-white capitalize text-shadow-[0_4px_4px_rgba(0,0,0,0.25)]'
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
        <div className='z-10 flex flex-col justify-center space-y-[1.04rem] sm:w-[28.80208rem]'>
          <p className='pc-h2-54-s text-text-100'>{subtitle}</p>
          <p
            key={activeIndex}
            className='pc-body-20-r text-text-80 animate-fade-in text-[1.04167rem] transition-all duration-500'
          >
            {list_awards?.[activeIndex]?.description}
          </p>
        </div>

        {/* slide */}
        <div className='relative z-10'>
          <Swiper
            modules={[Navigation]}
            spaceBetween={80}
            slidesPerView={3}
            centeredSlides
            loop={true}
            grabCursor
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            navigation={{
              nextEl: '.swiper-button-next-c',
              prevEl: '.swiper-button-prev-c',
            }}
            className='award-swiper sm:w-[42.083rem]'
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
                        className='h-auto w-full object-contain'
                      />
                    </div>
                    <div
                      className={`mt-[1.98rem] rounded-[3.625rem] px-[0.78125rem] py-[0.46875rem] text-center text-[1.04167rem] leading-[1.3] text-white transition-colors duration-300 ${
                        isActive ? 'bg-gr-2' : 'bg-en-60'
                      }`}
                    >
                      {item.year}
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
            <div className='z-20 mt-[3.18rem] flex items-center justify-center gap-4'>
              <span className='pc-body-16-r text-text-60'>
                {String(activeIndex + 1).padStart(2, '0')}/{String(list_awards?.length).padStart(2, '0')}
              </span>
              <div className='flex items-center space-x-[0.16rem]'>
                {list_awards?.map((_, index) => (
                  <div
                    key={index}
                    className={`bg-text-60 h-[0.15625rem] rounded-full transition-all duration-300 ${
                      index === activeIndex ? 'w-[2.44rem]' : 'w-[1.2rem] opacity-[0.32]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </Swiper>
          <button className='swiper-button-prev-c absolute top-[23%] left-[-4rem] z-20 !flex h-10 w-10 cursor-pointer items-center justify-center'>
            <ChevronLeft
              size={30}
              className='text-text-100 h-[1.45833rem] w-[1.09375rem] transition-colors hover:text-[#D32F2F]'
            />
          </button>
          <button className='swiper-button-next-c absolute top-[23%] right-[-4rem] z-20 !flex h-10 w-10 cursor-pointer items-center justify-center'>
            <ChevronRight
              size={30}
              className='text-text-100 h-[1.45833rem] w-[1.09375rem] transition-colors hover:text-[#D32F2F]'
            />
          </button>
        </div>
      </div>
    </div>
  )
}
