import ENDPOINTS from '@/configs/endpoints'
import ENV from '@/configs/env'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import TrainingListPage from '@/modules/training-list-page'
import trainingService from '@/services/training'
import metadataValues from '@/utils/metadataValues'

export function generateStaticParams() {
  return [{ locale: 'vi' }]
}

interface PageProps {
  params: Promise<{ locale: 'vi' | 'en' }>
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  const res = await getMetaDataRankMath(
    ENDPOINTS.training.rank_math[locale as keyof typeof ENDPOINTS.training.rank_math],
  )
  return metadataValues(res, ENV.DOMAIN || '')
}

export default async function TrainingPage({ params }: PageProps) {
  const { locale } = await params

  const [page, latestTrainingRes, otherTrainingRes, taxonomies] = await Promise.all([
    trainingService.getPage(locale),
    trainingService.getTrainings({ locale, limit: 6 }),
    trainingService.getTrainings({ locale }),
    trainingService.getTaxonomies(locale),
  ])

  return (
    <main className='xsm:pt-[2.92rem] relative pt-[3.65rem]'>
      <TrainingListPage
        acfData={page?.acf}
        latestTrainingRes={latestTrainingRes}
        otherTrainingRes={otherTrainingRes}
        taxonomies={taxonomies}
      />
    </main>
  )
}
