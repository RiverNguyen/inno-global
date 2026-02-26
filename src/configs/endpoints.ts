import { FetchRelatedBlogsProps, FetchRelatedProjectsProps } from '@/services/service'

const ENDPOINTS = {
  home: {
    rank_math: {
      en: '/en/homepage',
      vi: '/trang-chu',
    },
  },
  blog: {
    getAll: ({ locale, limit }: { locale: string; limit: number }) =>
      `api/v1/get-all/post?lang=${locale}&orderby=date&order=DESC&limit=${limit}&paged=1&acf=true`,
    relatedBlogs: 'api/v1/get-all/post',
    getYears: (locale: string) => `api/v1/taxonomies?lang=${locale}&taxonomy=starting_year`,
    getCategories: (locale: string) => `api/v1/taxonomies?lang=${locale}&taxonomy=category`,
    rank_math: {
      en: '/en/blogs',
      vi: '/danh-sach-tin-tuc',
    },
    rank_math_detail: {
      en: (slug: string) => `/en/${slug}`,
      vi: (slug: string) => `/${slug}`,
    },
  },
  project: {
    getAll: (locale: string) =>
      `api/v1/get-all/project?lang=${locale}&tax=location,investor,service,building_type,starting_year&orderby=date&order=DESC&limit=12&paged=1`,
    relatedProjects: 'api/v1/get-all/project',
    getTypes: (locale: string) => `api/v1/taxonomies?lang=${locale}&taxonomy=building_type`,
    getServices: (locale: string) => `api/v1/taxonomies?lang=${locale}&taxonomy=service`,
    getLocations: (locale: string) => `api/v1/taxonomies?lang=${locale}&taxonomy=location`,
    getYears: (locale: string) => `api/v1/taxonomies?lang=${locale}&taxonomy=starting_year`,
    rank_math: {
      en: '/en/projects',
      vi: '/danh-sach-du-an',
    },
    rank_math_detail: {
      en: (slug: string) => `/en/project/${slug}`,
      vi: (slug: string) => `/project/${slug}`,
    },
  },
  leadership: {
    list: 'api/v1/get-all/leadership',
    detail: (slug: string) => `api/v1/detail/${slug}?acf=true`,
    rank_math: {
      en: '/leadership',
      vi: '/ban-lanh-dao-cong-ty',
    },
    rank_math_detail: {
      en: (slug: string) => `/en/leadership/${slug}`,
      vi: (slug: string) => `/leadership/${slug}`,
    },
    founder: {
      vi: 'wp/v2/pages/632?_fields=acf&acf_format=standard',
      en: 'wp/v2/pages/634?_fields=acf&acf_format=standard',
    },
  },
  taxonomies: {
    list: 'api/v1/taxonomies',
    get: (locale: string, taxonomy: string) => `api/v1/taxonomies?lang=${locale}&taxonomy=${taxonomy}`,
  },
  pageIds: {
    aboutUsVi: 104,
    aboutUsEn: 106,
    home: {
      vi: 471,
      en: 473,
    },
    subCompanyVi: 275,
    subCompanyEn: 277,
    organizationChartVi: 318,
    organizationChartEn: 323,
    cultureVi: 368,
    cultureEn: 371,
  },
  aboutUs: {
    rank_math: {
      en: '/about-us',
      vi: '/ve-chung-toi',
    },
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
    rank_math: {
      en: '/services',
      vi: '/danh-sach-dich-vu',
    },
    rank_math_detail: (slug: string) => `api/v1/seo/head-term/${slug}`,
  },
  socialResponsibility: {
    en: 'wp/v2/pages/340?_fields=acf&acf_format=standard',
    vi: 'wp/v2/pages/338?_fields=acf&acf_format=standard',
    rank_math: {
      en: '/social-responsibility',
      vi: '/trach-nhiem-xa-hoi',
    },
  },
  leadershipPage: {
    vi: 'wp/v2/pages/594?_fields=acf&acf_format=standard',
    en: 'wp/v2/pages/596?_fields=acf&acf_format=standard',
  },
  detail: (slug: string, locale: string) => `api/v1/detail/${slug}?locale=${locale}&acf=true`,
  company: {
    rank_math: {
      en: '/en/sub-company',
      vi: '/cong-ty-con',
    },
    list: 'api/v1/get-all/company',
  },
  organizationalChart: {
    rank_math: {
      en: '/en/organizational-chart',
      vi: '/so-do-to-chuc',
    },
  },
  corporateCulture: {
    rank_math: {
      en: '/en/corporate-culture',
      vi: '/van-hoa-doanh-nghiep',
    },
  },
  training: {
    getRelated: 'api/v1/get-all/training',
    getAll: ({ locale, limit = 12 }: { locale: string; limit?: number }) =>
      `api/v1/get-all/training?lang=${locale}&tax=format,training_category,lecturer,participant,starting_year&orderby=date&order=DESC&limit=${limit}&paged=1`,
    getCategories: (locale: string) => `api/v1/taxonomies?lang=${locale}&taxonomy=training_category`,

    getYears: (locale: string) => `api/v1/taxonomies?lang=${locale}&taxonomy=starting_year`,
    getPage: {
      vi: 'wp/v2/pages/740?_fields=acf&acf_format=standard',
      en: 'wp/v2/pages/744?_fields=acf&acf_format=standard',
    },
    rank_math: {
      en: '/en/trainings',
      vi: '/dao-tao',
    },
    rank_math_detail: {
      en: (slug: string) => `/en/training/${slug}`,
      vi: (slug: string) => `/training/${slug}`,
    },
  },
}

export default ENDPOINTS
