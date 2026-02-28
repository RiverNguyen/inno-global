import SearchDetail from '@/modules/search-page'
import blogService from '@/services/blogs'
import projectService from '@/services/projects'
import serviceApi from '@/services/service'
import trainingService from '@/services/training'

const limit = 6

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const [{ locale }, sp] = await Promise.all([params, searchParams])
  const q = sp.q || ''

  const [projectRes, serviceRes, blogRes, trainingRes] = await Promise.all([
    projectService.search({ locale, limit, q }),
    serviceApi.search({ locale, limit, q }),
    blogService.search({ locale, limit, q }),
    trainingService.search({ locale, limit, q }),
  ])

  return (
    <main className='xsm:pt-[2.92rem] relative pt-[3.65rem]'>
      <SearchDetail
        projectRes={projectRes}
        serviceRes={serviceRes}
        blogRes={blogRes}
        trainingRes={trainingRes}
      />
    </main>
  )
}
