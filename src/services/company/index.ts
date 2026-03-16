import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

const companyService = {
  getPage: async (locale: string) => {
    return await fetchData({
      api: `wp/v2/pages/${locale === 'vi' ? ENDPOINTS.pageIds.subCompanyVi : ENDPOINTS.pageIds.subCompanyEn}?_fields=acf&acf_format=standard`,
    })
  },
  async getCompanys({ locale, limit }: { locale: string; limit?: number }) {
    const params = new URLSearchParams()

    params.append('lang', locale)

    if (limit) {
      params.append('limit', limit.toString())
    }

    return await fetchData({
      api: `${ENDPOINTS.company.list}?${params.toString()}&acf=true`,
    })
  },
}

export default companyService
