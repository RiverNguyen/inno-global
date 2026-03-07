import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

const projectService = {
  getProjects: async (locale: string) => {
    return await fetchData({
      api: ENDPOINTS.project.getAll(locale),
    })
  },
  search: async ({ locale, q, limit = 12 }: { locale: string; q: string; limit?: number }) => {
    return await fetchData({
      api: ENDPOINTS.project.search({ locale, q, limit }),
    })
  },
  getProjectDetail: async (locale: string, slug: string) => {
    return await fetchData({
      api: ENDPOINTS.detail(slug, locale, 'project'),
    })
  },
  getRelated: async ({ locale, location, investor }: { locale: string; location?: string; investor?: string }) => {
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
  getTaxonomies: async (locale: string) => {
    const [types, services, locations, years, awards] = await Promise.all([
      fetchData({
        api: ENDPOINTS.project.getTypes(locale),
      }),
      fetchData({
        api: ENDPOINTS.project.getServices(locale),
      }),
      fetchData({
        api: ENDPOINTS.project.getLocations(locale),
      }),
      fetchData({
        api: ENDPOINTS.project.getYears(locale),
      }),
      fetchData({
        api: ENDPOINTS.project.getAwards(locale),
      }),
    ])
    return {
      types,
      services,
      locations,
      years,
      awards,
    }
  },
}

export default projectService
