import { IBusinessDataAcf } from '@/interfaces/business-data.interface'

import FooterBusinessData from './components/footer-business-data'
import HeroBusinessData from './components/hero-business-data'
import InfoBusinessData from './components/info-business-data'
import OfficeBusinessData from './components/office-business-data'
import PolicyBusinessData from './components/policy'

const BusinessDataPage = ({ acfData }: { acfData: IBusinessDataAcf }) => {
  return (
    <main className='bg-[#F8F8F8]'>
      <HeroBusinessData></HeroBusinessData>
      <InfoBusinessData acfOverView={acfData.project_overview}></InfoBusinessData>
      <OfficeBusinessData acfOurOffice={acfData.our_office}></OfficeBusinessData>
      <PolicyBusinessData acfOurPolicy={acfData.our_policy}></PolicyBusinessData>
      <FooterBusinessData></FooterBusinessData>
      <style>{`
        #footer {
          background-color: #fff;
        }
      `}</style>
    </main>
  )
}

export default BusinessDataPage
