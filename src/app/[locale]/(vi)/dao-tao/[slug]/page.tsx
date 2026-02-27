import { Metadata } from 'next'

import ENDPOINTS from '@/configs/endpoints'
import ENV from '@/configs/env'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import TrainingDetail from '@/modules/training-detail-page'
import trainingService from '@/services/training'
import metadataValues from '@/utils/metadataValues'

export const dynamic = 'force-dynamic'

export function generateStaticParams() {
  return [{ locale: 'vi' }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  const { slug, locale } = await params
  const res = await getMetaDataRankMath(
    ENDPOINTS.training.rank_math_detail[locale as keyof typeof ENDPOINTS.training.rank_math_detail](slug),
  )
  return metadataValues(res, ENV.DOMAIN || '')
}

export default async function DetailTrainingPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params

  const trainingData = await trainingService.getDetail(slug, locale)

  const category = trainingData?.taxonomies?.training_category?.[0]?.slug

  const relatedRes = await trainingService.getRelated({
    locale,
    category,
  })

  const relatedTrainings = Array.isArray(relatedRes?.data) ? relatedRes.data : []

  return (
    <main className='relative'>
      <TrainingDetail
        training={trainingData}
        relatedTrainings={relatedTrainings}
      />
    </main>
  )
}
