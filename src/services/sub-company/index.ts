import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

const subCompanyService = {
  getPage: async (locale: string) => {
    return await fetchData({
      api: ENDPOINTS.page(locale === 'vi' ? 275 : 277),
    })
  },
}

export default subCompanyService
