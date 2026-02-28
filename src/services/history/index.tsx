import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import { IPageHistoryResponse } from '@/interfaces/history.interface'

const historyService = {
  getPageAcf: async (locale: string): Promise<IPageHistoryResponse> => {
    return await fetchData({
      api: locale === 'en' ? ENDPOINTS.history.en : ENDPOINTS.history.vi,
    })
  },
}

export default historyService
