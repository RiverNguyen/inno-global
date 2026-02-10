import AboutUsHome from '@/app/[locale]/_components/about-us/AboutUsHome'
import AwardHome from '@/app/[locale]/_components/award/AwardHome'
import AwardHomeMobile from '@/app/[locale]/_components/award/AwardHomeMobile'
import BannerHome from '@/app/[locale]/_components/banner/BannerHome'
import { NEWS } from '@/app/[locale]/_components/news/contants'
import { PROJECTS } from '@/app/[locale]/_components/projects/constants'
import Projects from '@/app/[locale]/_components/projects/projects'
import ScrollSnapWrapper from '@/app/[locale]/_components/scroll/ScrollSnapWrapper'
import ServiceHome from '@/app/[locale]/_components/service/ServiceHome'
import ServiceHomeMobile from '@/app/[locale]/_components/service/ServiceHomeMobile'
import ENDPOINTS from '@/configs/endpoints'
import { IHomeAcfDataRes } from '@/interfaces/home.interface'
import homeService from '@/services/home/home.service'

import News from './_components/news/news'

export function generateStaticParams() {
  return [{ locale: 'vi' }, { locale: 'en' }]
}

export default async function Page({ params }: { params: Promise<{ locale: 'vi' | 'en' }> }) {
  const { locale } = await params
  // The following is an example of how to properly handle ENDPOINTS and types,
  // Fetch and assert the acfData type explicitly
  const acfData = (await homeService.getHomeData(ENDPOINTS.pageIds.home[locale])) as IHomeAcfDataRes
  if (!acfData) return null
  return (
    <ScrollSnapWrapper includeFooterSnap>
      <section data-snap>
        <BannerHome data={acfData.acf.banner} />
      </section>
      <section data-snap>
        <AboutUsHome data={acfData.acf.about_us} />
      </section>
      <section data-snap>
        <AwardHome data={acfData.acf.outstanding_award} />
        <AwardHomeMobile data={acfData.acf.outstanding_award} />
      </section>
      <section data-snap>
        <ServiceHome />
        <ServiceHomeMobile />
      </section>
      <section data-snap>
        <Projects data={PROJECTS} />
      </section>
      <section data-snap>
        <News data={NEWS} />
      </section>
    </ScrollSnapWrapper>
  )
}
