import ENDPOINTS from '@/configs/endpoints'
import ENV from '@/configs/env'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import Founder from '@/modules/founder'
import metadataValues from '@/utils/metadataValues'


export function generateStaticParams() {
  return [{ locale: 'en' }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const res = await getMetaDataRankMath(
    ENDPOINTS.leadership.rank_math_detail[locale as keyof typeof ENDPOINTS.leadership.rank_math_detail](slug),
  )
  return metadataValues(res, ENV.DOMAIN || '')
}

export default async function FounderPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params

  return (
    <Founder
      locale={locale}
      slug={slug}
    />
  )
}
