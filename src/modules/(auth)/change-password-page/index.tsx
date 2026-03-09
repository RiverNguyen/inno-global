import { useTranslations } from 'next-intl'

import FormChangePassword from '@/modules/(auth)/change-password-page/components/form-change-password'

const ChangePasswordModule = () => {
  const t = useTranslations('ChangePasswordPage')
  return (
    <>
      <h1 className='xsm:text-[1.35rem] xsm:leading-[1.2] xsm:mb-[1.46rem] mb-[1.67rem] text-center pc-h2-54-s text-[#090909]/80'>
        {t('title')}
      </h1>
      <FormChangePassword />
    </>
  )
}

export default ChangePasswordModule
