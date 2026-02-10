'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'

import BannerCarousel from './BannerCarousel'
import BannerControls from './BannerControls'
import LogoMarquee from './LogoMarquee'

import { ISectionBannerAcf } from '@/interfaces/home.interface'

export default function BannerHome({ data }: { data: ISectionBannerAcf }) {
  const { image_slide, partner_slide } = data
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const swiperRef = useRef<SwiperType | null>(null)
  const isPlayingRef = useRef(true)

  useEffect(() => {
    isPlayingRef.current = isPlaying
  }, [isPlaying])

  const handleSwiper = useCallback((swiper: SwiperType) => {
    swiperRef.current = swiper
    if (!isPlayingRef.current) {
      swiper.autoplay?.stop()
    }
  }, [])

  const handleTogglePlay = useCallback(() => {
    setIsPlaying((prev) => {
      const next = !prev
      const swiper = swiperRef.current
      if (swiper?.autoplay) {
        if (next) swiper.autoplay.start()
        else swiper.autoplay.stop()
      }
      return next
    })
  }, [])

  const handlePrev = useCallback(() => {
    swiperRef.current?.slidePrev()
  }, [])

  const handleNext = useCallback(() => {
    swiperRef.current?.slideNext()
  }, [])

  const handleSelect = useCallback((index: number) => {
    swiperRef.current?.slideToLoop(index)
  }, [])

  return (
    <section className='tablet:h-[70vh] xsm:h-[18.17708rem] xsm:mt-[2.92rem] relative h-screen w-full overflow-hidden'>
      <BannerCarousel
        onSwiper={handleSwiper}
        onActiveIndexChange={setActiveIndex}
        images={image_slide}
      />
      <BannerControls
        activeIndex={activeIndex}
        total={image_slide.length}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onPrev={handlePrev}
        onNext={handleNext}
        onSelect={handleSelect}
      />
      <LogoMarquee logos={partner_slide} />
    </section>
  )
}
