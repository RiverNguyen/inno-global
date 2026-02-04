import SectionBanner from '@/modules/page-detail-service/sections/SectionBanner'
import SectionRelatedBlogs from '@/modules/page-detail-service/sections/SectionRelatedBlogs'
import SectionRelatedProjects from '@/modules/page-detail-service/sections/SectionRelatedProjects'

export default function PageDetailService() {
  return (
    <main className='font-open-sans xsm:space-y-0 relative space-y-[6.25rem]'>
      <SectionBanner />
      <SectionRelatedProjects />
      <SectionRelatedBlogs />
    </main>
  )
}
