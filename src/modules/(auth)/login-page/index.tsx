import { useTranslations } from 'next-intl'

import FormLogin from '@/modules/(auth)/login-page/components/form-login'

const LoginModule = () => {
  const t = useTranslations('LoginPage')
  return (
    <>
      <h1 className='xsm:text-[1.35rem] xsm:leading-[1.2] text-center pc-h2-54-s text-[#090909]/80'>{t('title')}</h1>
      <h2 className='xsm:mt-[1.05rem] xsm:text-[#090909] xsm:text-[0.72rem] xsm:mb-[1.46rem] mt-[1.25rem] mb-[2.08rem] text-center pc-body-18-r-primary text-[#090909]'>
        {t('desc')}
      </h2>
      <FormLogin />
    </>
  )
}

export default LoginModule
