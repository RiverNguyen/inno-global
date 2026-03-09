import Image from 'next/image'
import { useTranslations } from 'next-intl'

import Breadcrumb from '@/components/shared/Breadcrumb'
import { IBannerHistory } from '@/interfaces/history.interface'

export default function BannerHistory({ banner }: { banner: IBannerHistory }) {
  const t = useTranslations()
  return (
    <section className='xsm:h-[21.8125rem] relative h-screen w-full tablet:h-[40vh]'>
      <Image
        className='xsm:hidden size-full object-cover'
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
      <div className='xsm:h-[8.38542rem] xsm:bg-[linear-gradient(180deg,_rgba(0,_0,_0,_0.00)_0%,_rgba(0,_0,_0,_0.70)_65.25%,_rgba(0,_0,_0,_0.90)_100%)] absolute bottom-0 left-0 h-[21.7rem] w-full bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_11.66%,rgba(0,0,0,0.70)_62.5%)] opacity-70'></div>
      <div className='absolute bottom-0 left-0 z-2 max-w-[75rem] mx-auto right-0 w-full p-[1.46rem_0.83rem] sm:py-[5.21rem]'>
        <div className='mb-[1.67rem] hidden sm:block'>
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
            classNameIcon='text-white'
          />
        </div>
        <h1 className='font-open-sans xsm:text-[1.35417rem] xsm:leading-[120%] text-[2.083rem] tracking-[-0.03125rem] leading-[1.2] font-semibold text-white'>
          {banner?.title || t('Breadcrumb.developmentHistoryPage')}
        </h1>
      </div>
    </section>
  )
}
