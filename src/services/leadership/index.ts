import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import { ILeadership, ILeadershipRes } from '@/interface/leadership.interface'
import { ITaxonomyRes } from '@/interface/taxonomy.interface'

const leadershipService = {
  getLeadershipList: async (locale: string): Promise<ILeadershipRes> => {
    return await fetchData({
      api: `${ENDPOINTS.leadership.list}?lang=${locale}`,
    })
  },

  getLeadershipDetail: async (slug: string): Promise<ILeadership> => {
    return await fetchData({
      api: `${ENDPOINTS.leadership.detail(slug)}?acf=true`,
    })
  },

  getLeadershipGroups: async (locale: string): Promise<ITaxonomyRes> => {
    return await fetchData({
      api: ENDPOINTS.taxonomies.get(locale, 'leadership_group'),
    })
  },

  getLeadershipByGroup: async (locale: string, groupSlug: string): Promise<ILeadershipRes> => {
    return await fetchData({
      api: `${ENDPOINTS.leadership.list}?lang=${locale}&acf=true&tax=leadership_group&leadership_group=${encodeURIComponent(
        groupSlug,
      )}`,
    })
  },
}

export default leadershipService