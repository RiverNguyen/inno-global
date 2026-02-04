'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { Autoplay, Parallax } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { cn } from '@/lib/utils'

import 'swiper/css'
import 'swiper/css/parallax'

interface BannerSlidesProps {
  slideItems: {
    image_pc: { alt?: string; url: string }
    image_mobile: { alt?: string; url: string }
  }[]
}

const AUTOPLAY_DELAY = 3000
const SLIDE_SPEED = 1500
const TOTAL_TIME = AUTOPLAY_DELAY + SLIDE_SPEED

export default function BannerSlides({ slideItems }: BannerSlidesProps) {
  const swiperRef = useRef<SwiperType | null>(null)
  const progressRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState<number>(0)

  if (!Array.isArray(slideItems) || !slideItems?.length) return null

  /** Reset + chạy progress */
  const runProgress = (index: number) => {
    progressRefs.current.forEach((el) => {
      if (!el) return
      el.style.transition = 'none'
      el.style.width = '0%'
    })

    requestAnimationFrame(() => {
      const el = progressRefs.current[index]
      if (!el) return
      el.style.transition = `width ${TOTAL_TIME}ms linear`
      el.style.width = '100%'
    })
  }

  return (
    <Swiper
      slidesPerView={1}
      modules={[Parallax, Autoplay]}
      speed={1500}
      loop={true}
      autoplay={{
        delay: AUTOPLAY_DELAY,
        disableOnInteraction: false,
      }}
      onSwiper={(swiper) => {
        swiperRef.current = swiper
        runProgress(swiper.realIndex)
      }}
      onSlideChangeTransitionStart={(swiper) => {
        runProgress(swiper.realIndex)
        setActiveIndex(swiper.realIndex)
      }}
      grabCursor={true}
      parallax={true}
      className='relative h-full w-full'
    >
      {slideItems.map((item, index) => (
        <SwiperSlide
          key={index}
          className='relative overflow-hidden'
        >
          <div
            className='absolute top-0 left-0 size-full overflow-hidden will-change-transform'
            data-swiper-parallax='70%'
          >
            {item?.image_pc && item?.image_pc?.url && (
              <Image
                width={1920}
                height={1080}
                src={item?.image_pc?.url}
                alt={item?.image_pc?.alt || ''}
                loading={index === 0 ? 'eager' : 'lazy'}
                className='absolute top-0 left-0 size-full object-cover will-change-transform'
              />
            )}
            {item?.image_mobile && item?.image_mobile?.url && (
              <Image
                width={1920}
                height={1080}
                src={item?.image_mobile?.url}
                alt={item?.image_mobile?.alt || ''}
                loading={index === 0 ? 'eager' : 'lazy'}
                className='absolute top-0 left-0 size-full object-cover will-change-transform'
              />
            )}
          </div>
        </SwiperSlide>
      ))}

      {/* PROGRESS BAR */}
      <div className='xsm:flex absolute top-[2.9167rem] left-0 z-10 hidden w-full gap-[0.15625rem] px-[0.83333rem]'>
        {slideItems.map((_, index) => (
          <div
            key={index}
            className={cn(
              'relative h-[0.1042rem] w-[3.59375rem] overflow-hidden bg-white/30',
              index === activeIndex && 'flex-1',
            )}
          >
            <span
              ref={(el) => {
                if (!el) return
                progressRefs.current[index] = el
              }}
              className='absolute inset-y-0 left-0 w-0 bg-white'
            />
          </div>
        ))}
      </div>
    </Swiper>
  )
}
