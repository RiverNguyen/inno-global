import ENDPOINTS from '@/configs/endpoints'
import ENV from '@/configs/env'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import { IAboutUsAcfDataRes } from '@/interfaces/about-us.interface'
import PageAboutUs from '@/modules/page-about-us'
import aboutUsService from '@/services/about-us'
import metadataValues from '@/utils/metadataValues'

export function generateStaticParams() {
  return [{ locale: 'vi' }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const res = await getMetaDataRankMath(
    ENDPOINTS.aboutUs.rank_math[locale as keyof typeof ENDPOINTS.aboutUs.rank_math],
  )
  return metadataValues(res, ENV.DOMAIN || '')
}

export default async function page() {
  const [acfData]: [IAboutUsAcfDataRes] = await Promise.all([aboutUsService.getAcfData(ENDPOINTS.pageIds.aboutUsVi)])

  return (
    <>
      <PageAboutUs acfData={acfData} />
    </>
  )
}
