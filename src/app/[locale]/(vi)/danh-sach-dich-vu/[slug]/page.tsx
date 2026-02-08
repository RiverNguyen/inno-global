import { getLocale } from 'next-intl/server'

import PageDetailService from '@/modules/page-detail-service'
import serviceApi from '@/services/service'

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
