import { Metadata } from 'next'

import ENDPOINTS from '@/configs/endpoints'
import ENV from '@/configs/env'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import BlogListPage from '@/modules/blog-list-page'
import blogService from '@/services/blogs'
import metadataValues from '@/utils/metadataValues'

interface BlogListPageViProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const res = await getMetaDataRankMath(ENDPOINTS.blog.rank_math[locale as keyof typeof ENDPOINTS.blog.rank_math])
  return metadataValues(res, ENV.DOMAIN || '')
}

export default async function BlogListPageVi({ params }: BlogListPageViProps) {
  const { locale } = await params

  const [initialBlogs, taxonomies] = await Promise.all([
    blogService.getBlogs(locale),
    blogService.getTaxonomies(locale),
  ])

  return (
    <main className='relative pt-[3.65rem] xsm:pt-[2.92rem]'>
      <BlogListPage
        initialBlogs={initialBlogs}
        taxonomies={taxonomies}
      />
    </main>
  )
}
