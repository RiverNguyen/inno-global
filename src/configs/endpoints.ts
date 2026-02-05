const ENDPOINTS = {
  tour: {
    list: '/tour/list',
  },
  leadership: {
    list: 'api/v1/get-all/leadership',
  },
  taxonomies: {
    list: 'api/v1/taxonomies',
    get: (locale: string, taxonomy: string) => `api/v1/taxonomies?lang=${locale}&taxonomy=${taxonomy}`,
  },
}

export default ENDPOINTS
