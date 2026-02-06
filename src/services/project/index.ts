import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

const projectService = {
  getProjectDetail: async (slug: string, locale: string) => {
    return await fetchData({
      api: ENDPOINTS.detail(slug, locale),
    })
  },
  getProjects: async ({ locale, location, investor }: { locale: string; location?: string; investor?: string }) => {
    const params = new URLSearchParams()

    params.append('lang', locale)
    if (location) {
      params.append('tax', 'location')
      params.append('location', location)
    }
    if (investor) {
      params.append('tax', 'investor')
      params.append('investor', investor)
    }

    return await fetchData({
      api: `${ENDPOINTS.project.relatedProjects}?${params.toString()}`,
    })
  },
}

export default projectService
