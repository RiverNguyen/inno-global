import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import ENDPOINTS from '@/configs/endpoints'
import ENV from '@/configs/env'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import BannerHistory from '@/modules/history-page/BannerHistory'
import IndexTimeline from '@/modules/history-page/timeline/index'
import historyService from '@/services/history'
import metadataValues from '@/utils/metadataValues'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const res = await getMetaDataRankMath(ENDPOINTS.history.rank_math[locale as keyof typeof ENDPOINTS.history.rank_math])
  return metadataValues(res, ENV.DOMAIN || '')
}

export default async function HistoryPage({ params }: { params: Promise<{ locale: string }> }) {
  const t = await getTranslations()
  const { locale } = await params
  const pageAcf = await historyService.getPageAcf(locale)
  const timeline = [
    ...(pageAcf?.acf?.timeline || []),
    {
      year: t('HistoryPage.continue'),
      description: '',
      image: null,
      isToBeContinued: true,
    },
  ]

  return (
    <main className='relative w-full'>
      <BannerHistory banner={pageAcf?.acf?.banner} />
      <IndexTimeline timeline={timeline} />
    </main>
  )
}
