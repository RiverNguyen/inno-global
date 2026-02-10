import { getTranslations } from 'next-intl/server'

import Projects, { IProject } from '@/app/[locale]/_components/projects/projects'
import projectService from '@/services/projects'

type ProjectListApiResponse = {
  data?: Array<{
    id?: number
    slug?: string
    title?: string
    excerpt?: string
    content?: string
    featured_image?: { url?: string } | { source_url?: string } | string
    taxonomies?: {
      location?: Array<{ name?: string }>
      investor?: Array<{ name?: string }>
      starting_year?: Array<{ name?: string }>
    }
    acf?: {
      area?: string
      investor?: string
      location?: string
      starting_year?: string
      year?: string
    }
  }>
}

function mapApiProjectsToHomeProjects(items: ProjectListApiResponse['data']): IProject[] {
  if (!Array.isArray(items)) return []

  return items
    .map((item, idx) => {
      const featuredImage = item?.featured_image
      const image =
        typeof featuredImage === 'string'
          ? featuredImage
          : ((featuredImage as { url?: string } | undefined)?.url ??
            (featuredImage as { source_url?: string } | undefined)?.source_url ??
            '')

      const investor = item?.acf?.investor ?? item?.taxonomies?.investor?.[0]?.name ?? ''

      const location = item?.acf?.location ?? item?.taxonomies?.location?.[0]?.name ?? ''

      const year = item?.acf?.starting_year ?? item?.acf?.year ?? item?.taxonomies?.starting_year?.[0]?.name ?? ''

      return {
        id: item?.id ?? idx,
        image,
        title: item?.title ?? '',
        content: item?.excerpt ?? item?.content ?? '',
        location,
        investor,
        area: item?.acf?.area ?? '',
        year,
        link: item?.slug ?? '',
      }
    })
    .filter((p) => Boolean(p.link))
}

export default async function ProjectsSection({
  locale,
  acfProjects,
}: {
  locale: 'vi' | 'en'
  acfProjects: IProject[] | undefined | null
}) {
  const t = await getTranslations({ locale, namespace: 'ProjectListPage' })

  const hasAcfProjects = Array.isArray(acfProjects) && acfProjects.length > 0
  const data = hasAcfProjects
    ? (acfProjects as IProject[])
    : mapApiProjectsToHomeProjects(((await projectService.getProjects(locale)) as ProjectListApiResponse)?.data)

  if (!data.length) return null

  return (
    <>
      <h2 className='text-center text-[1.25rem] font-semibold text-[#090909] mb-[1.67rem] sm:hidden'>
        {t('featuredProjects')}
      </h2>
      <Projects data={data} />
    </>
  )
}
