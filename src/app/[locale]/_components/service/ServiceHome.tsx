'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useState, type WheelEvent } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'

import { cn } from '@/lib/utils'

type ServiceHomeItem = {
  title: string
  description: string
  image: string
  href: string
}

export default function ServiceHome({ services, title }: { services: ServiceHomeItem[]; title: string }) {
  const t = useTranslations('ServiceSection')
  const [activeService, setActiveService] = useState(0)
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null)

  const handleServiceListWheelCapture = (event: WheelEvent<HTMLDivElement>) => {
    const list = event.currentTarget
    const hasScrollableOverflow = list.scrollHeight - list.clientHeight > 1

    // If this list cannot scroll, let ScrollSnapWrapper handle it.
    if (!hasScrollableOverflow) return

    const isScrollingDown = event.deltaY > 0
    const isScrollingUp = event.deltaY < 0
    const atTopEdge = list.scrollTop <= 0
    const atBottomEdge = list.scrollTop + list.clientHeight >= list.scrollHeight - 1

    // Consume wheel only while the inner list can continue scrolling.
    if ((isScrollingDown && !atBottomEdge) || (isScrollingUp && !atTopEdge) || event.deltaY === 0) {
      event.stopPropagation()
    }
  }

  // Handle left menu click
  const handleServiceClick = (index: number) => {
    setActiveService(index)
    if (swiperInstance) {
      swiperInstance.slideTo(index)
    }
  }

  return (
    <div className='xsm:hidden flex min-h-screen'>
      {/* Left Menu */}
      <div className='relative z-20 w-[35.3125rem] space-y-[2.24rem] bg-white pt-[5.7rem] pr-[2.92rem] pb-[5.18rem] pl-[7.29rem]'>
        <h3 className='pc-h3-40-s text-text-100'>{title}</h3>
        <div
          data-snap-ignore
          onWheelCapture={handleServiceListWheelCapture}
          className='sm:[&::-webkit-scrollbar-thumb]:bg-primary-red-100/40 sm:[&::-webkit-scrollbar-thumb:hover]:bg-primary-red-100/65 grid grid-cols-1 sm:max-h-[80vh] sm:overflow-y-auto sm:overscroll-contain sm:pr-[0.25rem] sm:pb-[10vh] sm:[scrollbar-color:rgba(211,47,47,0.45)_transparent] sm:[scrollbar-width:thin] sm:[&::-webkit-scrollbar]:w-[0.35rem] sm:[&::-webkit-scrollbar-thumb]:rounded-full sm:[&::-webkit-scrollbar-track]:bg-transparent'
        >
          {services.map((service, index) => (
            <p
              key={index}
              onClick={() => handleServiceClick(index)}
              className={cn(
                `pc-body-20-r border-b-en-60/10 cursor-pointer border-b px-[0.9375rem] py-[1.25rem] text-[1.04167rem] transition-all duration-300 ${index === 0 ? 'border-t-en-60/10 border-t' : ''}`,
                activeService === index
                  ? 'text-primary-red-100 bg-[linear-gradient(90deg,rgba(211,47,47,0.04)_87.82%,rgba(211,47,47,0.00)_100%)]'
                  : 'text-en-60 hover:text-primary-red-100 hover:bg-[linear-gradient(90deg,rgba(211,47,47,0.04)_87.82%,rgba(211,47,47,0.00)_100%)]',
              )}
            >
              {service.title}
            </p>
          ))}
        </div>
      </div>

      {/* Right Content */}
      <div className='h-screen flex-1 overflow-hidden'>
        <Swiper
          direction='vertical'
          spaceBetween={0}
          slidesPerView={1}
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => setActiveService(swiper.activeIndex)}
          speed={800}
          className='h-full w-full'
          allowTouchMove={true}
        >
          {services.map((service, index) => (
            <SwiperSlide
              key={index}
              className='relative h-full w-full overflow-hidden'
            >
              <div className='absolute inset-0 h-full w-full'>
                <div className='relative h-full w-full'>
                  <Image
                    src={service.image || '/default.webp'}
                    alt={service.title}
                    fill
                    className='h-full w-full object-cover'
                    priority={index === 0}
                  />
                  {/* Dark Overlay */}
                  <div className='absolute inset-0 bg-black/40' />
                </div>
              </div>

              {/* Text Content */}
              <div className='pointer-events-none absolute top-[5.68rem] left-[5.21rem] z-10 text-white'>
                <div className='pointer-events-auto'>
                  <h2 className='pc-34-34-m mb-[0.94rem] text-white'>{service.title}</h2>
                  <p className='pc-body-20-r mb-[2rem] max-w-[52.1875rem] text-[1.04167rem] text-white'>
                    {service.description}
                  </p>
                  <div className='group ml-auto flex w-fit cursor-pointer items-center space-x-[0.28rem] opacity-80 hover:opacity-100 transition-all duration-300'>
                    <Link
                      href={service.href}
                      className='pc-button-16-r'
                    >
                      {t('viewDetail')}
                    </Link>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='7'
                      height='11'
                      viewBox='0 0 7 11'
                      fill='none'
                      className='transition-transform group-hover:translate-x-1 size-2.5'
                    >
                      <path
                        d='M3.96486 5.17871L6.12832 5.18545L3.96631 5.17871L6.20402e-05 0.942809L0.942871 0L6.12832 5.18545L0.942867 10.3709L5.79098e-05 9.42809L3.96486 5.17871Z'
                        fill='white'
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
