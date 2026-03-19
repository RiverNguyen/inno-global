'use client'

import { useTranslations } from 'next-intl'

import Breadcrumb from '@/components/shared/Breadcrumb'
import { IInnoHub } from '@/interfaces/inno-hub.interface'

interface HeroSectionProps {
  desc: IInnoHub['desc']
}

const HeroSection = ({ desc }: HeroSectionProps) => {
  const t = useTranslations('InnoHub')

  return (
    <section className='mt-[4.57rem] mx-[0.83rem] lg:mx-auto lg:max-w-[75rem]'>
      <Breadcrumb
        navItems={[{ label: t('breadcrumbHome'), href: '/' }]}
        lastItem={{ label: 'Inno Hub' }}
        classNameContainer='xsm:hidden pt-[2.34rem]'
      />

      <h1 className='lg:mt-10 mb-header-h1-26-semi text-primary/80 lg:pc-h2-54-s lg:text-primary mt-[1.67rem] '>
        {t('title')}
      </h1>
      <p className='mt-[1.04rem] mb-body-14-r lg:pc-body-18-r-primary mb-[1rem] lg:mb-[2.08rem] text-[#090909CC]'>
        {desc}
      </p>
    </section>
  )
}

export default HeroSection
