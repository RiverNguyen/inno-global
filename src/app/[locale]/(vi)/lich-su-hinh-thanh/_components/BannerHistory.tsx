import Image from 'next/image'
import { useTranslations } from 'next-intl'

import Breadcrumb from '@/components/shared/Breadcrumb'
import { IBannerHistory } from '@/interfaces/history.interface'

export default function BannerHistory({ banner }: { banner: IBannerHistory }) {
  const t = useTranslations()
  return (
    <section className='relative w-full h-screen xsm:h-[18.17708rem]'>
      <Image
        className='size-full object-cover xsm:hidden'
        src={banner?.image_desktop || '/history/d-bg-history.jpg'}
        alt=''
        width={1920}
        height={1080}
      />
      <Image
        className='size-full object-cover sm:hidden'
        src={banner?.image_mobile || '/history/d-bg-history-mb.webp'}
        alt=''
        width={375}
        height={350}
      />
      <div className='absolute left-0 bottom-0 w-full h-[21.7rem] xsm:h-[8.38542rem] bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_11.66%,rgba(0,0,0,0.70)_62.5%)] xsm:bg-[linear-gradient(180deg,_rgba(0,_0,_0,_0.00)_0%,_rgba(0,_0,_0,_0.70)_65.25%,_rgba(0,_0,_0,_0.90)_100%)] opacity-70'></div>
      <div className='z-2 absolute bottom-0 left-0 w-full sm:px-[12.5rem] sm:py-[3.33333rem] p-[1.46rem_0.83rem]'>
        <div className='mb-[1.25rem] hidden sm:block'>
          <Breadcrumb
            navItems={[
              { label: t('Breadcrumb.homePage'), href: '/' },
              {
                label: t('Breadcrumb.aboutUsPage'),
                href: '/ve-chung-toi',
              },
            ]}
            lastItem={{ label: t('Breadcrumb.developmentHistoryPage') }}
            classNameNavItems='font-open-sans text-[0.72917rem] leading-[150%] font-normal text-[rgba(255,255,255,0.50)] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'
            classNameLastItem='font-open-sans text-[0.72917rem] leading-[150%] font-semibold tracking-[-0.00365rem] text-white'
            classNameIcon='text-[rgba(255,255,255,0.40)]'
          />
        </div>
        <h1 className='font-open-sans xsm:text-[1.35417rem] xsm:leading-[120%] text-[3.33333rem] leading-[2.39583rem] font-semibold text-white'>
          {banner?.title || t('Breadcrumb.developmentHistoryPage')}
        </h1>
      </div>
    </section>
  )
}
