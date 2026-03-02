import { Metadata } from 'next'

import AboutUsHome from '@/app/[locale]/_components/about-us/AboutUsHome'
import AwardHome from '@/app/[locale]/_components/award/AwardHome'
import AwardHomeMobile from '@/app/[locale]/_components/award/AwardHomeMobile'
import BannerHome from '@/app/[locale]/_components/banner/BannerHome'
import ProjectsSection from '@/app/[locale]/_components/projects'
import ScrollSnapWrapper from '@/app/[locale]/_components/scroll/ScrollSnapWrapper'
import ServiceSection from '@/app/[locale]/_components/service'
import SessionSyncOnMount from '@/app/[locale]/_components/SessionSyncOnMount'
import ENDPOINTS from '@/configs/endpoints'
import ENV from '@/configs/env'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import { IBlogRes } from '@/interfaces/blog.interface'
import { IHomeAcfDataRes } from '@/interfaces/home.interface'
import homeService from '@/services/home/home.service'
import metadataValues from '@/utils/metadataValues'

import News from './_components/news/news'

export function generateStaticParams() {
  return [{ locale: 'vi' }, { locale: 'en' }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const res = await getMetaDataRankMath(ENDPOINTS.home.rank_math[locale as keyof typeof ENDPOINTS.home.rank_math])
  return metadataValues(res, ENV.DOMAIN || '')
}

export default async function Page({ params }: { params: Promise<{ locale: 'vi' | 'en' }> }) {
  const { locale } = await params
  // The following is an example of how to properly handle ENDPOINTS and types,
  // Fetch and assert the acfData type explicitly
  const [acfData, blogRes] = await Promise.all([
    homeService.getHomeData<IHomeAcfDataRes>(ENDPOINTS.pageIds.home[locale]),
    homeService.getBlogs<IBlogRes>({ locale, limit: 5 }),
  ])

  if (!acfData) return null
  return (
    <ScrollSnapWrapper includeFooterSnap>
      <SessionSyncOnMount />
      <section data-snap>
        <BannerHome data={acfData?.acf?.banner || []} />
      </section>
      <section data-snap>
        <AboutUsHome data={acfData?.acf?.about_us} />
      </section>
      <section data-snap>
        <AwardHome data={acfData?.acf?.outstanding_award} />
        <AwardHomeMobile data={acfData?.acf?.outstanding_award} />
      </section>
      <section data-snap>
        <ServiceSection
          locale={locale}
          title={acfData?.acf?.capacity_service?.title || ''}
        />
      </section>
      <section data-snap>
        <ProjectsSection
          locale={locale}
          acfProjects={acfData?.acf?.home_projects || []}
        />
      </section>
      <section data-snap>
        <News data={blogRes?.data || []} />
      </section>
    </ScrollSnapWrapper>
  )
}
