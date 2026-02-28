'use client'

import { ITraining } from '@/interfaces/training.inteface'

import Banner from './components/Banner'
import Content from './components/Content'
import RelatedTrainings from './components/RelatedTrainings'

interface TrainingDetailProps {
  training: ITraining
  relatedTrainings: ITraining[]
}

const TrainingDetail = ({ training, relatedTrainings }: TrainingDetailProps) => {
  return (
    <>
      <Banner
        banner={{
          title: training?.title || '',
          ...training?.acf?.banner,
        }}
      />
      <div className='xsm:mt-0 xsm:my-0 container my-[6.25rem]'>
        <Content training={training} />
      </div>
      <RelatedTrainings data={relatedTrainings} />
    </>
  )
}

export default TrainingDetail
