'use client'

import { useTranslations } from 'next-intl'

import Breadcrumb from '@/components/shared/Breadcrumb'

const HeroSection = ({ locale }: { locale: string }) => {
  const t = useTranslations('InnoHub')

  return (
    <section className='max-w-[75rem] mx-auto mt-[2.82rem]'>
      <Breadcrumb
        navItems={[{ label: t('breadcrumbHome'), href: `/${locale}` }]}
        lastItem={{ label: 'Inno Hub' }}
        classNameContainer='xsm:hidden pt-[2.34rem]'
      />

      <h1 className='mt-[2.5rem] pc-h2-54-s text-[#090909]/80'>{t('title')}</h1>

      <p className='mt-[1.04rem] pc-body-18-r-primary mb-[2.08rem] text-[#090909CC]'>{t('description')}</p>
    </section>
  )
}

export default HeroSection
