'use client'

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import ProjectCard from '@/components/shared/ProjectCard'
import ROUTES from '@/configs/routes'
import useIsMobile from '@/hooks/useIsMobile'
import { Link } from '@/i18n/navigation'
import { IProjectDetail } from '@/interfaces/project.interface'
import { convertRemToPx } from '@/lib/utils'
import 'swiper/css'
import 'swiper/css/navigation'

const RelatedProjects = ({ data }: { data: IProjectDetail[] }) => {
  const t = useTranslations('DetailProjectPage')
  const params = useParams<{ slug: string }>()
  const locale = useLocale()
  const { isMobile, isLoading } = useIsMobile()

  const viewAllUrl = locale === 'vi' ? ROUTES.projectsVi : ROUTES.projectsEn

  return (
    <section
      id='related'
      className='xsm:pt-[1.66667rem] xsm:pb-[3.33333rem] py-[5.20833rem]'
    >
      <div className='flex-y-center mx-auto max-w-[75rem] justify-between'>
        <h2 className='xsm:px-[0.8275rem] xsm:mb-h2-24-sm pc-h2-54-s text-[#090909]'>{t('related')}</h2>
        <Link
          href={viewAllUrl}
          className='flex-center group xsm:hidden relative h-[2.6rem] w-fit overflow-hidden rounded-[5.20833rem] px-[1.15rem] text-[0.73rem] leading-[1.5] text-[#090909]/60 outline outline-[#090909]/60 transition-all duration-300 hover:text-white hover:outline-none'
        >
          <span className='absolute inset-0 rounded-[inherit] bg-[radial-gradient(298.39%_130.99%_at_6.62%_16.15%,_#CA2A2A_15.19%,_#D32F2F_53.77%,_#FF6E6E_100%)] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100' />
          <span className='flex-center relative z-10'>
            {t('viewAll')}
            <ChevronRightIcon className='ml-1.25 size-[0.83333rem] translate-y-[0.0375rem] text-[#090909]/60 transition-all duration-300 group-hover:translate-x-[0.5rem] group-hover:text-white' />
          </span>
        </Link>
      </div>
      <div className='xsm:hidden relative'>
        {!isMobile && !isLoading && (
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: '.related-projects-next',
              prevEl: '.related-projects-prev',
              disabledClass: 'opacity-0 pointer-events-none',
            }}
            grabCursor={true}
            className='mt-[1.67rem] w-[75rem]!'
            slidesPerView={3}
            speed={600}
            spaceBetween={convertRemToPx(1.5625) || 25}
          >
            {Array.isArray(data) &&
              data
                .filter((project) => project.slug !== params.slug)
                .map((project, index) => (
                  <SwiperSlide
                    key={index}
                    className='h-full w-full'
                  >
                    <ProjectCard project={project} />
                  </SwiperSlide>
                ))}
          </Swiper>
        )}

        <div className='absolute-center pointer-events-none flex w-[83.33333rem] justify-between'>
          <button
            type='button'
            className='related-projects-prev flex-center group pointer-events-auto relative size-[2.083rem] cursor-pointer overflow-hidden rounded-full bg-[#F0F0F0] transition-all duration-300'
          >
            <span className='absolute inset-0 rounded-full bg-[radial-gradient(298.39%_130.99%_at_6.62%_16.15%,_#CA2A2A_15.19%,_#D32F2F_53.77%,_#FF6E6E_100%)] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100' />

            <ChevronLeftIcon className='relative z-10 size-[1.25rem] text-[#090909]/60 transition-all duration-300 group-hover:text-white' />
          </button>

          <button
            type='button'
            className='related-projects-next flex-center group pointer-events-auto relative size-[2.083rem] cursor-pointer overflow-hidden rounded-full bg-[#F0F0F0] transition-all duration-300'
          >
            <span className='absolute inset-0 rounded-full bg-[radial-gradient(298.39%_130.99%_at_6.62%_16.15%,_#CA2A2A_15.19%,_#D32F2F_53.77%,_#FF6E6E_100%)] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100' />

            <ChevronRightIcon className='relative z-10 size-[1.25rem] text-[#090909]/60 transition-all duration-300 group-hover:text-white' />
          </button>
        </div>
      </div>

      {isMobile && !isLoading && (
        <div className='hidden_scroll mt-[1.04167rem] flex space-x-[0.83333rem] overflow-x-auto px-[0.8275rem] sm:hidden'>
          {Array.isArray(data) &&
            data
              .filter((project) => project.slug !== params.slug)
              .map((project, index) => (
                <ProjectCard
                  project={project}
                  key={index}
                  wrapperClassname='shrink-0 w-[16.19792rem]'
                  classNameThumbnail='xsm:h-[10.175rem]'
                />
              ))}
        </div>
      )}

      <div className='px-[0.8275rem] sm:hidden'>
        <Link
          href={viewAllUrl}
          className='flex-center mx-auto mt-[1.66667rem] h-[2.5rem] w-full rounded-[5.2rem] border border-[#090909]/60 shadow-[0_0_2px_0_rgba(0,0,0,0.10),_0_1px_8px_0_rgba(0,0,0,0.10)] backdrop-blur-[6px]'
        >
          <span className='flex-center text-[0.73rem] leading-[1.5] text-[#090909]/60'>
            {t('viewAll')}
            <ChevronRightIcon className='ml-1.5 size-[0.83333rem] text-[#090909]/60' />
          </span>
        </Link>
      </div>
    </section>
  )
}

export default RelatedProjects
