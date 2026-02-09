import { useTranslations } from 'next-intl'

import type { IRelatedProjectsDataRes } from '@/interfaces/detail-service.interface'
import TitleSection from '@/modules/page-detail-service/components/TitleSection'
import RelatedProjects from '@/modules/page-detail-service/sections/SectionRelatedProjects/RelatedProjects'

interface SectionRelatedProjectsProps {
  relatedProjectsData: IRelatedProjectsDataRes
}

export default function SectionRelatedProjects({ relatedProjectsData }: SectionRelatedProjectsProps) {
  const t = useTranslations('DetailServicePage')

  return (
    <section
      id='related-projects'
      data-section-target
      className='xsm:py-[1.66667rem] xsm:px-[0.83333rem] relative'
    >
      <div className='xsm:space-y-[1.04167rem] mx-auto max-w-[75rem] space-y-[2.08333rem]'>
        <TitleSection>{t('sectionRelatedProjects.title')}</TitleSection>
        <RelatedProjects
          totalPages={relatedProjectsData?.totalPages}
          initRelatedProjects={relatedProjectsData?.data}
          limit={relatedProjectsData?.limit}
        />
      </div>
    </section>
  )
}
