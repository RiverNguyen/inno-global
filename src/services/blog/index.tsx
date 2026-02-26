import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

const blogService = {
  getBlogDetail: async (slug: string, locale: string) => {
    return await fetchData({
      api: ENDPOINTS.detail(slug, locale),
    })
  },
  getRelatedBlogs: async ({
    locale,
    category,
    // tag,
  }: {
    locale: string
    category?: string
    tag?: string
  }) => {
    const params = new URLSearchParams()

    params.append('lang', locale)
    if (category) {
      params.append('tax', 'category')
      params.append('category', category)
    }
    // if (tag) {
    //   params.append('tax', 'post_tag')
    //   params.append('post_tag', tag)
    // }

    return await fetchData({
      api: `${ENDPOINTS.blog.relatedBlogs}?${params.toString()}`,
    })
  },
}

export default blogService
