import ENDPOINTS from '@/configs/endpoints'
import ENV from '@/configs/env'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import { ITermsOfUseAcfDataRes } from '@/interfaces/terms-of-use.interface'
import TermsOfUsePage from '@/modules/terms-of-use-page'
import termsOfUseService from '@/services/terms-of-use'
import metadataValues from '@/utils/metadataValues'

export function generateStaticParams() {
  return [{ locale: 'en' }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const res = await getMetaDataRankMath(
    ENDPOINTS.termsOfUse.rank_math[locale as keyof typeof ENDPOINTS.termsOfUse.rank_math],
  )
  return metadataValues(res, ENV.DOMAIN || '')
}

export default async function page() {
  const [acfData]: [ITermsOfUseAcfDataRes] = await Promise.all([
    termsOfUseService.getAcfData(ENDPOINTS.pageIds.termsOfUseEn),
  ])

  return <TermsOfUsePage acfData={acfData} />
}
