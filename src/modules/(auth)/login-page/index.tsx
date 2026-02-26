import { useTranslations } from 'next-intl'

import FormLogin from '@/modules/(auth)/login-page/components/form-login'

const LoginModule = () => {
  const t = useTranslations('LoginPage')
  return (
    <>
      <h1 className='text-[#090909]/80 text-center text-[2.8125rem] font-semibold leading-[1.2] tracking-[-0.02813rem] xsm:text-[1.35rem] xsm:leading-[1.2]'>
        {t('title')}
      </h1>
      <h2 className='mt-[1.25rem] text-[#090909] text-center text-[0.9375rem] leading-[1.5] mb-[2.08rem] xsm:mt-[1.05rem] xsm:text-[#090909] xsm:text-[0.72rem] xsm:mb-[1.46rem]'>
        {t('desc')}
      </h2>
      <FormLogin />
    </>
  )
}

export default LoginModule
