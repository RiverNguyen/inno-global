import { IProjectDetail, IProjectsRes } from '@/interfaces/project.interface'
import ProjectDetail from '@/modules/project-detail-page'
import projectService from '@/services/project'

export const dynamic = 'force-dynamic'

export function generateStaticParams() {
  return [{ locale: 'en' }]
}

const ProjectDetailPage = async ({ params }: { params: Promise<{ locale: string; slug: string }> }) => {
  const { locale, slug } = await params

  const res: IProjectDetail = await projectService.getProjectDetail(slug, locale)

  const location = res?.taxonomies?.location[0]?.slug
  const investor = res?.taxonomies?.investor[0]?.slug

  const relatedRes: IProjectsRes = await projectService.getProjects({
    locale,
    location,
    investor,
  })

  return (
    <main>
      <ProjectDetail
        res={res}
        relatedProjects={relatedRes?.data}
      />
    </main>
  )
}
export default ProjectDetailPage
