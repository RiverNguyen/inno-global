import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

const cultureService = {
  getPage: async (locale: string) => {
    return await fetchData({
      api: `wp/v2/pages/${locale === 'vi' ? ENDPOINTS.pageIds.cultureVi : ENDPOINTS.pageIds.cultureEn}?_fields=acf&acf_format=standard`,
    })
  },
}

export default cultureService
