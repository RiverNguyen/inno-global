import { FetchRelatedBlogsProps, FetchRelatedProjectsProps } from '@/services/service'

const ENDPOINTS = {
  tour: {
    list: '/tour/list',
  },
  pageIds: {
    aboutUsVi: 104,
    aboutUsEn: 106,
    home: {
      vi: 471,
      en: 473,
    },
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
