import Image from 'next/image'
import { useTranslations } from 'next-intl'

import Breadcrumb from '@/components/shared/Breadcrumb'
import { ITrainingAcfData } from '@/interfaces/training.inteface'

export default function Banner({ banner }: { banner: ITrainingAcfData['banner'] }) {
  const t = useTranslations('Breadcrumb')

  return (
    <div className='relative'>
      <div className='relative h-[29.42708rem] xsm:h-[21.8125rem]'>
        <div className='absolute inset-0 z-1 bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_49.89%,rgba(0,0,0,0.74)_79.8%,#000_96.54%)] opacity-40'></div>
        <div className='absolute bottom-0 left-0 right-0 z-2 bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_49.89%,rgba(0,0,0,0.74)_75.85%,#000_96.54%)] opacity-60 h-[20.3125rem] w-full sm:hidden'></div>
        <Image
          src={banner?.image?.desktop}
          alt='banner'
          fill
          priority
          className='object-cover xsm:hidden'
        />
        <Image
          src={banner?.image?.mobile}
          alt='Banner'
          fill
          priority
          className='object-cover sm:hidden'
        />
      </div>
      <div className='z-2 absolute bottom-0 left-0 w-full px-[12.5rem] py-[3.33333rem] xsm:px-[0.83333rem] xsm:py-[1.25rem]'>
        <div className='mb-[1.25rem] hidden sm:block'>
          <Breadcrumb
            navItems={[{ label: t('homePage'), href: '/' }]}
            lastItem={{ label: banner?.title }}
            classNameNavItems='font-open-sans text-[0.72917rem] leading-[150%] font-normal text-[rgba(255,255,255,0.50)] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'
            classNameLastItem='font-open-sans text-[0.72917rem] leading-[150%] font-semibold tracking-[-0.00365rem] text-white'
            classNameIcon='text-white'
          />
        </div>
        <h1 className='font-open-sans xsm:text-[1.35417rem] text-[2.08333rem] leading-[120%] sm:tracking-[-0.03125rem] font-semibold text-white'>
          {banner?.title}
        </h1>
      </div>
    </div>
  )
}
