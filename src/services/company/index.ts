import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

const companyService = {
  getPage: async (locale: string) => {
    return await fetchData({
      api: ENDPOINTS.page(locale === 'vi' ? 275 : 277),
    })
  },
  async getCompanys({ locale, limit }: { locale: string; limit?: number }) {
    const params = new URLSearchParams()

    params.append('locale', locale)

    if (limit) {
      params.append('limit', limit.toString())
    }

    return await fetchData({
      api: `${ENDPOINTS.company.list}?${params.toString()}`,
    })
  },
}

export default companyService
