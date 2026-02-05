import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import { ILeadershipRes } from '@/interface/leadership.interface'
import { ITaxonomyRes } from '@/interface/taxonomy.interface'

const leadershipService = {
  getLeadershipList: async (locale: string): Promise<ILeadershipRes> => {
    return await fetchData({
      api: `${ENDPOINTS.leadership.list}?lang=${locale}`,
    })
  },

  getLeadershipGroups: async (locale: string): Promise<ITaxonomyRes> => {
    return await fetchData({
      api: ENDPOINTS.taxonomies.get(locale, 'leadership_group'),
    })
  },

  getLeadershipByGroup: async (locale: string, groupSlug: string): Promise<ILeadershipRes> => {
    return await fetchData({
      api: `${ENDPOINTS.leadership.list}?lang=${locale}&acf=true&tax=leadership_group&category=${groupSlug}`,
    })
  },
}

export default leadershipService