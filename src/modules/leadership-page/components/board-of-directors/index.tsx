import Image from 'next/image'
import Link from 'next/link'

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
  <div className="flex flex-col gap-[3.33333rem] xsm:gap-[1.25rem]">
    <h2 className="text-[rgba(9,9,9,0.80)] font-open-sans text-[1.875rem] font-semibold text-center leading-[1.35417rem] xsm:text-[1.04167rem] xsm:leading-[150%]">
      {title}
    </h2>
    <div className="flex flex-wrap justify-center gap-y-[3.33333rem] gap-x-[1.77rem] xsm:gap-y-[0.625rem] xsm:gap-x-[0.83333rem]">
      {directors.map((director, index) => (
        <Link href={director.href} key={index} className="relative w-[17.34375rem] xsm:w-[8.5112rem]">
          <Image
            src='/leadership/overlay.webp'
            alt="overlay"
            width={333}
            height={439}
            className="w-full h-[22.86458rem] object-cover absolute top-0 left-0 xsm:h-[11.22047rem]"
          />
          <Image
            src={director.image}
            alt={director.name}
            width={333}
            height={439}
            className="w-full h-[22.86458rem] object-cover relative xsm:h-[11.22047rem]"
          />
          <div className="py-[1.25rem] pl-[1.25rem] pr-[1.45833rem] bg-[#F0F0F0] flex flex-col gap-[0.39333rem] xsm:py-[0.52083rem] xsm:px-[0.625rem]">
            <h3 className="text-[#090909] font-open-sans text-[1.25rem] font-semibold leading-[150%] xsm:text-[0.72917rem]">
              {director.name}
            </h3>
            <div className="flex items-center gap-[0.39333rem] xsm:gap-[0.19302rem]">
              <Image
                src='/leadership/icon-user.webp'
                alt="user"
                width={20}
                height={20}
                className="size-[1.04896rem] xsm:size-[0.625rem]"
              />
              <span className="text-[rgba(9,9,9,0.60)] font-open-sans text-[0.9375rem] leading-[150%] xsm:text-[0.625rem]">
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
  const getAboutUsHref = (locale: string) => locale === 'en' ? '/about-us' : '/ve-chung-toi'

  return (
    <>
      <div className="max-w-[74.6875rem] mx-auto flex flex-col gap-[5rem] py-[4.16667rem] xsm:gap-[1.66667rem] xsm:px-[0.83333rem] xsm:pb-0 xsm:pt-[1.66667rem]">
        {sections.map((section) => (
          <BoardSection key={section.title} title={section.title} directors={section.directors} />
        ))}
      </div>

      {/* Pagination */}
      <SectionPagination
        prev={{ href: '', label: 'Trang B' }}
        center={{ href: getAboutUsHref(locale), label: 'Về chúng tôi' }}
        next={{ href: '', label: 'Trang A' }}
      />
    </>
  )
}
