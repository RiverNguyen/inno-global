import { Metadata } from 'next'

import ENDPOINTS from '@/configs/endpoints'
import ENV from '@/configs/env'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import BlogDetail from '@/modules/blog-detail-page'
import blogService from '@/services/blog'
import metadataValues from '@/utils/metadataValues'

export const dynamic = 'force-dynamic'

export function generateStaticParams() {
  return [{ locale: 'vi' }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  const { slug, locale } = await params
  const res = await getMetaDataRankMath(
    ENDPOINTS.blog.rank_math_detail[locale as keyof typeof ENDPOINTS.blog.rank_math_detail](slug),
  )
  return metadataValues(res, ENV.DOMAIN || '')
}

const BlogDetailPage = async ({ params }: { params: Promise<{ locale: string; slug: string }> }) => {
  const { locale, slug } = await params

  const blogData = await blogService.getBlogDetail(slug, locale)
  const category = blogData?.taxonomies?.category?.[0]?.slug
  const tag = blogData?.taxonomies?.post_tag?.[0]?.slug

  const relatedRes = await blogService.getRelatedBlogs({
    locale,
    category,
    tag,
  })
  const relatedBlogs = Array.isArray(relatedRes?.data) ? relatedRes.data : []

  return (
    <main className='relative'>
      <BlogDetail
        locale={locale}
        blog={blogData}
        relatedBlogs={relatedBlogs}
      />
    </main>
  )
}
export default BlogDetailPage
