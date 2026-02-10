import ENDPOINTS from '@/configs/endpoints'
import ENV from '@/configs/env'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import SocialResponsibility from '@/modules/social-responsibility'
import metadataValues from '@/utils/metadataValues'

export function generateStaticParams() {
  return [{ locale: 'vi' }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const res = await getMetaDataRankMath(
    ENDPOINTS.socialResponsibility.rank_math[locale as keyof typeof ENDPOINTS.socialResponsibility.rank_math],
  )
  return metadataValues(res, ENV.DOMAIN || '')
}

export default async function SocialResponsibilityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  return <SocialResponsibility locale={locale} />
}
