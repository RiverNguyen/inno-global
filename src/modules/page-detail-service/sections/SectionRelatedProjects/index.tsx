import { useTranslations } from 'next-intl'

import TitleSection from '@/modules/page-detail-service/components/TitleSection'

export default function SectionRelatedProjects() {
  const t = useTranslations('DetailServicePage')
  return (
    <section
      id='related-projects'
      data-section-target
      className='xsm:py-[1.66667rem] xsm:px-[0.83333rem] relative'
    >
      <div className='xsm:space-y-[1.04167rem] mx-auto max-w-[75rem] space-y-[2.08333rem]'>
        <TitleSection>{t('sectionRelatedProjects.title')}</TitleSection>
        <div className='xsm:grid-cols-1 xsm:gap-[1.04167rem] grid grid-cols-2 gap-[2.08333rem]'>
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className='col-span-1'
            >
              Card Related Project
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
