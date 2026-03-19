import { Metadata } from 'next'

import ENDPOINTS from '@/configs/endpoints'
import ENV from '@/configs/env'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import { IBusinessDataAcf } from '@/interfaces/business-data.interface'
import BusinessDataPage from '@/modules/business-data-page'
import businessDataService from '@/services/business-data'
import metadataValues from '@/utils/metadataValues'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const res = await getMetaDataRankMath(
    ENDPOINTS.businessData.rank_math[locale as keyof typeof ENDPOINTS.businessData.rank_math],
  )
  return metadataValues(res, ENV.DOMAIN || '')
}

const BusinessData = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params
  const [acfData]: [{ acf: IBusinessDataAcf }] = await Promise.all([
    businessDataService.getAcfData(ENDPOINTS.businessData.pageId[locale as keyof typeof ENDPOINTS.businessData.pageId]),
  ])

  return <BusinessDataPage acfData={acfData.acf} />
}

export default BusinessData
