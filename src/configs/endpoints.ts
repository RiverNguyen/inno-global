const ENDPOINTS = {
  project: {
    getAll: (locale: string) =>
      `api/v1/get-all/project?lang=${locale}&tax=location,investor,service,building_type,starting_year&orderby=date&order=DESC&limit=12&paged=1`,
    getTypes: (locale: string) => `api/v1/taxonomies?lang=${locale}&taxonomy=building_type`,
    getServices: (locale: string) => `api/v1/taxonomies?lang=${locale}&taxonomy=service`,
    getLocations: (locale: string) => `api/v1/taxonomies?lang=${locale}&taxonomy=location`,
    getYears: (locale: string) => `api/v1/taxonomies?lang=${locale}&taxonomy=starting_year`,
  },
}

export default ENDPOINTS
