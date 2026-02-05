import { useTranslations } from 'next-intl'

import ProjectCard from '@/components/shared/ProjectCard'
import TitleSection from '@/modules/page-detail-service/components/TitleSection'

const MOCK_DATA = [
  {
    name: 'Tòa nhà Landmark 81',
    investor: 'FPT',
    location: 'Quảng Ninh',
    thumbnail: { alt: '', url: '/images/detail-service/d-project-1.webp' },
    slug: 'du-an-1',
  },
  {
    name: 'Tòa nhà Landmark 81',
    investor: 'FPT',
    location: 'Quảng Ninh',
    thumbnail: { alt: '', url: '/images/detail-service/d-project-2.webp' },
    slug: 'du-an-2',
  },
  {
    name: 'Tòa nhà Landmark 81',
    investor: 'FPT',
    location: 'Quảng Ninh',
    thumbnail: { alt: '', url: '/images/detail-service/d-project-3.webp' },
    slug: 'du-an-3',
  },
  {
    name: 'Tòa nhà Landmark 81',
    investor: 'FPT',
    location: 'Quảng Ninh',
    thumbnail: { alt: '', url: '/images/detail-service/d-project-4.webp' },
    slug: 'du-an-4',
  },
]

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
          {MOCK_DATA.map((item, index) => (
            <div
              key={index}
              className='col-span-1'
            >
              <ProjectCard
                project={{
                  image: item?.thumbnail?.url,
                  title: item?.name,
                  location: item?.location,
                  investor: item?.investor,
                  link: '/',
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
