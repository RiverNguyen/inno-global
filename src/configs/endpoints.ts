import { FetchRelatedBlogsProps, FetchRelatedProjectsProps } from '@/services/service'

const ENDPOINTS = {
  tour: {
    list: '/tour/list',
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
