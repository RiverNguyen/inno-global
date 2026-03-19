import fetchData from '@/fetches/fetchData'

const innoHubService = {
  getAcfData: async (pageId: number | string) => {
    return await fetchData({
      api: `wp/v2/pages/${pageId}?_fields=acf&acf_format=standard`,
    })
  },
}

export default innoHubService
