import Image from 'next/image'
// Import Swiper React components
import type { Swiper as SwiperType } from 'swiper'
import { Autoplay, EffectFade, Pagination, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/thumbs'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import './styles.css'

import { IProject } from '@/app/[locale]/_components/projects/projects'

interface IBackgroundSwiperProps {
  data: IProject[]
  thumbsSwiper: SwiperType
  _activeIndex: number
  setActiveIndex: (index: number) => void
}

export default function BackgroundSwiper({ data, thumbsSwiper, setActiveIndex }: IBackgroundSwiperProps) {
  return (
    <div className='absolute top-0 left-0 w-full h-full pointer-events-none xsm:h-[20.625rem]'>
      <Swiper
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        thumbs={{ swiper: thumbsSwiper }}
        effect='fade'
        modules={[Thumbs, EffectFade, Autoplay, Pagination]}
        pagination={{
          el: '.project-background-swiper-pagination',
          clickable: true,
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className='h-full w-full'
      >
        {Array.isArray(data) &&
          data.map((item) => (
            <SwiperSlide key={item.id + 'background_item'}>
              <Image
                alt={item.title}
                width={1920}
                height={1080}
                src={item.image}
                className='h-full w-full object-cover'
                unoptimized
              />
            </SwiperSlide>
          ))}
        <div className='sm:hidden project-background-swiper-pagination absolute z-50 flex items-center justify-center w-full px-[0.83rem]' />
      </Swiper>
      <div className='absolute bottom-0 left-0 w-full h-[33.17708rem] bg-[linear-gradient(0deg,rgba(0,0,0,0.90)_0%,rgba(0,0,0,0.00)_100%)] z-10 xsm:h-full xsm:bg-[linear-gradient(0deg,#000_22.37%,rgba(102,102,102,0.00)_42.53%)] opacity-[0.48] xsm:hidden' />
    </div>
  )
}
