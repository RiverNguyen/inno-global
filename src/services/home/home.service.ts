import fetchData from '@/fetches/fetchData'

export const homeService = {
  async getHomeData<T>(pageId: number | string): Promise<T> {
    return (await fetchData({
      api: `wp/v2/pages/${pageId}?_fields=acf&acf_format=standard`,
    })) as T
  },
}

export default homeService
