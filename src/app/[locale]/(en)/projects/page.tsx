
import ProjectListPage from '@/modules/project-list-page'
import projectService from '@/services/projects'

interface ProjectListPageEnProps {
  params: Promise<{ locale: string }>
}

export default async function ProjectListPageEn({ params }: ProjectListPageEnProps) {
  const { locale } = await params
  const initialProjects = await projectService.getProjects(locale)
  const taxonomies = await projectService.getTaxonomies(locale)

  return <ProjectListPage initialProjects={initialProjects} taxonomies={taxonomies} />
}
