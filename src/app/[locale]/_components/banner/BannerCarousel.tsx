'use client'

import Image from 'next/image'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/parallax'
import { Autoplay, Parallax } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { IAcfImage } from '@/interfaces/acf-wp.interface'

const SWIPER_MODULES = [Parallax, Autoplay] as const
const SWIPER_AUTOPLAY = { delay: 3000, disableOnInteraction: false } as const

type BannerCarouselProps = {
  onSwiper: (swiper: SwiperType) => void
  onActiveIndexChange: (index: number) => void
  images: IAcfImage[]
}

export default function BannerCarousel({ onSwiper, onActiveIndexChange, images }: BannerCarouselProps) {
  return (
    <Swiper
      slidesPerView={1}
      modules={Array.from(SWIPER_MODULES)}
      speed={1500}
      loop={true}
      autoplay={SWIPER_AUTOPLAY}
      grabCursor={true}
      parallax={true}
      className='relative size-full'
      onSwiper={onSwiper}
      onSlideChange={(swiper) => onActiveIndexChange(swiper.realIndex)}
    >
      {Array.isArray(images) &&
        images.map((image) => (
          <SwiperSlide
            key={image.id}
            className='relative overflow-hidden'
          >
            <div
              className='absolute top-0 left-0 size-full overflow-hidden will-change-transform'
              data-swiper-parallax='70%'
            >
              <Image
                width={1920}
                height={1080}
                src={image.url}
                alt={image.alt || ''}
                className='size-full object-cover will-change-transform'
              />
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  )
}
