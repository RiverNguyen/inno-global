'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/parallax'
import { Autoplay, Parallax } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const images = [
  { src: '/home/d-bg-banner.jpg', alt: 'Slide 1' },
  { src: 'https://picsum.photos/id/1016/1920/1080', alt: 'Slide 2' },
  { src: 'https://picsum.photos/id/1018/1920/1080', alt: 'Slide 3' },
]

const slidesLogo = [
  { src: '/home/d-logo-1.svg', alt: 'Slide 1' },
  { src: '/home/d-logo-2.svg', alt: 'Slide 2' },
  { src: '/home/d-logo-3.svg', alt: 'Slide 3' },
  { src: '/home/d-logo-4.svg', alt: 'Slide 4' },
  { src: '/home/d-logo-5.svg', alt: 'Slide 5' },
  { src: '/home/d-logo-6.svg', alt: 'Slide 6' },
  { src: '/home/d-logo-7.svg', alt: 'Slide 7' },
  { src: '/home/d-logo-8.svg', alt: 'Slide 8' },
  { src: '/home/d-logo-9.svg', alt: 'Slide 9' },
]

export default function BannerHome() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null)
  const [logoRepeat, setLogoRepeat] = useState(2)
  const marqueeTrackRef = useRef<HTMLDivElement | null>(null)
  const marqueeGroupRef = useRef<HTMLDivElement | null>(null)
  const marqueeViewportRef = useRef<HTMLDivElement | null>(null)

  const handleTogglePlay = () => {
    const next = !isPlaying
    setIsPlaying(next)
    if (next) {
      swiperInstance?.autoplay?.start()
    } else {
      swiperInstance?.autoplay?.stop()
    }
  }

  useEffect(() => {
    if (!marqueeViewportRef.current || !marqueeGroupRef.current) return

    const viewport = marqueeViewportRef.current
    const group = marqueeGroupRef.current

    const computeRepeat = () => {
      const groupWidth = group.scrollWidth
      const viewportWidth = viewport.clientWidth
      if (!groupWidth || !viewportWidth) return

      const needed = Math.max(2, Math.ceil((viewportWidth * 2) / groupWidth))
      setLogoRepeat((prev) => (prev === needed ? prev : needed))
    }

    computeRepeat()

    const resizeObserver = new ResizeObserver(computeRepeat)
    resizeObserver.observe(viewport)
    resizeObserver.observe(group)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  useGSAP(
    () => {
      if (!marqueeTrackRef.current || !marqueeGroupRef.current) return

      const track = marqueeTrackRef.current
      const group = marqueeGroupRef.current
      const speed = 100 // px per second
      let tween: gsap.core.Tween | null = null

      const rebuild = () => {
        const groupWidth = group.scrollWidth
        if (!groupWidth) return

        tween?.kill()
        gsap.set(track, { x: 0 })
        tween = gsap.to(track, {
          x: -groupWidth,
          duration: groupWidth / speed,
          ease: 'none',
          repeat: -1,
        })
      }

      const raf = requestAnimationFrame(rebuild)
      const resizeObserver = new ResizeObserver(rebuild)
      resizeObserver.observe(group)

      return () => {
        cancelAnimationFrame(raf)
        resizeObserver.disconnect()
        tween?.kill()
      }
    },
    { scope: marqueeTrackRef, dependencies: [logoRepeat] },
  )

  return (
    <section className='tablet:h-[70vh] xsm:pt-[1.67rem] xsm:px-[0.8275rem] xsm:h-auto relative h-screen w-full overflow-hidden'>
      <p className='mb-[0.3125rem] text-[1.35rem] leading-[1.2] font-semibold text-[#090909] sm:hidden'>
        Nikko Kanaya Hotel ANNEX ROYAL HOUSE
      </p>
      <div className='flex-y-center mb-[1.04rem] space-x-[0.21rem] sm:hidden'>
        <LocationIcon className='size-[0.72917rem] text-[#D32F2F]' />
        <p className='text-[0.625rem] leading-[1.2] font-semibold text-[#090909]/60'>Quảng Ninh</p>
      </div>
      <div
        className='xsm:hidden pointer-events-none absolute bottom-0 left-0 z-2 h-[35.3125rem] w-full opacity-60'
        style={{
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 38.76%, rgba(0, 0, 0, 0.74) 74.02%, #000 96.54%)',
        }}
      />
      <Swiper
        slidesPerView={1}
        modules={[Parallax, Autoplay]}
        speed={1500}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        grabCursor={true}
        parallax={true}
        className='xsm:h-[11.35rem] relative h-full w-full'
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            className='relative overflow-hidden'
          >
            <div
              className='absolute top-0 left-0 size-full overflow-hidden will-change-transform'
              data-swiper-parallax='70%'
            >
              <Image
                width={1920}
                height={1080}
                src={image.src}
                alt={image.alt}
                className='h-full w-full object-cover will-change-transform'
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Custom pagination & navigation */}
      <div className='xsm:w-[17.86458rem] xsm:mx-auto xsm:py-[0.6875rem] xsm:px-[1.02rem] xsm:right-0 xsm:left-0 xsm:bottom-0 xsm:bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_0%,rgba(0,0,0,0.70)_100%)] absolute right-[12.5rem] bottom-[8.07rem] left-[12.5rem] z-10 flex items-end justify-between'>
        <div></div>
        {/* Slide counter */}
        <div className='xsm:justify-between xsm:w-full flex items-center space-x-[0.4375rem] text-white'>
          <button
            type='button'
            aria-label='Previous slide'
            className='group relative size-[1.25rem] -scale-x-100 transition-opacity sm:hidden'
            onClick={() => swiperInstance?.slidePrev()}
          >
            <NavigationArrows className='absolute inset-0 size-full transition-opacity group-hover:opacity-0' />
            <NavigationArrowsHover className='absolute inset-0 size-full opacity-0 transition-opacity group-hover:opacity-100' />
          </button>

          <div className='flex-y-center space-x-[0.4275rem]'>
            <button
              type='button'
              aria-label={isPlaying ? 'Pause autoplay' : 'Play autoplay'}
              aria-pressed={!isPlaying}
              className='flex-center relative w-[1.04rem] shrink-0'
              onClick={handleTogglePlay}
            >
              <Image
                src='/home/ic_pause.svg'
                alt=''
                width={40}
                height={40}
                unoptimized
                className={`h-auto w-full object-contain ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
              />
              <Image
                src='/home/ic_play.svg'
                alt=''
                width={40}
                height={40}
                unoptimized
                className={`absolute-center size-[1rem] scale-150 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
              />
            </button>

            {/* Progress bar segments */}
            <div className='flex items-center space-x-[0.1875rem]'>
              {images.map((_, index) => (
                <button
                  key={index}
                  type='button'
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-[0.15625rem] min-w-0 shrink-0 cursor-pointer transition-[width,background-color] duration-300 ease-out ${index === activeIndex ? 'xsm:w-[2.1875rem] w-[3.2rem] bg-white' : 'xsm:w-[0.67rem] w-[1.19792rem] bg-white/30'}`}
                  onClick={() => swiperInstance?.slideToLoop(index)}
                />
              ))}
            </div>
          </div>

          {/* Navigation arrows - icons absolute để tránh layout shift khi hover (hover vùng không bị thu nhỏ) */}
          <div className='flex items-center space-x-[0.2rem]'>
            <button
              type='button'
              aria-label='Previous slide'
              className='group xsm:hidden relative size-[1.25rem] -scale-x-100 transition-opacity'
              onClick={() => swiperInstance?.slidePrev()}
            >
              <NavigationArrows className='absolute inset-0 size-full transition-opacity group-hover:opacity-0' />
              <NavigationArrowsHover className='absolute inset-0 size-full opacity-0 transition-opacity group-hover:opacity-100' />
            </button>
            <button
              type='button'
              aria-label='Next slide'
              className='group relative size-[1.25rem] transition-opacity'
              onClick={() => swiperInstance?.slideNext()}
            >
              <NavigationArrows className='absolute inset-0 size-full transition-opacity group-hover:opacity-0' />
              <NavigationArrowsHover className='absolute inset-0 size-full opacity-0 transition-opacity group-hover:opacity-100' />
            </button>
          </div>
        </div>
      </div>

      <div className='absolute bottom-0 left-0 h-[5.47rem] w-full z-10'>
        <div className='absolute left-0 top-0 size-full bg-[rgba(0,0,0,0.28)] backdrop-blur-[2.08px]'></div>
        <div
          ref={marqueeViewportRef}
          className='absolute-center w-[86.6%] h-full overflow-hidden'
        >
          <div
            ref={marqueeTrackRef}
            className='flex h-full w-max items-center whitespace-nowrap will-change-transform'
          >
            {Array.from({ length: logoRepeat }).map((_, repeatIndex) => (
              <div
                key={repeatIndex}
                ref={repeatIndex === 0 ? marqueeGroupRef : undefined}
                className='flex h-full items-center gap-[2.18rem] pr-[2.18rem] shrink-0'
              >
                {slidesLogo.map((logo, index) => (
                  <Image
                    key={`${logo.src}-${repeatIndex}-${index}`}
                    src={logo.src}
                    alt={repeatIndex === 0 ? logo.alt : ''}
                    aria-hidden={repeatIndex !== 0}
                    width={100}
                    height={100}
                    unoptimized
                    className='h-auto w-auto min-h-[1.63474rem] max-h-[3.5rem] object-contain shrink-0'
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const LocationIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='18'
    height='18'
    viewBox='0 0 18 18'
    fill='none'
    {...props}
  >
    <path
      d='M8.99976 5.33002C10.3219 5.33002 11.402 6.40442 11.4021 7.73236C11.4021 9.05869 10.3236 10.1279 8.99976 10.1279C7.67763 10.1278 6.59741 9.05251 6.59741 7.72455C6.59767 6.39848 7.67609 5.3301 8.99976 5.33002ZM8.99976 5.45502C7.75011 5.4551 6.7225 6.47247 6.72241 7.73236C6.72241 8.99095 7.74119 10.0096 8.99976 10.0097C10.2584 10.0097 11.2771 8.991 11.2771 7.73236C11.277 6.47242 10.2495 5.45502 8.99976 5.45502Z'
      fill='currentColor'
      stroke='currentColor'
    />
    <path
      d='M8.99976 1.4375H9.00757C11.6315 1.43752 14.5835 2.97208 15.3523 6.36523C16.206 10.1371 13.9344 13.3544 11.7517 15.4561C10.9768 16.1976 9.98381 16.5703 8.99976 16.5703C8.01608 16.5702 7.02352 16.198 6.24878 15.457H6.24976C4.13514 13.4213 1.93651 10.3316 2.58374 6.71094L2.65503 6.3584C3.42355 2.97276 6.37548 1.4376 8.99976 1.4375ZM8.99976 1.5625C6.74091 1.56259 3.78457 2.73674 2.86499 6.05664L2.78198 6.38477C1.90989 10.1919 4.3102 13.4104 6.34351 15.3604C7.83451 16.7989 10.1728 16.7989 11.6638 15.3604C13.6897 13.4104 16.0899 10.1915 15.2332 6.38477L15.2322 6.38281C14.4132 2.81287 11.3309 1.5625 8.99976 1.5625Z'
      fill='currentColor'
      fillOpacity='0.8'
      stroke='currentColor'
    />
  </svg>
)

const NavigationArrows = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    {...props}
  >
    <path
      d='M8.37302 20.1653C8.14132 20.1666 7.91447 20.099 7.72138 19.9709C7.5283 19.8428 7.37773 19.6601 7.28888 19.4461C7.20003 19.2321 7.17692 18.9965 7.2225 18.7693C7.26807 18.5422 7.38027 18.3337 7.54479 18.1705L13.7274 11.9996L7.54479 5.82863C7.35368 5.60547 7.25382 5.31842 7.26516 5.02483C7.2765 4.73124 7.3982 4.45274 7.60595 4.24499C7.81371 4.03724 8.0922 3.91553 8.38579 3.90419C8.67938 3.89285 8.96644 3.99271 9.18959 4.18382L16.1888 11.183C16.4061 11.4016 16.528 11.6972 16.528 12.0054C16.528 12.3136 16.4061 12.6093 16.1888 12.8278L9.18959 19.827C8.97232 20.0425 8.67905 20.164 8.37302 20.1653Z'
      fill='white'
    />
  </svg>
)

const NavigationArrowsHover = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    {...props}
  >
    <path
      d='M8.37302 20.1653C8.14132 20.1666 7.91447 20.099 7.72138 19.9709C7.5283 19.8428 7.37773 19.6601 7.28888 19.4461C7.20003 19.2321 7.17692 18.9965 7.2225 18.7693C7.26807 18.5422 7.38027 18.3337 7.54479 18.1705L13.7274 11.9996L7.54479 5.82863C7.35368 5.60547 7.25382 5.31842 7.26516 5.02483C7.2765 4.73124 7.3982 4.45274 7.60595 4.24499C7.81371 4.03724 8.0922 3.91553 8.38579 3.90419C8.67938 3.89285 8.96644 3.99271 9.18959 4.18382L16.1888 11.183C16.4061 11.4016 16.528 11.6972 16.528 12.0054C16.528 12.3136 16.4061 12.6093 16.1888 12.8278L9.18959 19.827C8.97232 20.0425 8.67905 20.164 8.37302 20.1653Z'
      fill='url(#paint0_linear_448_10154)'
    />
    <defs>
      <linearGradient
        id='paint0_linear_448_10154'
        x1='11.8639'
        y1='3.90332'
        x2='11.8639'
        y2='20.1653'
        gradientUnits='userSpaceOnUse'
      >
        <stop
          offset='0.239749'
          stopColor='#FFB2B2'
        />
        <stop
          offset='0.817788'
          stopColor='#D32F2F'
        />
      </linearGradient>
    </defs>
  </svg>
)
