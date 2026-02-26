import { useTranslations } from 'next-intl'

import FormChangePassword from '@/modules/(auth)/change-password-page/components/form-change-password'

const ChangePasswordModule = () => {
  const t = useTranslations('ChangePasswordPage')
  return (
    <>
      <h1 className='text-[#090909]/80 text-center text-[2.8125rem] font-semibold leading-[1.2] tracking-[-0.02813rem] mb-[1.67rem] xsm:text-[1.35rem] xsm:leading-[1.2] xsm:mb-[1.46rem]'>
        {t('title')}
      </h1>
      <FormChangePassword />
    </>
  )
}

export default ChangePasswordModule
