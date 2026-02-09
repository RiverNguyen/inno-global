import { Metadata } from 'next'

import ENDPOINTS from '@/configs/endpoints'
import ENV from '@/configs/env'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import ServiceList from '@/modules/service-list-page'
import projectService from '@/services/projects'
import serviceApi from '@/services/service'
import metadataValues from '@/utils/metadataValues'


export function generateStaticParams() {
  return [{ locale: 'en' }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  const { slug, locale } = await params
  const res = await getMetaDataRankMath(
    ENDPOINTS.service.rank_math_detail[locale as keyof typeof ENDPOINTS.service.rank_math_detail](slug),
  )
  return metadataValues(res, ENV.DOMAIN || '')
}

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function Services({ params }: PageProps) {
  const { locale } = await params

  const [services, page] = await Promise.all([
    // serviceApi.getAll(locale),
    projectService.getProjects(locale),
    serviceApi.getPage(locale as 'vi' | 'en'),
  ])

  return (
    <main>
      <ServiceList
        initialPage={services}
        page={page?.acf}
        dataSource='project'
      />
    </main>
  )
}
