import ServiceList from '@/modules/service-list-page'
import projectService from '@/services/projects'
import serviceApi from '@/services/service'

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function Services({ params }: PageProps) {
  const { locale } = await params

  const [services, page] = await Promise.all([
    // serviceApi.getAll(locale),
    projectService.getProjects(locale),
    serviceApi.getPage(locale as 'vi' | 'en'),
  ])

  return (
    <main>
      <ServiceList
        initialPage={services}
        page={page?.acf}
        dataSource='project'
      />
    </main>
  )
}
