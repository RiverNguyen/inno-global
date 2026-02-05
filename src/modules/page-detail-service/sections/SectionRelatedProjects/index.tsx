import { useLocale, useTranslations } from 'next-intl'

import ProjectCard from '@/components/shared/ProjectCard'
import ROUTES from '@/configs/routes'
import { IRelatedProjectItemData } from '@/interfaces/detail-service.interface'
import TitleSection from '@/modules/page-detail-service/components/TitleSection'

interface SectionRelatedProjectsProps {
  relatedProjects: IRelatedProjectItemData[]
}

export default function SectionRelatedProjects({ relatedProjects }: SectionRelatedProjectsProps) {
  const t = useTranslations('DetailServicePage')
  const locale = useLocale()

  const projectsPageLink = locale === 'vi' ? ROUTES.projectsVi : ROUTES.projectsEn

  return (
    <section
      id='related-projects'
      data-section-target
      className='xsm:py-[1.66667rem] xsm:px-[0.83333rem] relative'
    >
      <div className='xsm:space-y-[1.04167rem] mx-auto max-w-[75rem] space-y-[2.08333rem]'>
        <TitleSection>{t('sectionRelatedProjects.title')}</TitleSection>
        <div className='xsm:grid-cols-1 xsm:gap-[1.04167rem] grid grid-cols-2 gap-[2.08333rem]'>
          {Array.isArray(relatedProjects) &&
            relatedProjects?.map((item, index) => (
              <div
                key={index}
                className='col-span-1'
              >
                <ProjectCard
                  project={{
                    image: item?.featured_image?.url,
                    title: item?.title || '',
                    location: item?.taxonomies?.location?.[0]?.name || '',
                    investor: item?.taxonomies?.investor?.[0]?.name || '',
                    link: `${projectsPageLink}/${item.slug}`,
                  }}
                  classNameThumbnail='h-[23.07292rem] xsm:h-[11.30984rem]'
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
