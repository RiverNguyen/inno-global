import { Metadata } from 'next'

import AboutUsHome from '@/app/[locale]/_components/about-us/AboutUsHome'
import AwardHome from '@/app/[locale]/_components/award/AwardHome'
import AwardHomeMobile from '@/app/[locale]/_components/award/AwardHomeMobile'
import BannerHome from '@/app/[locale]/_components/banner/BannerHome'
import { NEWS } from '@/app/[locale]/_components/news/contants'
import Projects from '@/app/[locale]/_components/projects/projects'
import ScrollSnapWrapper from '@/app/[locale]/_components/scroll/ScrollSnapWrapper'
import ServiceHome from '@/app/[locale]/_components/service/ServiceHome'
import ServiceHomeMobile from '@/app/[locale]/_components/service/ServiceHomeMobile'
import ENDPOINTS from '@/configs/endpoints'
import ENV from '@/configs/env'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
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

  const acfData = (await homeService.getHomeData(ENDPOINTS.pageIds.home[locale])) as IHomeAcfDataRes
  if (!acfData) return null
  return (
    <ScrollSnapWrapper includeFooterSnap>
      <section data-snap>
        <BannerHome data={acfData?.acf?.banner} />
      </section>
      <section data-snap>
        <AboutUsHome data={acfData?.acf?.about_us} />
      </section>
      <section data-snap>
        <AwardHome data={acfData?.acf?.outstanding_award} />
        <AwardHomeMobile data={acfData?.acf?.outstanding_award} />
      </section>
      <section data-snap>
        <ServiceHome />
        <ServiceHomeMobile />
      </section>
      <section data-snap>
        <h2 className='text-center text-[1.25rem] font-semibold text-[#090909] mb-[1.67rem] sm:hidden'>
          Dự án nổi bật
        </h2>
        <Projects data={acfData.acf.home_projects} />
      </section>
      <section data-snap>
        <News data={NEWS} />
      </section>
    </ScrollSnapWrapper>
  )
}
