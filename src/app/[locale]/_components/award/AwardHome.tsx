'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ISectionAwardAcf } from '@/interfaces/home.interface'

export default function AwardHome({ data }: { data: ISectionAwardAcf }) {
  const { title, subtitle, list_awards } = data
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className='h-screen w-full xsm:hidden'>
      <div className='relative h-[calc(100vh-25.22rem)] w-[100%]'>
        <Image
          src={'/home/d-bg-award.webp'}
          alt='Award'
          width={1920}
          height={1080}
          className='size-full object-cover'
          quality={100}
        />
        <div className='absolute top-[50%] translate-y-[-50%] right-[9.38rem] flex space-x-[1.61rem] items-center'>
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
            className='text-white text-[3.333rem] font-semibold leading-[1.2] tracking-[-0.06667rem] capitalize text-shadow-[0_4px_4px_rgba(0,0,0,0.25)]'
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </div>
      </div>
      <div className='relative w-full bg-[#F2F2F2] pl-[6.77rem] pr-[8.96rem] flex justify-between items-center h-[25.22rem]'>
        <Image
          src={'/home/deco.svg'}
          alt='deco'
          width={1340}
          height={700}
          className='absolute right-0 bottom-0 h-[30rem] w-[70rem] object-cover pointer-events-none'
          quality={100}
        />
        <div className='sm:w-[28.80208rem] space-y-[1.04rem] flex justify-center flex-col z-10'>
          <p className='pc-h2-54-s text-text-100'>{subtitle}</p>
          <p
            key={activeIndex}
            className='pc-body-20-r text-text-80 text-[1.04167rem] transition-all duration-500 animate-fade-in'
          >
            {list_awards?.[activeIndex]?.description}
          </p>
        </div>

        {/* slide */}
        <div className='z-10 relative'>
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
                        className='object-contain w-full h-auto'
                      />
                    </div>
                    <div
                      className={`mt-[1.98rem] px-[0.78125rem] text-[1.04167rem] leading-[1.3] text-center py-[0.46875rem] text-white rounded-[3.625rem] transition-colors duration-300 ${isActive ? 'bg-gr-2' : 'bg-en-60 '
                        }`}
                    >
                      {item.year}
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
            <div className='flex justify-center mt-[3.18rem] items-center gap-4 z-20'>
              <span className='pc-body-16-r text-text-60'>
                {String(activeIndex + 1).padStart(2, '0')}/{String(list_awards?.length).padStart(2, '0')}
              </span>
              <div className='flex items-center space-x-[0.16rem]'>
                {list_awards?.map((_, index) => (
                  <div
                    key={index}
                    className={`h-[0.15625rem] rounded-full transition-all duration-300 bg-text-60 ${index === activeIndex ? 'w-[2.44rem] ' : 'w-[1.2rem] opacity-[0.32]'
                      }`}
                  />
                ))}
              </div>
            </div>
          </Swiper>
          <button className='swiper-button-prev-c absolute left-[-4rem] top-[23%] z-20 w-10 h-10 !flex items-center justify-center cursor-pointer'>
            <ChevronLeft
              size={30}
              className='text-text-100 w-[1.09375rem] h-[1.45833rem] hover:text-[#D32F2F] transition-colors'
            />
          </button>
          <button className='swiper-button-next-c absolute right-[-4rem] top-[23%] z-20 w-10 h-10 !flex items-center justify-center cursor-pointer'>
            <ChevronRight
              size={30}
              className='text-text-100 w-[1.09375rem] h-[1.45833rem] hover:text-[#D32F2F] transition-colors'
            />
          </button>
        </div>
      </div>
    </div>
  )
}
