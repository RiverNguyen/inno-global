import { Metadata } from 'next'

import ENDPOINTS from '@/configs/endpoints'
import ENV from '@/configs/env'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import { IProjectDetail, IProjectsRes } from '@/interfaces/project.interface'
import ProjectDetail from '@/modules/project-detail-page'
import projectService from '@/services/projects'
import metadataValues from '@/utils/metadataValues'

export const dynamic = 'force-dynamic'

export function generateStaticParams() {
  return [{ locale: 'vi' }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  const { slug, locale } = await params
  const res = await getMetaDataRankMath(
    ENDPOINTS.project.rank_math_detail[locale as keyof typeof ENDPOINTS.project.rank_math_detail](slug),
  )
  return metadataValues(res, ENV.DOMAIN || '')
}

const ProjectDetailPage = async ({ params }: { params: Promise<{ locale: string; slug: string }> }) => {
  const { locale, slug } = await params

  const res: IProjectDetail = await projectService.getProjectDetail(slug, locale)

  const location = res?.taxonomies?.location[0]?.slug
  const investor = res?.taxonomies?.investor[0]?.slug

  const relatedRes: IProjectsRes = await projectService.getRelated({
    locale,
    location,
    investor,
  })

  return (
    <main className='relative xsm:pt-[2.92rem]'>
      <ProjectDetail
        res={res}
        relatedProjects={relatedRes?.data}
      />
    </main>
  )
}
export default ProjectDetailPage
