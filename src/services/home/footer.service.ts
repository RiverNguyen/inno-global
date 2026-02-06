import fetchData from '@/fetches/fetchData'

export const footerService = {
  async getFooterData<T>(lang: string): Promise<T> {
    return (await fetchData({
      api: `api/v1/options?fields=footer_fields&lang=${lang}`,
    })) as T
  },
}
