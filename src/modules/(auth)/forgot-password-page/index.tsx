import { useTranslations } from 'next-intl'

import FormForgotPassword from '@/modules/(auth)/forgot-password-page/components/form-forgot-password'

const ForgotPasswordModule = () => {
  const t = useTranslations('ForgotPasswordPage')
  return (
    <>
      <h1 className='xsm:text-[1.35rem] xsm:leading-[1.2] text-center text-[2.8125rem] leading-[1.2] font-semibold tracking-[-0.02813rem] text-[#090909]/80'>
        {t('title')}
      </h1>
      <h2 className='xsm:mt-[0.83rem] xsm:text-[#090909] xsm:text-[0.72rem] xsm:mb-[1.46rem] mt-[1.25rem] mb-[2.08rem] text-center text-[0.9375rem] leading-[1.5] text-[#090909]'>
        {t('desc')}
      </h2>
      <FormForgotPassword />
    </>
  )
}

export default ForgotPasswordModule
