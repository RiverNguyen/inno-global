'use client'

import { ITraining } from '@/interfaces/training.inteface'

import Banner from './components/Banner'
import Content from './components/Content'
import RelatedTrainings from './components/RelatedTrainings'

interface TrainingDetailProps {
  training: ITraining
  relatedTrainings: ITraining[]
  acfData: {
    detail_banner: {
      desktop: {
        url: string
      }
      mobile: {
        url: string
      }
    }
  }
}

const TrainingDetail = ({ training, relatedTrainings, acfData }: TrainingDetailProps) => {
  return (
    <>
      <Banner
        banner={{
          title: training?.title || '',
          image: {
            desktop: acfData?.detail_banner?.desktop?.url || '',
            mobile: acfData?.detail_banner?.mobile?.url || '',
          },
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
