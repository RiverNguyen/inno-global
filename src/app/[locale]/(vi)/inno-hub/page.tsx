import { Metadata } from 'next'

import endpoints from '@/configs/endpoints'
import ENV from '@/configs/env'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import InnoHubModule from '@/modules/inno-hub-page'
import metadataValues from '@/utils/metadataValues'

export const dynamicParams = false

export function generateStaticParams() {
  return [{ locale: 'vi' }]
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params

  const res = await getMetaDataRankMath(
    endpoints.inno_hub.rank_math[locale as keyof typeof endpoints.inno_hub.rank_math],
  )

  return metadataValues(res, ENV.DOMAIN || '')
}

const InnoHubPage = async ({ params }: { params: { locale: string } }) => {
  const { locale } = params

  return <InnoHubModule locale={locale} />
}

export default InnoHubPage
