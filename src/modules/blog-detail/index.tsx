import Banner from '@/modules/blog-detail/_components/banner'
import Content from '@/modules/blog-detail/_components/content'
import Overview from '@/modules/blog-detail/_components/overview'
import RelatedProjects from '@/modules/blog-detail/_components/related-projects'

const BlogDetail = () => {
  return (
    <>
      <Banner />
      <Overview />
      <Content />
      <RelatedProjects />
    </>
  )
}

export default BlogDetail
