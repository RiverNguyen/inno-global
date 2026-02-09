import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

const organizationService = {
  getPage: async (locale: string) => {
    return await fetchData({
      api: `wp/v2/pages/${locale === 'vi' ? ENDPOINTS.pageIds.organizationChartVi : ENDPOINTS.pageIds.organizationChartEn}?_fields=acf&acf_format=standard`,
    })
  },
}

export default organizationService
