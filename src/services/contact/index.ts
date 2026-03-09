import fetchData from '@/fetches/fetchData'

const contactService = {
  getAcfData: async (pageId: number) => {
    return await fetchData({
      api: `wp/v2/pages/${pageId}?_fields=acf&acf_format=standard`,
    })
  },
}

export default contactService
