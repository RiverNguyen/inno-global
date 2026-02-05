import {
  IDetailServiceDataRes,
  IRelatedBlogsDataRes,
  IRelatedProjectsDataRes,
} from '@/interfaces/detail-service.interface'
import CtaFixed from '@/modules/page-detail-service/components/CtaFixed'
import SectionBanner from '@/modules/page-detail-service/sections/SectionBanner'
import SectionRelatedBlogs from '@/modules/page-detail-service/sections/SectionRelatedBlogs'
import SectionRelatedProjects from '@/modules/page-detail-service/sections/SectionRelatedProjects'

interface PageDetailServiceProps {
  detailServiceData: IDetailServiceDataRes
  relatedProjectsData: IRelatedProjectsDataRes
  relatedBlogsData: IRelatedBlogsDataRes
}

export default function PageDetailService({
  detailServiceData,
  relatedProjectsData,
  relatedBlogsData,
}: PageDetailServiceProps) {
  return (
    <main className='font-open-sans xsm:space-y-0 relative space-y-[6.25rem]'>
      <SectionBanner
        title={detailServiceData?.data?.name}
        description={detailServiceData?.data?.description}
        slideItems={detailServiceData?.data?.acf?.banner?.slide_items}
      />
      <CtaFixed />
      <SectionRelatedProjects relatedProjects={relatedProjectsData?.data} />
      <SectionRelatedBlogs
        totalPages={relatedBlogsData?.totalPages}
        initRelatedBlogs={relatedBlogsData?.data}
      />
    </main>
  )
}
