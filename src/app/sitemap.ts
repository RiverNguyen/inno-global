/* eslint-disable @typescript-eslint/no-explicit-any */
import ENV from '@/configs/env'
import fetchData from '@/fetches/fetchData'

export default async function sitemap() {
  const baseUrl = ENV.DOMAIN
  const lastModified = new Date()

  const generatePageStaticEn = ['/en'].flatMap((locale) =>
    [
      '',
      '/about-us',
      '/contact',
      '/blogs',
      '/projects',
      '/services',
      '/about-us/corporate-culture',
      '/about-us/history-of-formation',
      '/about-us/leadership',
      '/about-us/organizational-chart',
      '/about-us/social-responsibility',
      '/about-us/sub-company',
      '/trainings',
      '/privacy-policy',
      '/terms-of-use',
    ].map((path) => ({
      url: `${baseUrl}${locale}${path}`,
      lastModified,
      priority: path === '' ? 1 : 0.9,
    })),
  )

  const generatePageStaticVi = [''].flatMap((locale) =>
    [
      '',
      '/ve-chung-toi',
      '/lien-he',
      '/tin-tuc',
      '/du-an',
      '/dich-vu',
      '/ve-chung-toi/van-hoa-doanh-nghiep',
      '/ve-chung-toi/lich-su-hinh-thanh',
      '/ve-chung-toi/ban-lanh-dao-cong-ty',
      '/ve-chung-toi/so-do-to-chuc',
      '/ve-chung-toi/trach-nhiem-xa-hoi',
      '/ve-chung-toi/cong-ty-con',
      '/dao-tao',
      '/chinh-sach-bao-mat',
      '/dieu-khoan-su-dung',
    ].map((path) => ({
      url: `${baseUrl}${locale}${path}`,
      lastModified,
      priority: path === '' ? 1 : 0.9,
    })),
  )

  // Fetch dynamic content with error handling
  const fetchSlugs = async (api: string) => {
    try {
      return await fetchData({ api })
    } catch (error) {
      console.error(`Failed to fetch slugs from ${api}:`, error)
      return null
    }
  }

  const [
    projectEn,
    projectVi,
    leadershipEn,
    leadershipVi,
    blogEn,
    blogVi,
    trainingEn,
    trainingVi,
    serviceEn,
    serviceVi,
  ] = await Promise.all([
    fetchSlugs('api/v1/slugs?post_type=project&lang=en'),
    fetchSlugs('api/v1/slugs?post_type=project&lang=vi'),
    fetchSlugs('api/v1/slugs?post_type=leadership&lang=en'),
    fetchSlugs('api/v1/slugs?post_type=leadership&lang=vi'),
    fetchSlugs('api/v1/slugs?post_type=post&lang=en'),
    fetchSlugs('api/v1/slugs?post_type=post&lang=vi'),
    fetchSlugs('api/v1/slugs?post_type=training&lang=en'),
    fetchSlugs('api/v1/slugs?post_type=training&lang=vi'),
    fetchSlugs('api/v1/get-all-taxonomy/service?lang=en&limit=100&paged=1'),
    fetchSlugs('api/v1/get-all-taxonomy/service?lang=vi&limit=100&paged=1'),
  ])

  // Helper to get slug from either string or object
  const getSlug = (item: any): string | null => {
    if (typeof item === 'string') return item
    if (item?.slug) return item.slug
    return null
  }

  const generatePageStaticProject = (prefix: string, projects: any[], locale: string) => {
    if (!projects || projects?.length === 0 || !Array.isArray(projects)) {
      return []
    }
    return projects
      .map((project: any) => {
        const slug = getSlug(project)
        if (!slug) return null
        return {
          url: `${baseUrl}${locale}/${prefix}/${slug}`,
          lastModified,
          priority: 0.8,
        }
      })
      .filter((item): item is { url: string; lastModified: Date; priority: number } => item !== null)
  }

  const generatePageStaticLeadership = (prefix: string, leaderships: any[], locale: string) => {
    if (!leaderships || leaderships?.length === 0 || !Array.isArray(leaderships)) {
      return []
    }
    return leaderships
      .map((leadership: any) => {
        const slug = getSlug(leadership)
        if (!slug) return null
        return {
          url: `${baseUrl}${locale}/${prefix}/${slug}`,
          lastModified,
          priority: 0.8,
        }
      })
      .filter((item): item is { url: string; lastModified: Date; priority: number } => item !== null)
  }

  const generatePageStaticBlog = (prefix: string, posts: any[], locale: string) => {
    if (!posts || posts?.length === 0 || !Array.isArray(posts)) {
      return []
    }
    return posts
      .map((post: any) => {
        const slug = getSlug(post)
        if (!slug) return null
        return {
          url: `${baseUrl}${locale}/${prefix}/${slug}`,
          lastModified,
          priority: 0.8,
        }
      })
      .filter((item): item is { url: string; lastModified: Date; priority: number } => item !== null)
  }

  const generatePageStaticTraining = (prefix: string, trainings: any[], locale: string) => {
    if (!trainings || trainings?.length === 0 || !Array.isArray(trainings)) {
      return []
    }
    return trainings
      .map((training: any) => {
        const slug = getSlug(training)
        if (!slug) return null
        return {
          url: `${baseUrl}${locale}/${prefix}/${slug}`,
          lastModified,
          priority: 0.8,
        }
      })
      .filter((item): item is { url: string; lastModified: Date; priority: number } => item !== null)
  }

  // Handle different possible response structures
  // API might return { projects: [...] } or directly [...]
  const getProjects = (data: any) => data?.projects || data?.data || (Array.isArray(data) ? data : [])
  const getLeaderships = (data: any) => data?.leaderships || data?.data || (Array.isArray(data) ? data : [])
  const getPosts = (data: any) => data?.posts || data?.data || (Array.isArray(data) ? data : [])
  const getTrainigs = (data: any) => data?.trainings || data?.data || (Array.isArray(data) ? data : [])
  const getServices = (data: any) => data?.services || data?.data || (Array.isArray(data) ? data : [])

  const generatePageStaticProjectVi = generatePageStaticProject('du-an', getProjects(projectVi), '')
  const generatePageStaticProjectEn = generatePageStaticProject('projects', getProjects(projectEn), '/en')

  const generatePageStaticLeadershipVi = generatePageStaticLeadership(
    've-chung-toi/ban-lanh-dao-cong-ty',
    getLeaderships(leadershipVi),
    '',
  )
  const generatePageStaticLeadershipEn = generatePageStaticLeadership(
    'about-us/leadership',
    getLeaderships(leadershipEn),
    '/en',
  )

  const generatePageStaticBlogVi = generatePageStaticBlog('tin-tuc', getPosts(blogVi), '')
  const generatePageStaticBlogEn = generatePageStaticBlog('blogs', getPosts(blogEn), '/en')

  const generatePageStaticTrainingVi = generatePageStaticTraining('dao-tao', getTrainigs(trainingVi), '')
  const generatePageStaticTrainingEn = generatePageStaticTraining('trainings', getTrainigs(trainingEn), '/en')

  const generatePageStaticServiceVi = generatePageStaticProject('dich-vu', getServices(serviceVi), '')
  const generatePageStaticServiceEn = generatePageStaticProject('services', getServices(serviceEn), '/en')

  return [
    // Static pages first
    ...generatePageStaticEn,
    ...generatePageStaticVi,
    // Dynamic pages after
    ...generatePageStaticProjectEn,
    ...generatePageStaticProjectVi,
    ...generatePageStaticLeadershipEn,
    ...generatePageStaticLeadershipVi,
    ...generatePageStaticBlogEn,
    ...generatePageStaticBlogVi,
    ...generatePageStaticTrainingEn,
    ...generatePageStaticTrainingVi,
    ...generatePageStaticServiceEn,
    ...generatePageStaticServiceVi,
  ]
}
