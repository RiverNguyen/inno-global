import { IProjectDetail } from '@/interfaces/project.interface'
import Banner from '@/modules/project-detail-page/_components/banner'
import Content from '@/modules/project-detail-page/_components/content'
import Overview from '@/modules/project-detail-page/_components/overview'
import RelatedProjects from '@/modules/project-detail-page/_components/related-projects'

const ProjectDetail = ({ res, relatedProjects }: { res: IProjectDetail; relatedProjects: IProjectDetail[] }) => {
  const location = res?.taxonomies?.location[0]?.name || ''
  const gallery = res?.acf?.project_gallery || []

  return (
    <>
      <Banner
        title={res?.title}
        location={location}
        gallery={gallery}
      />
      <Overview overview={res?.acf?.project_overview} />
      <Content content={res?.content} />
      <RelatedProjects data={relatedProjects} />
    </>
  )
}

export default ProjectDetail
