import { Metadata } from 'next'
import { getLocale } from 'next-intl/server'

import ENDPOINTS from '@/configs/endpoints'
import ENV from '@/configs/env'
import fetchData from '@/fetches/fetchData'
import PageDetailService from '@/modules/page-detail-service'
import serviceApi from '@/services/service'
import metadataValues from '@/utils/metadataValues'
import parseRankMathHead from '@/utils/parseRankMathHead'

export const dynamic = 'force-dynamic'

export function generateStaticParams() {
  return [{ locale: 'en' }]
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const res = await fetchData({ api: ENDPOINTS.service.rank_math_detail(slug) })
  const parsed = res?.head && typeof res.head === 'string' ? parseRankMathHead(res.head) : res
  return metadataValues(parsed, ENV.DOMAIN || '')
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function page({ params }: PageProps) {
  const { slug } = await params
  const locale = await getLocale()

  const [detailServiceData, relatedProjectsData, relatedBlogsData] = await Promise.all([
    serviceApi.getDetail(slug),
    serviceApi.getRelatedProjects({ slug, limit: 4, lang: locale, paged: 1 }),
    serviceApi.getRelatedBlogs({ slug, limit: 6, lang: locale, paged: 1 }),
  ])

  return (
    <>
      <PageDetailService
        detailServiceData={detailServiceData}
        relatedProjectsData={relatedProjectsData}
        relatedBlogsData={relatedBlogsData}
      />
    </>
  )
}
