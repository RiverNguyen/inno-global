import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

export const homeService = {
  async getHomeData<T>(pageId: number | string): Promise<T> {
    return (await fetchData({
      api: `wp/v2/pages/${pageId}?_fields=acf&acf_format=standard`,
    })) as T
  },

  async getBlogs<T>({ locale, limit = 12 }: { locale: string; limit?: number }) {
    return (await fetchData({
      api: ENDPOINTS.blog.getAll({ locale, limit }),
    })) as T
  },
}

export default homeService
