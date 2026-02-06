import { useTranslations } from 'next-intl'

import { IRelatedBlogItemData } from '@/interfaces/detail-service.interface'
import TitleSection from '@/modules/page-detail-service/components/TitleSection'
import RelatedBlogs from '@/modules/page-detail-service/sections/SectionRelatedBlogs/RelatedBlogs'

interface SectionRelatedBlogsProps {
  totalPages: number
  initRelatedBlogs: IRelatedBlogItemData[]
}

export default function SectionRelatedBlogs({ totalPages, initRelatedBlogs }: SectionRelatedBlogsProps) {
  const t = useTranslations('DetailServicePage')

  return (
    <section
      id='related-blogs'
      data-section-target
      className='xsm:pt-[1.66667rem] xsm:pb-[3.33333rem] xsm:px-[0.83333rem] relative'
    >
      <div className='mx-auto max-w-[75rem]'>
        <TitleSection className='xsm:mb-[1.04167rem] mb-[2.08333rem]'>{t('sectionRelatedBlogs.title')}</TitleSection>
        <RelatedBlogs
          totalPages={totalPages}
          initRelatedBlogs={initRelatedBlogs}
        />
      </div>
    </section>
  )
}
