import ENDPOINTS from '@/configs/endpoints'
import { IBusinessDataAcf } from '@/interfaces/business-data.interface'
import BusinessDataPage from '@/modules/business-data-page'
import businessDataService from '@/services/business-data'

const BusinessData = async () => {
  const [acfData]: [{ acf: IBusinessDataAcf }] = await Promise.all([
    businessDataService.getAcfData(ENDPOINTS.businessData.pageId.en),
  ])

  return <BusinessDataPage acfData={acfData.acf} />
}

export default BusinessData
