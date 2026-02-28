'use client'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import SectionPagination from '@/components/shared/SectionPagination'
import { ILeadership } from '@/interfaces/leadership.interface'

import Banner from './banner'
import Info from './info'

export default function Founder({
  locale,
  leader,
  bannerTitle,
}: {
  locale: string
  leader: ILeadership
  bannerTitle?: string
}) {
  const t = useTranslations()
  const aboutUsBasePath = locale === 'en' ? '/about-us' : '/ve-chung-toi'
  const leadershipPath = locale === 'en' ? '/leadership' : '/ban-lanh-dao-cong-ty'
  const socialResponsibility = locale === 'en' ? '/social-responsibility' : '/trach-nhiem-xa-hoi'
  const socialResponsibilityHref = `${aboutUsBasePath}${socialResponsibility}`
  const leadershipHref = `${aboutUsBasePath}${leadershipPath}`
  const organizationChartPath = locale === 'en' ? '/organization-chart' : '/so-do-to-chuc'
  const organizationChartHref = `${aboutUsBasePath}${organizationChartPath}`
  return (
    <main className='xsm:bg-white xsm:pt-[2.92rem] pt-[3.65rem] sm:bg-[linear-gradient(112deg,#F8F8F8_11.8%,#F8F8F8_54.52%,#F8F8F8_84.75%)]'>
      <div className='relative'>
        <Image
          src='/leadership/maskgroup.webp'
          alt='bg-founder'
          width={1920}
          height={694}
          className='xsm:hidden pointer-events-none absolute bottom-0 left-0 h-full w-full object-cover'
        />
        <Banner
          aboutUsBasePath={aboutUsBasePath}
          leadershipHref={leadershipHref}
          bannerTitle={bannerTitle}
        />
        <Info leader={leader} />
      </div>

      <SectionPagination
        prev={{ href: socialResponsibilityHref, label: t('Breadcrumb.socialResponsibilityPage') }}
        center={{ href: aboutUsBasePath, label: t('Breadcrumb.aboutUsPage') }}
        next={{ href: organizationChartHref, label: t('Breadcrumb.organizationChartPage') }}
      />
    </main>
  )
}
