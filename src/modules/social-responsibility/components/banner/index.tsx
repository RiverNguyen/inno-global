import Image from 'next/image'
import { useTranslations } from 'next-intl'

import Breadcrumb from '@/components/shared/Breadcrumb'
import { ISocialResponsibilityBanner } from '@/interface/social-responsibility.interface'

type BannerProps = {
  banner?: ISocialResponsibilityBanner
}

export default function Banner({ banner }: BannerProps) {
  const t = useTranslations()

  return (
    <div className="relative h-screen overflow-hidden sm:h-[56.25rem] lg:h-screen xsm:h-auto">
      <Image
        src={banner?.image_desktop || '/social-responsibility/banner.webp'}
        alt="Banner"
        width={1600}
        height={565}
        priority
        className="w-full h-full object-cover sm:absolute sm:inset-0 xsm:hidden"
      />
      <Image
        src={banner?.image_mobile || '/social-responsibility/banner.webp'}
        alt="Banner"
        width={750}
        height={575}
        priority
        className="w-full h-full object-cover sm:hidden xsm:h-[17.96875rem]"
      />
      <div className='absolute left-0 top-0 w-[60rem] h-full z-1 bg-[linear-gradient(270deg,rgba(0,0,0,0.00)_11.04%,rgba(0,0,0,0.40)_100%)] xsm:hidden'></div>

      <div className="z-2 absolute bottom-0 absolute-x-center w-full max-w-[75rem] mx-auto py-[5.20833rem] xsm:static xsm:translate-0 xsm:px-[0.83333rem] xsm:pt-[3.33333rem] xsm:pb-[1.25rem]">
        <Breadcrumb
          navItems={[
            { label: t('Breadcrumb.homePage'), href: '/' },
            { label: t('Breadcrumb.aboutUsPage'), href: '/about' },
          ]}
          lastItem={{ label: t('Breadcrumb.socialResponsibilityPage') }}
          classNameNavItems='font-open-sans text-[0.72917rem] leading-[150%] font-normal text-[rgba(255,255,255,0.50)] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'
          classNameLastItem='font-open-sans text-[0.72917rem] leading-[150%] font-semibold tracking-[-0.00365rem] text-white'
          classNameIcon='text-[rgba(255,255,255,0.40)]'
          classNameContainer='xsm:hidden'
        />

        <h1 className='text-white font-open-sans text-[3.33333rem] font-semibold leading-[2.39583rem] tracking-[-0.06667rem] mt-[1.66667rem] mb-[1.40625rem] xsm:text-primary xsm:text-[1.35417rem] xsm:leading-[120%] xsm:tracking-normal xsm:mt-0 xsm:mb-[1.04167rem]'>
          {banner?.title}
        </h1>

        <p className='w-[44.32292rem] text-[rgba(255,255,255,0.80)] font-open-sans text-[0.9375rem] leading-[150%] xsm:w-full xsm:pb-[0.625rem] xsm:text-[rgba(9,9,9,0.60)] xsm:text-justify xsm:text-[0.72917rem] xsm:leading-[150%] xsm:[text-box-trim:trim-both] xsm:[text-box-edge:cap_alphabetic]'>
          {banner?.description}
        </p>
      </div>
    </div>
  )
}