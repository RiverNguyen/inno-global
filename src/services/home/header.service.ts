import fetchData from '@/fetches/fetchData'

export const headerService = {
  async getHeaderData<T>(lang: string): Promise<T> {
    return (await fetchData({
      api: `api/v1/options?fields=logo,menus&lang=${lang}`,
    })) as T
  },
}

export default headerService