import Image from 'next/image'
import { useTranslations } from 'next-intl'

import Breadcrumb from '@/components/shared/Breadcrumb'
import { ISocialResponsibilityBanner } from '@/interfaces/social-responsibility.interface'

type BannerProps = {
  banner?: ISocialResponsibilityBanner
  aboutUsHref: string
}

export default function Banner({ banner, aboutUsHref }: BannerProps) {
  const t = useTranslations()

  return (
    <div className='xsm:h-auto xsm:pt-[2.92rem] relative h-screen overflow-hidden sm:h-[56.25rem] lg:h-screen'>
      <Image
        src={banner?.image_desktop || '/social-responsibility/banner.webp'}
        alt='Banner'
        width={1600}
        height={565}
        priority
        className='xsm:hidden h-full w-full object-cover sm:absolute sm:inset-0'
      />
      <Image
        src={banner?.image_mobile || '/social-responsibility/banner.webp'}
        alt='Banner'
        width={750}
        height={575}
        priority
        className='xsm:h-[17.96875rem] h-full w-full object-cover sm:hidden'
      />
      <div className='xsm:hidden absolute top-0 left-0 z-1 h-full w-[60rem] bg-[linear-gradient(270deg,rgba(0,0,0,0.00)_11.04%,rgba(0,0,0,0.40)_100%)]'></div>

      <div className='absolute-x-center xsm:static xsm:translate-0 xsm:px-[0.83333rem] xsm:pt-[3.33333rem] xsm:pb-[1.25rem] absolute bottom-0 z-2 mx-auto w-full max-w-[75rem] py-[5.20833rem]'>
        <Breadcrumb
          navItems={[
            { label: t('Breadcrumb.homePage'), href: '/' },
            { label: t('Breadcrumb.aboutUsPage'), href: aboutUsHref },
          ]}
          lastItem={{ label: t('Breadcrumb.socialResponsibilityPage') }}
          classNameNavItems='font-open-sans text-[0.72917rem] leading-[150%] font-normal text-[rgba(255,255,255,0.50)] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'
          classNameLastItem='font-open-sans text-[0.72917rem] leading-[150%] font-semibold tracking-[-0.00365rem] text-white'
          classNameIcon='text-[rgba(255,255,255,0.40)]'
          classNameContainer='xsm:hidden'
        />

        <h1 className='font-open-sans xsm:text-primary xsm:text-[1.35417rem] xsm:leading-[120%] xsm:tracking-normal xsm:mt-0 xsm:mb-[1.04167rem] mt-[1.66667rem] mb-[1.40625rem] pc-h3-40-s text-white'>
          {banner?.title}
        </h1>

        <p className='font-open-sans xsm:w-full xsm:pb-[0.625rem] xsm:text-[rgba(9,9,9,0.60)] xsm:text-justify xsm:text-[0.72917rem] xsm:leading-[150%] xsm:[text-box-trim:trim-both] xsm:[text-box-edge:cap_alphabetic] w-[44.32292rem] pc-body-18-r-primary text-[rgba(255,255,255,0.80)]'>
          {banner?.description}
        </p>
      </div>
    </div>
  )
}
