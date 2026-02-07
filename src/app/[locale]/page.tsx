'use client'

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

import News from './_components/news/news'

export function generateStaticParams() {
  return [{ locale: 'vi' }, { locale: 'en' }]
}

export default function Page() {
  return (
    <ScrollSnapWrapper>
      <section data-snap>
        <BannerHome />
      </section>
      <section data-snap>
        <AboutUsHome />
      </section>
      <section data-snap>
        <AwardHome />
        <AwardHomeMobile />
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
