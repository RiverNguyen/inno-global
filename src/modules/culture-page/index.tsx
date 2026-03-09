'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'
import 'swiper/css'
import 'swiper/css/parallax'
import type { Swiper as SwiperType } from 'swiper'
import { Autoplay, Parallax } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import ICChevronDown from '@/components/icons/ICChevronDown'
import Breadcrumb from '@/components/shared/Breadcrumb'
import ROUTES from '@/configs/routes'
import useIsMobile from '@/hooks/useIsMobile'
import { Link } from '@/i18n/navigation'
import { ICultureRes } from '@/interfaces/culture.interface'

import CoreValueCard from './components/CoreValueCard'

const formatNumber = (n: number) => n.toString().padStart(2, '0')

export default function CultureDetail({ res }: { res: ICultureRes }) {
  const t = useTranslations()
  const locale = useLocale()
  const [activeIndex, setActiveIndex] = useState(0)
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null)
  const { isMobile, isLoading } = useIsMobile()

  const title = res?.acf?.culture_title
  const items = res?.acf?.culture_items
  const activity = res?.acf?.culture_activity

  const totalSlides = Array.isArray(activity?.gallery) ? activity.gallery.length : 0

  return (
    <>
      <div className='xsm:pt-[1.66667rem] xsm:pb-[1.04167rem] bg-white pt-[2.08333rem] pb-[2.08333rem]'>
        <div className='xsm:max-w-full xsm:px-[0.83333rem] mx-auto max-w-[75rem]'>
          <Breadcrumb
            navItems={[
              {
                label: t('Breadcrumb.homePage'),
                href: '/',
              },
              {
                label: t('Breadcrumb.aboutUsPage'),
                href: locale === 'vi' ? ROUTES.aboutUsVi : ROUTES.aboutUsEn,
              },
            ]}
            lastItem={{
              label: title,
            }}
            classNameContainer='mb-[1.25rem] xsm:hidden'
          />
          <h1 className='xsm:text-[1.35417rem] xsm:text-[#090909] font-open-sans pc-h2-54-s text-[rgba(9,9,9,0.80)]'>
            {title}
          </h1>
        </div>
      </div>
      <div className='xsm:pt-[1.66667rem] xsm:pb-[3.33333rem] pt-[2.5rem] pb-[6.25rem]'>
        <div className='xsm:max-w-full xsm:px-[0.83333rem] mx-auto max-w-[75rem]'>
          <h2 className='font-open-sans xsm:text-[1.25rem] xsm:mb-[1.25rem] mb-[1.67rem] pc-h3-40-s text-[#090909]'>
            {formatNumber(items.length)}{' '}
            {items.length === 1 ? t('CorporateCulturePage.coreValue') : t('CorporateCulturePage.coreValues')}
          </h2>
          {isMobile && !isLoading ? (
            <div className='space-y-[0.3125rem] overflow-hidden'>
              {Array.isArray(items) &&
                items.map((item, i) => (
                  <CoreValueCard
                    key={i}
                    item={item}
                    number={i + 1}
                    pageTitle={title}
                  />
                ))}
            </div>
          ) : (
            <div className='flex space-x-[0.625rem]'>
              <div className='space-y-[0.625rem]'>
                {Array.isArray(items) &&
                  items
                    .map((item, index) => ({ item, index }))
                    .filter(({ index }) => (index + 1) % 2 !== 0)
                    .map(({ item, index }) => {
                      return (
                        <CoreValueCard
                          key={index}
                          item={item}
                          number={index + 1}
                          pageTitle={title}
                        />
                      )
                    })}
              </div>
              <div className='space-y-[0.625rem]'>
                {Array.isArray(items) &&
                  items
                    .map((item, index) => ({ item, index }))
                    .filter(({ index }) => (index + 1) % 2 === 0)
                    .map(({ item, index }) => (
                      <CoreValueCard
                        key={index}
                        item={item}
                        number={index + 1}
                        pageTitle={title}
                      />
                    ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='xsm:pb-[3.33333rem] pb-[6.25rem]'>
        <div className='xsm:max-w-full mx-auto max-w-[75rem]'>
          <h2 className='xsm:px-[0.83333rem] font-open-sans xsm:w-[13.28125rem] xsm:text-[1.25rem] xsm:mb-[1.04167rem] mb-[1.67rem] pc-h3-40-s text-[#090909]'>
            {activity?.title}
          </h2>
          <div className='relative w-full'>
            <div className='relative'>
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
                className='xsm:h-[11.51042rem] relative h-[37.29167rem] w-full'
                onSwiper={setSwiperInstance}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              >
                {Array.isArray(activity?.gallery) &&
                  activity.gallery.map((image, i) => (
                    <SwiperSlide key={i}>
                      <Image
                        width={1440}
                        height={716}
                        src={image?.url}
                        alt={image?.alt}
                        className='h-full w-full object-cover will-change-transform'
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>

              <div className='xsm:bottom-0 xsm:left-0 xsm:top-auto xsm:w-full xsm:p-[0.41667rem_0.83333rem] xsm:bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_0%,rgba(0,0,0,0.70)_100%)] xsm:h-[2.29167rem] absolute top-1/2 left-1/2 z-10 mx-auto flex w-[80.78125rem] items-center justify-between sm:-translate-1/2'>
                <button
                  type='button'
                  aria-label='Previous slide'
                  className='size-[1.45833rem] shrink-0 cursor-pointer'
                  onClick={() => swiperInstance?.slidePrev()}
                >
                  <ChevronLeft className='xsm:text-white size-[1.45833rem] text-[#090909]' />
                </button>
                <div className='xsm:text-white xsm:h-[2.29167rem] flex w-full items-center justify-center space-x-[0.4375rem] text-[rgba(9,9,9,0.60)] sm:hidden'>
                  <div className='flex-y-center xsm:space-x-[0.41667rem] space-x-[0.4275rem]'>
                    <span className='xsm:text-[0.625rem] pc-body-16-r'>
                      {formatNumber(activeIndex + 1)}/{formatNumber(totalSlides)}
                    </span>

                    {/* Progress bar segments */}
                    <div className='xsm:space-x-[0.15625rem] flex items-center space-x-[0.1875rem]'>
                      {Array.isArray(activity?.gallery) &&
                        activity.gallery.map((_, index) => (
                          <button
                            key={index}
                            type='button'
                            aria-label={`Go to slide ${index + 1}`}
                            className={`xsm:bg-white xsm:h-[0.10417rem] h-[0.15625rem] min-w-0 shrink-0 cursor-pointer bg-[rgba(9,9,9,0.60)] transition-[width,background-color] duration-300 ease-out ${index === activeIndex ? 'xsm:w-[2.1875rem] w-[3.2rem] opacity-100' : 'xsm:w-[0.67rem] w-[1.19792rem] opacity-32'}`}
                            onClick={() => swiperInstance?.slideToLoop(index)}
                          />
                        ))}
                    </div>
                  </div>
                </div>
                <button
                  type='button'
                  aria-label='Next slide'
                  className='size-[1.45833rem] shrink-0 cursor-pointer'
                  onClick={() => swiperInstance?.slideNext()}
                >
                  <ChevronRight className='xsm:text-white size-[1.45833rem] text-[#090909]' />
                </button>
              </div>
            </div>
            <div className='xsm:hidden mt-[1.25rem] flex w-full items-center justify-center space-x-[0.4375rem] text-[rgba(9,9,9,0.60)]'>
              <div className='flex-y-center xsm:space-x-[0.41667rem] space-x-[0.4275rem]'>
                <span className='xsm:text-[0.625rem] pc-body-16-r'>
                  {formatNumber(activeIndex + 1)}/{formatNumber(totalSlides)}
                </span>

                {/* Progress bar segments */}
                <div className='xsm:space-x-[0.15625rem] flex items-center space-x-[0.1875rem]'>
                  {Array.isArray(activity?.gallery) &&
                    activity.gallery.map((_, index) => (
                      <button
                        key={index}
                        type='button'
                        aria-label={`Go to slide ${index + 1}`}
                        className={`xsm:bg-white xsm:h-[0.10417rem] h-[0.15625rem] min-w-0 shrink-0 cursor-pointer bg-[rgba(9,9,9,0.60)] transition-[width,background-color] duration-300 ease-out ${index === activeIndex ? 'xsm:w-[2.1875rem] w-[3.2rem] opacity-100' : 'xsm:w-[0.67rem] w-[1.19792rem] opacity-32'}`}
                        onClick={() => swiperInstance?.slideToLoop(index)}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-white'>
        <div className='xsm:max-w-full xsm:h-auto xsm:p-[3.33333rem_0.83333rem] mx-auto flex h-[8.59375rem] max-w-[75rem] items-center justify-between'>
          <Link
            href={locale === 'vi' ? '/ve-chung-toi/ban-lanh-dao-cong-ty' : '/about-us/leadership'}
            className='font-open-sans xsm:text-[0.625rem] xsm:max-w-[5.5rem] inline-flex items-center space-x-[0.3125rem] text-[0.83333rem] leading-[150%] text-[#D32F2F] hover:underline'
          >
            <ICChevronDown className='xsm:size-[0.72917rem] size-[0.83333rem] shrink-0 rotate-90' />
            <span className='[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>
              {' '}
              {t('CorporateCulturePage.leadership')}
            </span>
          </Link>
          <Link
            href={locale === 'vi' ? ROUTES.aboutUsVi : ROUTES.aboutUsEn}
            className='font-open-sans xsm:text-[0.625rem] inline-flex items-center space-x-[0.3125rem] border-b border-b-[#D32F2F] py-[0.41667rem] text-[0.83333rem] leading-[150%] font-semibold text-[#D32F2F]'
          >
            {t('Breadcrumb.aboutUsPage')}
          </Link>
          <Link
            href={locale === 'vi' ? '/ve-chung-toi/lich-su-hinh-thanh' : '/about-us/formation-history'}
            className='font-open-sans xsm:max-w-[5.5rem] xsm:text-right xsm:text-[0.625rem] inline-flex items-center space-x-[0.3125rem] text-[0.83333rem] leading-[150%] text-[#D32F2F] hover:underline'
          >
            <span className='[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>
              {t('CorporateCulturePage.formationHistory')}
            </span>
            <ICChevronDown className='xsm:size-[0.72917rem] size-[0.83333rem] shrink-0 -rotate-90' />
          </Link>
        </div>
      </div>
    </>
  )
}
