import Banner from '@/modules/project-detail-page/_components/banner'
import Content from '@/modules/project-detail-page/_components/content'
import Overview from '@/modules/project-detail-page/_components/overview'
import RelatedProjects from '@/modules/project-detail-page/_components/related-projects'


const ProjectDetail = () => {
  return (
    <>
      <Banner />
      <Overview />
      <Content />
      <RelatedProjects />
    </>
  )
}

export default ProjectDetail
