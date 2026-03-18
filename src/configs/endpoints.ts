import { FetchRelatedBlogsProps, FetchRelatedProjectsProps } from '@/services/service'

const ENDPOINTS = {
  contact: {
    form_contact_vi: {
      id: '7',
      unit_tag: '6678855',
    },
    form_contact_en: {
      id: '809',
      unit_tag: '30d3980',
    },
    rank_math: {
      en: '/en/contact',
      vi: '/lien-he',
    },
    page_id: {
      vi: 821,
      en: 819,
    },
  },
  home: {
    rank_math: {
      en: '/en/homepage',
      vi: '/trang-chu',
    },
  },
  inno_hub: {
    rank_math: {
      en: '/inno-hub',
      vi: '/inno-hub',
    },
  },
  blog: {
    getAll: ({ locale, limit }: { locale: string; limit: number }) =>
      `api/v1/get-all/post?lang=${locale}&orderby=date&order=DESC&limit=${limit}&paged=1&acf=true`,
    relatedBlogs: 'api/v1/get-all/post',
    search: ({ locale, limit, q }: { locale: string; limit: number; q: string }) =>
      `api/v1/get-all/post?lang=${locale}&s=${q}&orderby=date&order=DESC&limit=${limit}&paged=1&acf=true`,
    getYears: (locale: string) => `api/v1/taxonomies?lang=${locale}&taxonomy=starting_year`,
    getAwards: (locale: string) => `api/v1/taxonomies?lang=${locale}&taxonomy=award`,
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
      `api/v1/get-all/project?lang=${locale}&tax=location,investor,service,building_type,starting_year&orderby=date&order=ASC&limit=12&paged=1`,
    relatedProjects: 'api/v1/get-all/project',
    getTypes: (locale: string) => `api/v1/taxonomies?lang=${locale}&taxonomy=building_type`,
    getServices: (locale: string) => `api/v1/taxonomies?lang=${locale}&taxonomy=service`,
    getLocations: (locale: string) => `api/v1/taxonomies?lang=${locale}&taxonomy=location`,
    getYears: (locale: string) => `api/v1/taxonomies?lang=${locale}&taxonomy=starting_year`,
    getAwards: (locale: string) => `api/v1/taxonomies?lang=${locale}&taxonomy=award`,
    search: ({ locale, q, limit }: { locale: string; q: string; limit: number }) =>
      `api/v1/get-all/project?lang=${locale}&tax=location,investor,service,building_type,starting_year&s=${q}&orderby=date&order=DESC&limit=${limit}&paged=1`,
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
    detail: (slug: string, locale: string) => `api/v1/detail/${slug}?acf=true&lang=${locale}`,
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
    ceo: {
      vi: 'wp/v2/pages/1021?_fields=acf&acf_format=standard',
      en: 'wp/v2/pages/1026?_fields=acf&acf_format=standard',
    },
    ceo_rank_math: {
      vi: '/thong-diep-cua-nguoi-sang-lap',
      en: '/founders-message',
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
      en: 950,
    },
    subCompanyVi: 275,
    subCompanyEn: 277,
    organizationChartVi: 318,
    organizationChartEn: 323,
    cultureVi: 368,
    cultureEn: 999,
    privacyPolicyVi: 865,
    privacyPolicyEn: 867,
    termsOfUseVi: 884,
    termsOfUseEn: 886,
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
    detail: (slug: string) => `api/v1/taxonomy/${slug}?acf=true&taxonomy=service`,
    search: ({ locale, q, limit }: { locale: string; q: string; limit: number }) =>
      `api/v1/get-all-taxonomy/service?lang=${locale}&s=${q}&fields=thumbnail&orderby=date&order=DESC&limit=${limit}&paged=1&acf=true`,
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
  history: {
    en: 'wp/v2/pages/705?_fields=acf&acf_format=standard',
    vi: 'wp/v2/pages/703?_fields=acf&acf_format=standard',
    rank_math: {
      en: '/en/history-of-formation',
      vi: '/lich-su-hinh-thanh',
    },
  },
  leadershipPage: {
    vi: 'wp/v2/pages/594?_fields=acf&acf_format=standard',
    en: 'wp/v2/pages/596?_fields=acf&acf_format=standard',
  },
  detail: (slug: string, locale: string, post_type: string) =>
    `api/v1/detail/${slug}?lang=${locale}&post_type=${post_type}&acf=true`,
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
  auth: {
    login: 'api/v1/auth/login',
    register: 'api/v1/auth/register',
    refreshToken: 'api/v1/auth/refresh',
    logoutAll: 'api/v1/auth/logout-all',
    logout: 'api/v1/auth/logout',
    info: 'api/v1/auth/me',
    requestOTP: 'api/v1/auth/password/otp/request',
    verifyOTP: 'api/v1/auth/verify-otp-only',
    verifyOTPAndResetPassword: 'api/v1/auth/verify-otp-and-reset',
    resetPassword: 'api/v1/auth/password/otp/reset',
    registerOTP: 'api/v1/auth/register/verify',
    resendRegisterOTP: 'api/v1/auth/register/resend-otp',
    updateInfo: 'api/v1/users/me/profile',
    changePassword: 'api/v1/auth/change-password',
    forgotPassword: 'api/v1/auth/forgot-password',
    updateAvatar: 'api/v1/auth/avatar',
  },
  training: {
    getRelated: 'api/v1/get-all/training',
    search: ({ locale, limit, q }: { locale: string; limit: number; q: string }) =>
      `api/v1/get-all/training?lang=${locale}&s=${q}&tax=format,training_category,lecturer,participant,starting_year&orderby=date&order=DESC&limit=${limit}&paged=1`,
    getAll: ({ locale, limit = 12 }: { locale: string; limit?: number }) =>
      `api/v1/get-all/training?lang=${locale}&tax=format,training_category,lecturer,participant,starting_year&orderby=date&order=DESC&limit=${limit}&paged=1`,
    getCategories: (locale: string) =>
      `api/v1/taxonomies?lang=${locale}&taxonomy=training_category&orderby=data&order=DESC`,
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
  privacyPolicy: {
    rank_math: {
      en: '/privacy-policy',
      vi: '/chinh-sach-bao-mat',
    },
  },
  termsOfUse: {
    rank_math: {
      en: '/terms-of-use',
      vi: '/dieu-khoan-su-dung',
    },
  },
}

export default ENDPOINTS
