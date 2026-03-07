import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

const blogService = {
  getBlogs: async (locale: string) => {
    return await fetchData({
      api: ENDPOINTS.blog.getAll({ locale, limit: 12 }),
    })
  },
  search: async ({ locale, q, limit = 12 }: { locale: string; q: string; limit?: number }) => {
    return await fetchData({
      api: ENDPOINTS.blog.search({ locale, q, limit }),
    })
  },
  getTaxonomies: async (locale: string) => {
    const [years, categories, awards] = await Promise.all([
      fetchData({
        api: ENDPOINTS.blog.getYears(locale),
      }),
      fetchData({
        api: ENDPOINTS.blog.getCategories(locale),
      }),
      fetchData({
        api: ENDPOINTS.blog.getAwards(locale),
      }),
    ])
    return {
      years,
      categories,
      awards,
    }
  },
}

export default blogService
