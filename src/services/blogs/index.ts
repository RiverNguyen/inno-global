import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

const blogService = {
  getBlogs: async (locale: string) => {
    return await fetchData({
      api: ENDPOINTS.blog.getAll({ locale, limit: 12 }),
    })
  },
  getTaxonomies: async (locale: string) => {
    const [years] = await Promise.all([
      fetchData({
        api: ENDPOINTS.blog.getYears(locale),
      }),
    ])
    return {
      years,
    }
  },
}

export default blogService
