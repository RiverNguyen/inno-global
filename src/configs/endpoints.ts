import { FetchRelatedBlogsProps, FetchRelatedProjectsProps } from '@/services/service'

const ENDPOINTS = {
  project: {
    getAll: (locale: string) =>
      `api/v1/get-all/project?lang=${locale}&tax=location,investor,service,building_type,starting_year&orderby=date&order=DESC&limit=12&paged=1`,
    getTypes: (locale: string) => `api/v1/taxonomies?lang=${locale}&taxonomy=building_type`,
    getServices: (locale: string) => `api/v1/taxonomies?lang=${locale}&taxonomy=service`,
    getLocations: (locale: string) => `api/v1/taxonomies?lang=${locale}&taxonomy=location`,
    getYears: (locale: string) => `api/v1/taxonomies?lang=${locale}&taxonomy=starting_year`,
  },
  pageIds: {
    aboutUsVi: 104,
    aboutUsEn: 106,
  },
  service: {
    detail: (slug: string) => `api/v1/taxonomy/${slug}?acf=true`,
    relatedProjects: ({ slug, limit, lang, paged }: FetchRelatedProjectsProps) =>
      `api/v1/get-all/project?lang=${lang}&acf=true&tax=service&service=${slug}&limit=${limit}&paged=${paged}`,
    relatedBlogs: ({ slug, limit, lang, paged }: FetchRelatedBlogsProps) =>
      `api/v1/get-all/post?lang=${lang}&acf=true&tax=service&service=${slug}&limit=${limit}&paged=${paged}`,
  },
}

export default ENDPOINTS
