'use client'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import SectionPagination from '@/components/shared/SectionPagination'
import { ILeadership } from '@/interface/leadership.interface'

import Banner from './banner'
import Info from './info'

export default function Founder({ locale, leader }: { locale: string; leader: ILeadership }) {
  const t = useTranslations()
  return (
    <main className="sm:bg-[linear-gradient(112deg,#F8F8F8_11.8%,#F8F8F8_54.52%,#F8F8F8_84.75%)] xsm:bg-white">
      <div className='relative'>
        <Image
          src='/leadership/maskgroup.webp'
          alt="bg-founder"
          width={1920}
          height={694}
          className="absolute bottom-0 left-0 w-full h-full object-cover pointer-events-none xsm:hidden"
        />
        <Banner />
        <Info leader={leader} />
      </div>

      <SectionPagination
        center={{ href: locale === 'en' ? '/about-us' : '/ve-chung-toi', label: t('Breadcrumb.aboutUsPage') }}
        next={{ href: '', label: t('Breadcrumb.organizationChartPage') }}
      />
    </main>
  )
}