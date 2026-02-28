import { ITermsOfUseAcfDataRes } from '@/interfaces/terms-of-use.interface'
import SectionTermsOfUse from '@/modules/terms-of-use-page/sections/SectionPrivacyPolicy'

export default function TermsOfUsePage({ acfData }: { acfData: ITermsOfUseAcfDataRes }) {
  return (
    <main className='font-open-sans xsm:pt-[2.9167rem] xsm:pb-[2.5rem] relative bg-white pt-[6.97913rem] pb-[6.45833rem]'>
      <SectionTermsOfUse acfData={acfData} />
    </main>
  )
}
