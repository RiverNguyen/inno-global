'use client'

import { ChevronRightIcon } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

import ROUTES from '@/configs/routes'
import { Link } from '@/i18n/navigation'

export default function NoResult() {
  const t = useTranslations('SearchPage')
  const locale = useLocale()

  return (
    <div className='xsm:w-[19.53125rem] xsm:my-[3.54167rem] mx-auto my-[8.18rem] flex w-[25.15625rem] flex-col items-center justify-center space-y-[1.40625rem]'>
      <h1 className='font-open-sans xsm:w-[11.71875rem] xsm:text-[#090909] xsm:text-[1.35417rem] text-center text-[2.8125rem] leading-[120%] font-semibold tracking-[-0.02813rem] text-[rgba(9,9,9,0.8)]'>
        {t('noResult')}
      </h1>
      <p className='font-open-sans xsm:text-[0.72917rem] text-trim-both xsm:w-[14.11458rem] text-center text-[0.9375rem] leading-[150%] font-normal text-[rgba(9,9,9,0.8)]'>
        {t('noResultDesc')}
      </p>

      <Link
        href={locale === 'vi' ? ROUTES.homeVi : ROUTES.homeEn}
        className='flex-center group relative h-[2.6rem] w-fit overflow-hidden rounded-[5.20833rem] px-[1.15rem] text-[0.73rem] leading-[1.5] text-[#090909]/60 outline outline-[#090909]/60 transition-all duration-300 hover:text-white hover:outline-none'
      >
        <span className='absolute inset-0 rounded-[inherit] bg-[radial-gradient(298.39%_130.99%_at_6.62%_16.15%,_#CA2A2A_15.19%,_#D32F2F_53.77%,_#FF6E6E_100%)] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100' />
        <span className='flex-center relative z-10'>
          {t('goBack')}
          <ChevronRightIcon className='ml-1.25 size-[0.83333rem] translate-y-[0.0375rem] text-[#090909]/60 transition-all duration-300 group-hover:translate-x-[0.5rem] group-hover:text-white' />
        </span>
      </Link>
    </div>
  )
}
