import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

const blogService = {
  getBlogs: async (locale: string) => {
    return await fetchData({
      api: ENDPOINTS.blog.getAll({ locale, limit: 12 }),
    })
  },
  getTaxonomies: async (locale: string) => {
    const [years, categories] = await Promise.all([
      fetchData({
        api: ENDPOINTS.blog.getYears(locale),
      }),
      fetchData({
        api: ENDPOINTS.blog.getCategories(locale),
      }),
    ])
    return {
      years,
      categories,
    }
  },
}

export default blogService
