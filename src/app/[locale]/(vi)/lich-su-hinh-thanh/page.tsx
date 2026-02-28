import { Metadata } from 'next'

import BannerHistory from '@/app/[locale]/(vi)/lich-su-hinh-thanh/_components/BannerHistory'
import IndexTimeline from '@/app/[locale]/(vi)/lich-su-hinh-thanh/_components/timeline/index'
import ENDPOINTS from '@/configs/endpoints'
import ENV from '@/configs/env'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import historyService from '@/services/history'
import metadataValues from '@/utils/metadataValues'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const res = await getMetaDataRankMath(ENDPOINTS.history.rank_math[locale as keyof typeof ENDPOINTS.history.rank_math])
  return metadataValues(res, ENV.DOMAIN || '')
}

export default async function HistoryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const pageAcf = await historyService.getPageAcf(locale)
  const timeline = [
    ...(pageAcf?.acf?.timeline || []),
    {
      year: 'To be continued...',
      description: '',
      image: null,
    },
  ]

  return (
    <main className='relative w-full'>
      <BannerHistory banner={pageAcf?.acf?.banner} />
      <IndexTimeline timeline={timeline} />
    </main>
  )
}
