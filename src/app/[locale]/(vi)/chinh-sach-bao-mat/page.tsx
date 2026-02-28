import ENDPOINTS from '@/configs/endpoints'
import ENV from '@/configs/env'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import { IPrivacyPolicyAcfDataRes } from '@/interfaces/privacy-policy.interface'
import PrivacyPolicyPage from '@/modules/privacy-policy-page'
import privacyPolicyService from '@/services/privacy-policy'
import metadataValues from '@/utils/metadataValues'

export function generateStaticParams() {
  return [{ locale: 'vi' }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const res = await getMetaDataRankMath(
    ENDPOINTS.privacyPolicy.rank_math[locale as keyof typeof ENDPOINTS.privacyPolicy.rank_math],
  )
  return metadataValues(res, ENV.DOMAIN || '')
}

export default async function page() {
  const [acfData]: [IPrivacyPolicyAcfDataRes] = await Promise.all([
    privacyPolicyService.getAcfData(ENDPOINTS.pageIds.privacyPolicyVi),
  ])

  return <PrivacyPolicyPage acfData={acfData} />
}
