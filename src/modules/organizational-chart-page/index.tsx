'use client'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'

import ICChevronDown from '@/components/icons/ICChevronDown'
import Breadcrumb from '@/components/shared/Breadcrumb'
import ROUTES from '@/configs/routes'
import { Link } from '@/i18n/navigation'
import { IOrganizationalChartRes } from '@/interface/organizational-chart'

export default function OrganizationalChartDetail({ res }: { res: IOrganizationalChartRes }) {
  const t = useTranslations()
  const locale = useLocale()

  const title = res?.acf?.organizational_title
  const chart = res?.acf?.organizational_chart

  return (
    <>
      <div className='xsm:pt-[1.66667rem] xsm:pb-[0.83333rem] bg-white pt-[2.08333rem] pb-[2.08333rem]'>
        <div className='xsm:max-w-full xsm:px-[0.83333rem] mx-auto max-w-[75rem]'>
          <Breadcrumb
            navItems={[
              {
                label: t('Breadcrumb.homePage'),
                href: '/',
              },
              {
                label: t('Breadcrumb.aboutUsPage'),
                href: '/about-us',
              },
            ]}
            lastItem={{
              label: title,
            }}
            classNameContainer='mb-[1.25rem] xsm:hidden'
          />
          <h1 className='xsm:text-[1.35417rem] xsm:text-[#090909] font-open-sans text-[2.8125rem] leading-[120%] font-semibold tracking-[-0.02813rem] text-[rgba(9,9,9,0.80)]'>
            {title}
          </h1>
        </div>
      </div>
      <div className='xsm:py-[2.29167rem] xsm:px-[0.83333rem] xsm:bg-[#F4F4F4] relative py-[4.16667rem]'>
        <Image
          src={chart?.desktop?.url}
          alt={chart?.desktop?.alt}
          width={1626}
          height={802}
          className='xsm:hidden mx-auto h-[41.79839rem] w-[84.6875rem]'
        />
        <Image
          src={chart?.mobile?.url}
          alt={chart?.mobile?.alt}
          width={0}
          height={0}
          sizes='100vw'
          className='mx-auto h-[78.2249rem] w-full sm:hidden'
        />
      </div>
      <div className='bg-white'>
        <div className='xsm:max-w-full xsm:h-auto xsm:p-[3.33333rem_0.83333rem] mx-auto flex h-[8.59375rem] max-w-[75rem] items-center justify-between'>
          <Link
            href='#'
            className='font-open-sans xsm:text-[0.625rem] inline-flex items-center space-x-[0.3125rem] text-[0.83333rem] leading-[150%] text-[#D32F2F]'
          >
            <ICChevronDown className='xsm:size-[0.72917rem] size-[0.83333rem] shrink-0 rotate-90' />
            <span className='[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>Trang B</span>
          </Link>
          <Link
            href={locale === 'vi' ? ROUTES.aboutUsVi : ROUTES.aboutUsEn}
            className='font-open-sans xsm:text-[0.625rem] inline-flex items-center space-x-[0.3125rem] border-b border-b-[#D32F2F] py-[0.41667rem] text-[0.83333rem] leading-[150%] font-semibold text-[#D32F2F]'
          >
            {t('Breadcrumb.aboutUsPage')}
          </Link>
          <Link
            href='#'
            className='font-open-sans xsm:text-[0.625rem] inline-flex items-center space-x-[0.3125rem] text-[0.83333rem] leading-[150%] text-[#D32F2F]'
          >
            <span className='[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>Trang A</span>
            <ICChevronDown className='xsm:size-[0.72917rem] size-[0.83333rem] shrink-0 -rotate-90' />
          </Link>
        </div>
      </div>
    </>
  )
}
