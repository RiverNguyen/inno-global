import { Metadata } from 'next'

import ENDPOINTS from '@/configs/endpoints'
import ENV from '@/configs/env'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import SubCompanyDetail from '@/modules/sub-company-page'
import companyService from '@/services/company'
import metadataValues from '@/utils/metadataValues'

export const dynamic = 'force-dynamic'

export function generateStaticParams() {
  return [{ locale: 'vi' }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const res = await getMetaDataRankMath(ENDPOINTS.company.rank_math[locale as keyof typeof ENDPOINTS.company.rank_math])
  return metadataValues(res, ENV.DOMAIN || '')
}

export default async function SubComapanyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const [res, companyRes] = await Promise.all([
    companyService.getPage(locale),
    companyService.getCompanys({ locale, limit: 4 }),
  ])

  return (
    <main className='xsm:pt-[2.92rem] xsm:bg-[url("/sub-company/d-bg-deco-mb.webp")] bg-[url("/sub-company/d-bg-deco.webp")] bg-cover bg-center bg-no-repeat pt-[3.65rem]'>
      <SubCompanyDetail
        res={res}
        companys={companyRes?.data}
      />
    </main>
  )
}
