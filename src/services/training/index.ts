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
  getDetail: async (slug: string, locale: string) => {
    return await fetchData({
      api: ENDPOINTS.detail(slug, locale),
    })
  },
  getRelated: async ({ locale, category }: { locale: string; category?: string }) => {
    const params = new URLSearchParams()

    params.append('lang', locale)
    if (category) {
      params.append('tax', 'training_category')
      params.append('training_category', category)
    }

    return await fetchData({
      api: `${ENDPOINTS.training.getRelated}?${params.toString()}`,
    })
  },
  search: async ({ locale, q, limit = 12 }: { locale: string; q: string; limit?: number }) => {
    return await fetchData({
      api: ENDPOINTS.training.search({ locale, limit, q }),
    })
  },
}

export default trainingService
