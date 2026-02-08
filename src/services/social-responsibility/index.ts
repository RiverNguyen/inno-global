import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import { ISocialResponsibilityRes } from '@/interfaces/social-responsibility.interface'

const socialResponsibilityService = {
  getAcfData: async (locale: string): Promise<ISocialResponsibilityRes> => {
    return await fetchData({
      api: locale === 'en' ? ENDPOINTS.socialResponsibility.en : ENDPOINTS.socialResponsibility.vi,
    })
  },
}

export default socialResponsibilityService
