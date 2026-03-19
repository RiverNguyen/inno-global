import ENDPOINTS from '@/configs/endpoints'
import ENV from '@/configs/env'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import InnoHubModule from '@/modules/inno-hub-page'
import innoHubService from '@/services/inno-hub'
import metadataValues from '@/utils/metadataValues'

export function generateStaticParams() {
  return [{ locale: 'en' }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const res = await getMetaDataRankMath(
    ENDPOINTS.inno_hub.rank_math[locale as keyof typeof ENDPOINTS.inno_hub.rank_math],
  )
  return metadataValues(res, ENV.DOMAIN || '')
}

const InnoHubPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params
  const { acf } = await innoHubService.getAcfData(
    ENDPOINTS.inno_hub.page_id[locale as keyof typeof ENDPOINTS.inno_hub.page_id],
  )

  return <InnoHubModule acfData={acf} />
}

export default InnoHubPage
