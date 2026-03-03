import fetchData from '@/fetches/fetchData'

export const ctaService = {
  async getCTAData<T>(): Promise<T> {
    return (await fetchData({
      api: 'api/v1/options?fields=cta_field',
    })) as T
  },
}
