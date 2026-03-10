'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { useRef } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import ICChevronDown from '@/components/icons/ICChevronDown'
import Breadcrumb from '@/components/shared/Breadcrumb'
import ROUTES from '@/configs/routes'
import { Link } from '@/i18n/navigation'
import { ICompany, ISubCompanyRes } from '@/interfaces/subcompany.interface'

import CompanyCard from './components/CompanyCard'

export default function SubCompanyDetail({ res, companys }: { res: ISubCompanyRes; companys: ICompany[] }) {
  const t = useTranslations()
  const locale = useLocale()
  const swiperRef = useRef<SwiperType | null>(null)
  const title = res?.acf?.company_banner?.title

  const companyName = res?.acf?.company_detail?.name
  const companyDesc = res?.acf?.company_detail?.description
  const companyImage = res?.acf?.company_detail?.image
  const companyItems = res?.acf?.company_detail?.items
  return (
    <>
      <div className='xsm:pt-[1.66667rem] xsm:pb-[1.04167rem] bg-white py-[2.08333rem]'>
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
          <h1 className='xsm:mb-h2-24-sm xsm:text-[#090909] font-open-sans pc-h2-54-s text-[rgba(9,9,9,0.80)]'>
            {title}
          </h1>
        </div>
      </div>
      <div className='xsm:max-w-full mx-auto max-w-[75rem] pt-[2.5rem]'>
        <div className='xsm:px-[0.83333rem]'>
          <h2 className='xsm:mb-h2-24-sm font-open-sans xsm:mb-[0.9375rem] mb-[1.04167rem] pc-h2-54-s text-[#090909]'>
            {companyName}
          </h2>
          <p className='font-open-sans xsm:text-[0.72917rem] xsm:[text-box-edge:cap_alphabetic] xsm:[text-box-trim:trim-both] pc-body-18-r-primary text-[#090909]'>
            {companyDesc}
          </p>
        </div>

        <div className='xsm:h-auto xsm:pt-[3.33333rem] relative flex h-[47.39583rem] flex-col items-center justify-center'>
          <Image
            src={companyImage?.url}
            alt={companyImage?.alt}
            width={732}
            height={525}
            className='xsm:h-[15.41667rem] xsm:w-[15.81932rem] xsm:mb-[1.66667rem] mx-auto h-[27.35146rem] w-[38.12854rem] object-cover'
          />
          <div className='xsm:gap-x-[0.78125rem] xsm:px-[0.83333rem] xsm:gap-y-[1.04167rem] z-1 grid grid-cols-2 sm:absolute sm:top-0 sm:left-0 sm:size-full'>
            <div className='col-span-2 h-[0.05208rem] w-full bg-[rgba(9,9,9,0.08)] sm:hidden'></div>
            <div className='xsm:relative xsm:inset-auto xsm:translate-none absolute top-[3.44rem] left-1/2 -translate-x-1/2 space-y-[0.52083rem]'>
              <h3 className='font-open-sans xsm:text-[1.25rem] xsm:text-left mb-[0.52083rem] text-center pc-h3-40-s text-[#D98345]'>
                {companyItems[0]?.label}
              </h3>
              <p className='font-open-sans xsm:text-[0.625rem] xsm:tracking-[-0.00625rem] xsm:text-left text-center pc-body-18-r-primary text-[rgba(9,9,9,0.60)]'>
                {companyItems[0]?.value}
              </p>
            </div>
            <div className='xsm:relative xsm:inset-auto xsm:translate-none absolute top-1/2 right-[4.84rem] -translate-y-1/2 space-y-[0.52083rem]'>
              <h3 className='font-open-sans xsm:text-[1.25rem] xsm:text-left mb-[0.52083rem] text-center pc-h3-40-s text-[#1ABC92]'>
                {companyItems[1]?.label}
              </h3>
              <p className='font-open-sans xsm:text-[0.625rem] xsm:tracking-[-0.00625rem] xsm:text-left text-center pc-body-18-r-primary text-[rgba(9,9,9,0.60)]'>
                {companyItems[1]?.value}
              </p>
            </div>
            <div className='col-span-2 h-[0.05208rem] w-full bg-[rgba(9,9,9,0.08)] sm:hidden'></div>
            <div className='xsm:relative xsm:inset-auto xsm:translate-none absolute bottom-[3.28rem] left-1/2 -translate-x-1/2 space-y-[0.52083rem]'>
              <h3 className='font-open-sans xsm:text-[1.25rem] xsm:text-left mb-[0.52083rem] text-center pc-h3-40-s text-[#D32F2F]'>
                {companyItems[2]?.label}
              </h3>
              <p className='font-open-sans xsm:text-[0.625rem] xsm:tracking-[-0.00625rem] xsm:text-left text-center pc-body-18-r-primary text-[rgba(9,9,9,0.60)]'>
                {companyItems[2]?.value}
              </p>
            </div>
            <div className='xsm:relative xsm:inset-auto xsm:translate-none absolute top-1/2 left-[5.68rem] -translate-y-1/2 space-y-[0.52083rem]'>
              <h3 className='font-open-sans xsm:text-[1.25rem] xsm:text-left mb-[0.52083rem] text-center pc-h3-40-s text-[#4280D8]'>
                {companyItems[3]?.label}
              </h3>
              <p className='font-open-sans xsm:text-[0.625rem] xsm:tracking-[-0.00625rem] xsm:text-left text-center pc-body-18-r-primary text-[rgba(9,9,9,0.60)]'>
                {companyItems[3]?.value}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='xsm:max-w-full xsm:py-[3.33333rem]  pt-[4.17rem] pb-[4.16667rem]'>
        <h2 className='font-open-sans xsm:px-[0.83333rem] xsm:mb-h2-24-sm mx-auto max-w-[75rem] xsm:mb-[1.46rem] mb-[2.5rem] pc-h2-54-s text-[#090909]'>
          {t('SubCompanyPage.companyList')}
        </h2>
        <div className='relative'>
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            navigation={{
              nextEl: '.sub-company-swiper-next',
              prevEl: '.sub-company-swiper-prev',
            }}
            className='sub-company-swiper max-w-[75rem]! xsm:px-[0.83333rem]!'
          >
            {companys.map((company) => (
              <SwiperSlide key={company?.id}>
                <Link
                  href={locale === 'vi' ? `/cong-ty/${company?.slug}` : `/company/${company?.slug}`}
                  className='block h-full'
                >
                  <CompanyCard
                    title={company?.title ?? ''}
                    description={company?.content ?? ''}
                    image={company?.featured_image?.url || '/default.webp'}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          {companys.length > 4 && (
            <div className='absolute top-1/2 left-0 right-0 z-10 flex justify-between max-w-[84rem] pointer-events-none mx-auto'>
              <button
                type='button'
                aria-label='Previous'
                className='sub-company-swiper-prev xsm:hidden z-10 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[rgba(9,9,9,0.08)] bg-white shadow-sm transition hover:border-[#D32F2F] hover:text-[#D32F2F] disabled:pointer-events-none disabled:opacity-40 pointer-events-auto'
              >
                <ChevronLeft className='size-5' />
              </button>
              <button
                type='button'
                aria-label='Next'
                className='sub-company-swiper-next xsm:hidden z-10 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[rgba(9,9,9,0.08)] bg-white shadow-sm transition hover:border-[#D32F2F] hover:text-[#D32F2F] disabled:pointer-events-none disabled:opacity-40 pointer-events-auto'
              >
                <ChevronRight className='size-5' />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className='bg-white'>
        <div className='xsm:max-w-full xsm:h-auto xsm:p-[3.33333rem_0.83333rem] mx-auto flex h-[8.59375rem] max-w-[75rem] items-center justify-between'>
          <Link
            href={locale === 'vi' ? '/ve-chung-toi/so-do-to-chuc' : '/about-us/organizational-chart'}
            className='xsm:max-w-[5.5rem] font-open-sans xsm:text-[0.625rem] inline-flex items-center space-x-[0.3125rem] text-[0.83333rem] leading-[150%] text-[#D32F2F] hover:underline'
          >
            <ICChevronDown className='xsm:size-[0.72917rem] size-[0.83333rem] shrink-0 rotate-90' />
            <span className='[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>
              {t('SubCompanyPage.organizationChart')}
            </span>
          </Link>
          <Link
            href={locale === 'vi' ? ROUTES.aboutUsVi : ROUTES.aboutUsEn}
            className='font-open-sans xsm:text-[0.625rem] inline-flex items-center space-x-[0.3125rem] border-b border-b-[#D32F2F] py-[0.41667rem] text-[0.83333rem] leading-[150%] font-semibold text-[#D32F2F]'
          >
            {t('Breadcrumb.aboutUsPage')}
          </Link>
          <Link
            href={locale === 'vi' ? '/ve-chung-toi/ban-lanh-dao-cong-ty' : '/about-us/leadership'}
            className='xsm:max-w-[5.5rem] font-open-sans xsm:text-right xsm:text-[0.625rem] inline-flex items-center space-x-[0.3125rem] text-[0.83333rem] leading-[150%] text-[#D32F2F] hover:underline'
          >
            <span className='[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>
              {' '}
              {t('SubCompanyPage.leadership')}
            </span>
            <ICChevronDown className='xsm:size-[0.72917rem] size-[0.83333rem] shrink-0 -rotate-90' />
          </Link>
        </div>
      </div>
    </>
  )
}
