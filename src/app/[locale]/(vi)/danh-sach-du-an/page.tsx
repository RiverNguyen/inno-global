import ProjectListPage from '@/modules/project-list-page'
import projectService from '@/services/projects'

interface ProjectListPageViProps {
  params: Promise<{ locale: string }>
}

export default async function ProjectListPageVi({ params }: ProjectListPageViProps) {
  const { locale } = await params

  const [initialProjects, taxonomies] = await Promise.all([
    projectService.getProjects(locale),
    projectService.getTaxonomies(locale),
  ])

  return (
    <ProjectListPage
      initialProjects={initialProjects}
      taxonomies={taxonomies}
    />
  )
}
