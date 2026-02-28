import { IPrivacyPolicyAcfDataRes } from '@/interfaces/privacy-policy.interface'
import SectionPrivacyPolicy from '@/modules/privacy-policy-page/sections/SectionPrivacyPolicy'

export default function PrivacyPolicyPage({ acfData }: { acfData: IPrivacyPolicyAcfDataRes }) {
  return (
    <main className='font-open-sans xsm:pt-[2.9167rem] xsm:pb-[2.5rem] pt-[6.97913rem] pb-[6.45833rem]'>
      <SectionPrivacyPolicy acfData={acfData} />
    </main>
  )
}
