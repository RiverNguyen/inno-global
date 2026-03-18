import { IInnoHub } from '@/interfaces/inno-hub.interface'

import ContentDemo from './components/content-demo'
import HeroSection from './components/hero-section'

interface InnoHubModuleProps {
  acfData: IInnoHub
}

const InnoHubModule = ({ acfData }: InnoHubModuleProps) => {
  if (!acfData) return null
  const { desc, purpose } = acfData

  return (
    <>
      <HeroSection desc={desc} />
      <div className='bg-[#F8F8F8] lg:pb-[5rem] pb-[1rem]'>
        <ContentDemo purpose={purpose} />
      </div>
    </>
  )
}

export default InnoHubModule
