import { useTranslations } from 'next-intl'

import FormForgotPassword from '@/modules/(auth)/forgot-password-page/components/form-forgot-password'

const ForgotPasswordModule = () => {
  const t = useTranslations('ForgotPasswordPage')
  return (
    <>
      <h1 className='text-[#090909]/80 text-center text-[2.8125rem] font-semibold leading-[1.2] tracking-[-0.02813rem]'>
        {t('title')}
      </h1>
      <h2 className='mt-[1.25rem] text-[#090909] text-center text-[0.9375rem] leading-[1.5] mb-[2.08rem]'>
        {t('desc')}
      </h2>
      <FormForgotPassword />
    </>
  )
}

export default ForgotPasswordModule
