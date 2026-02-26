'use client'

import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import FormVerifyOTP from '@/modules/(auth)/verify-otp-page/components/form-verify-otp'

const VerifyOTPModule = () => {
  const t = useTranslations('VerifyOTPPage')
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  return (
    <>
      <h1 className='text-[#090909]/80 text-center text-[2.8125rem] font-semibold leading-[1.2] tracking-[-0.02813rem] xsm:text-[1.35rem] xsm:leading-[1.2]'>
        {t('title')}
      </h1>
      <h2 className='mt-[1.25rem] text-[#090909] text-center text-[0.9375rem] leading-[1.5] xsm:mt-[1.25rem] xsm:text-[#090909] xsm:text-[0.72rem] xsm:mb-[0.42rem]'>
        {t('desc')}
      </h2>
      <div className='flex items-center justify-center space-x-[0.36rem] mb-[1.67rem] mt-[0.21rem] xsm:mt-0 xsm:mb-[1.25rem]'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          className='size-4 xsm:size-[0.72rem] translate-y-[0.05rem]'
        >
          <path
            d='M11.334 13.6654H4.66732C2.66732 13.6654 1.33398 12.6654 1.33398 10.332V5.66536C1.33398 3.33203 2.66732 2.33203 4.66732 2.33203H11.334C13.334 2.33203 14.6673 3.33203 14.6673 5.66536V10.332C14.6673 12.6654 13.334 13.6654 11.334 13.6654Z'
            stroke='#D32F2F'
            strokeMiterlimit='10'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M11.3327 6L9.24601 7.66667C8.55935 8.21333 7.43268 8.21333 6.74601 7.66667L4.66602 6'
            stroke='#D32F2F'
            strokeMiterlimit='10'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        <p className='text-[#090909] text-[0.83rem] font-semibold leading-[1.3] tracking-[-0.00833rem] xsm:text-[0.73rem]'>
          {email ?? ''}
        </p>
      </div>
      <FormVerifyOTP email={email ?? ''} />
    </>
  )
}

export default VerifyOTPModule
