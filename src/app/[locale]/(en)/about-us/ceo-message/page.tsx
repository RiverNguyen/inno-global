import { Metadata } from 'next'

import ENDPOINTS from '@/configs/endpoints'
import ENV from '@/configs/env'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import CEO from '@/modules/ceo'
import metadataValues from '@/utils/metadataValues'

export const dynamic = 'force-dynamic'

export function generateStaticParams() {
  return [{ locale: 'en' }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const res = await getMetaDataRankMath(
    ENDPOINTS.leadership.ceo_rank_math[locale as keyof typeof ENDPOINTS.leadership.ceo_rank_math],
  )
  return metadataValues(res, ENV.DOMAIN || '')
}

export default async function CEOPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  return <CEO locale={locale} />
}
