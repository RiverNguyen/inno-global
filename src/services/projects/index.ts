import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

const projectService = {
  getProjects: async (locale: string) => {
    return await fetchData({
      api: ENDPOINTS.project.getAll(locale),
    })
  },
  getTaxonomies: async (locale: string) => {
    const [types, services, locations, years] = await Promise.all([
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
    ])
    return {
      types,
      services,
      locations,
      years,
    }
  },
}

export default projectService
