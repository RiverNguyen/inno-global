'use client'
import { useTranslations } from 'next-intl'

import { ITraining, ITrainingAcfData } from '@/interfaces/training.inteface'
import Banner from './components/Banner'
import RelatedTrainings from './components/RelatedTrainings'
import dynamic from 'next/dynamic'

const Content = dynamic(() => import('./components/Content'), { ssr: false })

interface TrainingDetailProps {
  locale: string
  training: ITraining
  relatedTrainings: ITraining[]
}

const TrainingDetail = ({ locale, training, relatedTrainings }: TrainingDetailProps) => {
  const t = useTranslations()

  const banner = training?.acf?.banner as ITrainingAcfData['banner']

  banner.title = training?.title

  return (
    <>
      <Banner banner={banner} />
      <div className='container my-[6.25rem] xsm:mt-0 xsm:my-0'>
        <Content training={training} />
      </div>
      <RelatedTrainings data={relatedTrainings} />
    </>
  )
}

export default TrainingDetail
