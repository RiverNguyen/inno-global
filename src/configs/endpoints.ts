import { FetchRelatedBlogsProps, FetchRelatedProjectsProps } from '@/services/service'

const ENDPOINTS = {
  project: {
    getAll: (locale: string) =>
      `api/v1/get-all/project?lang=${locale}&tax=location,investor,service,building_type,starting_year&orderby=date&order=DESC&limit=12&paged=1`,
    relatedProjects: 'api/v1/get-all/project',
    getTypes: (locale: string) => `api/v1/taxonomies?lang=${locale}&taxonomy=building_type`,
    getServices: (locale: string) => `api/v1/taxonomies?lang=${locale}&taxonomy=service`,
    getLocations: (locale: string) => `api/v1/taxonomies?lang=${locale}&taxonomy=location`,
    getYears: (locale: string) => `api/v1/taxonomies?lang=${locale}&taxonomy=starting_year`,
  },
  leadership: {
    list: 'api/v1/get-all/leadership',
    detail: (slug: string) => `api/v1/detail/${slug}?acf=true`,
  },
  taxonomies: {
    list: 'api/v1/taxonomies',
    get: (locale: string, taxonomy: string) => `api/v1/taxonomies?lang=${locale}&taxonomy=${taxonomy}`,
  },
  pageIds: {
    aboutUsVi: 104,
    aboutUsEn: 106,
    subCompanyVi: 275,
    subCompanyEn: 277,
    organizationChartVi: 318,
    organizationChartEn: 323,
    cultureVi: 368,
    cultureEn: 371,
  },
  service: {
    getAll: (locale: string) =>
      `api/v1/get-all-taxonomy/service?lang=${locale}&fields=thumbnail&orderby=date&order=DESC&limit=12&paged=1`,
    detail: (slug: string) => `api/v1/taxonomy/${slug}?acf=true`,
    relatedProjects: ({ slug, limit, lang, paged }: FetchRelatedProjectsProps) =>
      `api/v1/get-all/project?lang=${lang}&acf=true&tax=service&service=${slug}&limit=${limit}&paged=${paged}&orderby=date&order=DESC`,
    relatedBlogs: ({ slug, limit, lang, paged }: FetchRelatedBlogsProps) =>
      `api/v1/get-all/post?lang=${lang}&tax=service&service=${slug}&limit=${limit}&paged=${paged}&orderby=date&order=DESC`,
    getPage: {
      vi: 'wp/v2/pages/326?_fields=acf&acf_format=standard',
      en: 'wp/v2/pages/328?_fields=acf&acf_format=standard',
    },
  },
  socialResponsibility: {
    en: 'wp/v2/pages/340?_fields=acf&acf_format=standard',
    vi: 'wp/v2/pages/338?_fields=acf&acf_format=standard',
  },
  detail: (slug: string, locale: string) => `api/v1/detail/${slug}?locale=${locale}&acf=true`,
  company: {
    list: 'api/v1/get-all/company',
  },
}

export default ENDPOINTS
