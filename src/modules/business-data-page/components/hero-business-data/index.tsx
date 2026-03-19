import { useLocale, useTranslations } from 'next-intl'

import Breadcrumb from '@/components/shared/Breadcrumb'
import ROUTES from '@/configs/routes'
const HeroBusinessData = () => {
  const t = useTranslations()
  const locale = useLocale()
  return (
    <section className='xsm:px-[0.83333rem] bg-[#FFF]'>
      <div className='xsm:p-0 xsm:mt-[2.92rem] mt-[4.38rem] max-w-[75rem] py-[2.08rem] mx-auto'>
        <Breadcrumb
          navItems={[
            {
              label: t('Breadcrumb.homePage'),
              href: '/',
            },
            {
              label: t('Breadcrumb.aboutUsPage'),
              href: locale === 'vi' ? ROUTES.aboutUsVi : ROUTES.aboutUsEn,
            },
          ]}
          lastItem={{
            label: t('Breadcrumb.businessDataPage'),
          }}
          classNameContainer='mb-[1.25rem] xsm:hidden'
        />
        <h1 className='xsm:pt-[2.08333rem] xsm:mb-header-h1-26-semi pc-h2-54-s text-[2.8125rem]'>
          {t('BusinessDataPage.title')}
        </h1>
      </div>
    </section>
  )
}

export default HeroBusinessData
