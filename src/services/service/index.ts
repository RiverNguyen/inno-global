import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

export interface FetchRelatedProjectsProps {
  slug: string
  limit?: number
  lang: string
  paged?: number
}

export interface FetchRelatedBlogsProps {
  slug: string
  limit?: number
  lang: string
  paged?: number
}

const serviceApi = {
  getDetail: async (slug: string) => {
    return await fetchData({
      api: ENDPOINTS.service.detail(slug),
    })
  },
  getRelatedProjects: async ({ slug, limit = 4, lang, paged = 1 }: FetchRelatedProjectsProps) => {
    return await fetchData({
      api: ENDPOINTS.service.relatedProjects({ slug, limit, lang, paged }),
    })
  },
  getRelatedBlogs: async ({ slug, limit = 6, lang, paged = 1 }: FetchRelatedBlogsProps) => {
    return await fetchData({
      api: ENDPOINTS.service.relatedBlogs({ slug, limit, lang, paged }),
    })
  },
}

export default serviceApi
