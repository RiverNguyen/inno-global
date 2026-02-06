const ENDPOINTS = {
  page: (pageId: number) => `wp/v2/pages/${pageId}?_fields=acf&acf_format=standard`,
  tour: {
    list: '/tour/list',
  },
  detail: (slug: string, locale: string) => `api/v1/detail/${slug}?locale=${locale}&acf=true`,
  project: {
    list: 'api/v1/get-all/project',
  },
  company: {
    list: 'api/v1/get-all/company',
  },
}

export default ENDPOINTS
