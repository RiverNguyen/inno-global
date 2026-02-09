
import ENDPOINTS from '@/configs/endpoints'
import ENV from '@/configs/env'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import Leadership from '@/modules/leadership-page'
import metadataValues from '@/utils/metadataValues'

export function generateStaticParams() {
  return [{ locale: 'en' }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const res = await getMetaDataRankMath(
    ENDPOINTS.leadership.rank_math[locale as keyof typeof ENDPOINTS.leadership.rank_math],
  )
  return metadataValues(res, ENV.DOMAIN || '')
}

export default async function LeadershipPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  return <Leadership locale={locale} />
}
