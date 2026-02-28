import { Metadata } from 'next'

import ENDPOINTS from '@/configs/endpoints'
import ENV from '@/configs/env'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import CultureDetail from '@/modules/culture-page'
import cultureService from '@/services/culture'
import metadataValues from '@/utils/metadataValues'

export const dynamic = 'force-dynamic'

export function generateStaticParams() {
  return [{ locale: 'vi' }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const res = await getMetaDataRankMath(
    ENDPOINTS.corporateCulture.rank_math[locale as keyof typeof ENDPOINTS.corporateCulture.rank_math],
  )
  return metadataValues(res, ENV.DOMAIN || '')
}

export default async function CulturePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  const res = await cultureService.getPage(locale)

  return (
    <main className='xsm:pt-[2.92rem] xsm:bg-[url("/sub-company/d-bg-deco-mb.webp")] bg-[url("/sub-company/d-bg-deco.webp")] bg-cover bg-center bg-no-repeat pt-[3.65rem]'>
      <CultureDetail res={res} />
    </main>
  )
}
