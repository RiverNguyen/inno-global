import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import SectionPagination from '@/components/shared/SectionPagination'

type DirectorCard = {
  name: string
  position: string
  image: string
  href: string
}

type BoardSectionData = {
  title: string
  directors: DirectorCard[]
}

const BoardSection = ({ title, directors }: { title: string; directors: DirectorCard[] }) => (
  <div className='xsm:gap-[1.25rem] flex flex-col gap-[3.33333rem]'>
    <h2 className='font-open-sans xsm:text-[1.04167rem] xsm:leading-[150%] text-center text-[1.875rem] leading-[1.35417rem] font-semibold text-[rgba(9,9,9,0.80)]'>
      {title}
    </h2>
    <div className='xsm:gap-y-[0.625rem] xsm:gap-x-[0.83333rem] flex flex-wrap justify-center gap-x-[1.77rem] gap-y-[3.33333rem]'>
      {directors.map((director, index) => (
        <Link
          href={director.href}
          key={index}
          className='xsm:w-[8.5112rem] relative w-[17.34375rem]'
        >
          <Image
            src='/leadership/overlay.webp'
            alt='overlay'
            width={333}
            height={439}
            className='xsm:h-[11.22047rem] absolute top-0 left-0 h-[22.86458rem] w-full object-cover'
          />
          <Image
            src={director.image}
            alt={director.name}
            width={333}
            height={439}
            className='xsm:h-[11.22047rem] relative h-[22.86458rem] w-full object-cover'
          />
          <div className='xsm:py-[0.52083rem] xsm:px-[0.625rem] flex flex-col gap-[0.39333rem] bg-[#F0F0F0] py-[1.25rem] pr-[1.45833rem] pl-[1.25rem]'>
            <h3 className='font-open-sans xsm:text-[0.72917rem] text-[1.25rem] leading-[150%] font-semibold text-[#090909]'>
              {director.name}
            </h3>
            <div className='xsm:gap-[0.19302rem] flex items-center gap-[0.39333rem]'>
              <Image
                src='/leadership/icon-user.webp'
                alt='user'
                width={20}
                height={20}
                className='xsm:size-[0.625rem] size-[1.04896rem]'
              />
              <span className='font-open-sans xsm:text-[0.625rem] text-[0.9375rem] leading-[150%] text-[rgba(9,9,9,0.60)]'>
                {director.position}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
)

export default function BoardOfDirectors({ sections, locale }: { sections: BoardSectionData[]; locale: string }) {
  const t = useTranslations()
  const getAboutUsHref = (locale: string) => (locale === 'en' ? '/about-us' : '/ve-chung-toi')

  return (
    <>
      <div className='xsm:gap-[1.66667rem] xsm:px-[0.83333rem] xsm:pb-0 xsm:pt-[1.66667rem] mx-auto flex max-w-[74.6875rem] flex-col gap-[5rem] py-[4.16667rem]'>
        {sections.map((section) => (
          <BoardSection
            key={section.title}
            title={section.title}
            directors={section.directors}
          />
        ))}
      </div>

      {/* Pagination */}
      <SectionPagination
        prev={{ href: '', label: t('Breadcrumb.companyPage') }}
        center={{ href: getAboutUsHref(locale), label: t('Breadcrumb.aboutUsPage') }}
        next={{ href: '', label: t('Breadcrumb.businessCulturePage') }}
      />
    </>
  )
}
