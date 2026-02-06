import ENDPOINTS from '@/configs/endpoints'
import { IAboutUsAcfDataRes } from '@/interfaces/about-us.interface'
import PageAboutUs from '@/modules/page-about-us'
import aboutUsService from '@/services/about-us'

export default async function page() {
  const [acfData]: [IAboutUsAcfDataRes] = await Promise.all([
    aboutUsService.getAcfData(ENDPOINTS.pageIds.aboutUsEn),
  ])

  return (
    <>
      <PageAboutUs acfData={acfData} />
    </>
  )
}
