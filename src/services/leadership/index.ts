import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import { ILeadershipPageRes } from '@/interfaces/leadership-page.interface'
import { ILeadership, ILeadershipRes } from '@/interfaces/leadership.interface'
import { ITaxonomyRes } from '@/interfaces/taxonomy.interface'

const leadershipService = {
  getLeadershipList: async (locale: string): Promise<ILeadershipRes> => {
    return await fetchData({
      api: `${ENDPOINTS.leadership.list}?lang=${locale}`,
    })
  },

  getLeadershipDetail: async (slug: string): Promise<ILeadership> => {
    return await fetchData({
      api: ENDPOINTS.leadership.detail(slug),
    })
  },

  getLeadershipGroups: async (locale: string): Promise<ITaxonomyRes> => {
    return await fetchData({
      api: `${ENDPOINTS.taxonomies.get(locale, 'leadership_group')}&orderby=date&order=DESC`,
    })
  },

  getLeadershipPageAcf: async (locale: string): Promise<ILeadershipPageRes> => {
    return await fetchData({
      api: locale === 'en' ? ENDPOINTS.leadershipPage.en : ENDPOINTS.leadershipPage.vi,
    })
  },

  getLeadershipByGroup: async (locale: string, groupSlug: string): Promise<ILeadershipRes> => {
    return await fetchData({
      api: `${ENDPOINTS.leadership.list}?lang=${locale}&acf=true&tax=leadership_group&leadership_group=${encodeURIComponent(
        groupSlug,
      )}`,
    })
  },

  getFounderPageAcf: async (locale: string) => {
    return await fetchData({
      api: locale === 'en' ? ENDPOINTS.leadership.founder.en : ENDPOINTS.leadership.founder.vi,
    })
  },
}

export default leadershipService
