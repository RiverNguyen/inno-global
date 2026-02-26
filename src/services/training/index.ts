import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

const trainingService = {
  getTrainings: async ({ locale, limit }: { locale: string; limit?: number }) => {
    return await fetchData({
      api: ENDPOINTS.training.getAll({ locale, limit }),
    })
  },
  getTaxonomies: async (locale: string) => {
    const [categories, years] = await Promise.all([
      fetchData({
        api: ENDPOINTS.training.getCategories(locale),
      }),
      fetchData({
        api: ENDPOINTS.training.getYears(locale),
      }),
    ])
    return {
      categories,
      years,
    }
  },
  getPage: async (locale: 'vi' | 'en') => {
    return await fetchData({
      api: ENDPOINTS.training.getPage[locale],
    })
  },
}

export default trainingService
