import { Metadata } from 'next'

import ENDPOINTS from '@/configs/endpoints'
import ENV from '@/configs/env'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import ProjectListPage from '@/modules/project-list-page'
import projectService from '@/services/projects'
import metadataValues from '@/utils/metadataValues'

interface ProjectListPageViProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const res = await getMetaDataRankMath(ENDPOINTS.project.rank_math[locale as keyof typeof ENDPOINTS.project.rank_math])
  return metadataValues(res, ENV.DOMAIN || '')
}

export default async function ProjectListPageVi({ params }: ProjectListPageViProps) {
  const { locale } = await params

  const [initialProjects, taxonomies] = await Promise.all([
    projectService.getProjects(locale),
    projectService.getTaxonomies(locale),
  ])

  return (
    <main className='xsm:pt-[2.92rem] relative pt-[3.65rem]'>
      <ProjectListPage
        initialProjects={initialProjects}
        taxonomies={taxonomies}
      />
    </main>
  )
}
