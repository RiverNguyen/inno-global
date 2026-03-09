'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import Breadcrumb from '@/components/shared/Breadcrumb'
import CardBlog from '@/components/shared/CardBlog'
import ProjectCard from '@/components/shared/ProjectCard'
import ServiceCard from '@/components/shared/ServiceCard'
import TrainingCard from '@/components/shared/TrainingCard'
import ROUTES from '@/configs/routes'
import useIsMobile from '@/hooks/useIsMobile'
import { IBlogRes } from '@/interfaces/blog.interface'
import { IProjectsRes } from '@/interfaces/project.interface'
import { IServiceRes } from '@/interfaces/service.interface'
import { ITrainingRes } from '@/interfaces/training.inteface'
import { cn } from '@/lib/utils'
import { scrollToSection } from '@/utils/scrollToSection'

import NoResult from './components/NoResult'

export default function SearchDetail({
  projectRes,
  serviceRes,
  blogRes,
  trainingRes,
}: {
  projectRes: IProjectsRes
  serviceRes: IServiceRes
  blogRes: IBlogRes
  trainingRes: ITrainingRes
}) {
  const t = useTranslations()
  const locale = useLocale()
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState('project')
  const { isMobile, isLoading } = useIsMobile()
  const [isSticky, setIsSticky] = useState(false)

  const tabs = [
    {
      label: t('SearchPage.project'),
      id: 'project',
    },
    {
      label: t('SearchPage.service'),
      id: 'service',
    },
    {
      label: t('SearchPage.blog'),
      id: 'blog',
    },
    {
      label: t('SearchPage.training'),
      id: 'training',
    },
  ]

  const handleScrollToSection = (id: string) => {
    const isFirstSection = id === 'project'
    const targetElement = document.getElementById(id)
    if (!targetElement) return

    const offsetPx = (isFirstSection ? 5.66667 : 4) * parseFloat(getComputedStyle(document.documentElement).fontSize)

    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offsetPx

    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

    if (isIOS) {
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      })
      return
    }

    scrollToSection(id, 0.6, isMobile && !isLoading ? (isFirstSection ? 5.66667 : 4) : isFirstSection ? 7.29 : 5)
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('#search-result > section')

      let current = ''

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()

        if (rect.top <= window.innerHeight * 0.4) {
          current = section.id
        }
      })

      if (current) setActiveTab(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sentinel = sentinelRef.current

    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Nếu sentinel không còn trong viewport
        setIsSticky(!entry.isIntersecting)
      },
      {
        root: null,
        threshold: 0,
      },
    )

    observer.observe(sentinel)

    return () => {
      observer.disconnect()
    }
  }, [])

  if (
    projectRes.data &&
    projectRes.data.length === 0 &&
    serviceRes.data &&
    serviceRes.data.length === 0 &&
    blogRes.data &&
    blogRes.data.length === 0 &&
    trainingRes.data &&
    trainingRes.data.length === 0
  ) {
    return (
      <div className='relative bg-white'>
        <Breadcrumb
          classNameContainer='pt-[2.34375rem] max-w-[75rem] mx-auto xsm:hidden'
          navItems={[
            {
              label: t('Breadcrumb.homePage'),
              href: '/',
            },
          ]}
          lastItem={{
            label: t('Breadcrumb.searchPage'),
          }}
        />
        <NoResult />
      </div>
    )
  }

  return (
    <>
      <div className='relative bg-white'>
        <Breadcrumb
          classNameContainer='pt-[2.34375rem] max-w-[75rem] mx-auto xsm:hidden'
          navItems={[
            {
              label: t('Breadcrumb.homePage'),
              href: locale === 'vi' ? ROUTES.homeVi : ROUTES.homeEn,
            },
          ]}
          lastItem={{
            label: t('Breadcrumb.searchPage'),
          }}
        />
        <h1 className='font-open-sans xsm:px-[0.83333rem] xsm:pt-[1.66667rem] xsm:pb-0 xsm:text-[1.35417rem] xsm:tracking-normal xsm:text-[#090909] container pt-[3.125rem] pb-[0.41667rem] pc-h2-54-s text-[rgba(9,9,9,0.8)]'>
          {t('SearchPage.result')}
        </h1>
      </div>
      <div ref={sentinelRef} />
      <div
        className={cn(
          'xsm:pb-[0.83333rem] sticky top-0 z-100 bg-white py-[1.25rem]',
          isSticky && 'xsm:shadow-[0_4px_30px_0_rgba(0,0,0,0.08)]',
        )}
      >
        <div className='xsm:px-[0.83333rem] xsm:overflow-x-auto container flex items-center space-x-[0.72917rem]'>
          {tabs.map((tab, i) => (
            <button
              type='button'
              key={i}
              onClick={() => handleScrollToSection(tab.id)}
              className={cn(
                'font-open-sans xsm:p-[0.52083rem_0.83333rem] xsm:h-auto xsm:text-[0.625rem] xsm:leading-[140%] xsm:tracking-[-0.00625rem] xsm:font-semibold relative flex h-10 cursor-pointer items-center justify-center space-x-[0.52083rem] overflow-hidden rounded-[5.20833rem] border border-[rgba(9,9,9,0.08)] p-[0.75rem_0.75rem] text-[0.72917rem] leading-[150%] font-normal whitespace-nowrap text-[#090909] before:absolute before:inset-0 before:bg-[radial-gradient(298.39%_130.99%_at_6.62%_16.15%,#CA2A2A_15.19%,#D32F2F_53.77%,#FF6E6E_100%)] before:opacity-0 before:transition-all before:duration-300 before:ease-out before:content-[""] lg:hover:text-white lg:hover:before:opacity-100',
                activeTab === tab.id && 'text-white before:opacity-100',
              )}
            >
              <span className='relative z-1 sm:[text-box-edge:cap_alphabetic] sm:[text-box-trim:trim-both]'>
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className='xsm:pt-[1.66667rem] xsm:pb-[2.91667rem] xsm:bg-white bg-[#F8F8F8] pt-[2.29rem] pb-[7.29rem]'>
        <div
          className='container'
          id='search-result'
        >
          <section id='project'>
            <h2 className='font-open-sans xsm:text-[1.25rem] xsm:tracking-normal xsm:mb-[1.04167rem] traking-[-0.03125rem] xsm:px-[0.83333rem] mb-[2.08333rem] pc-h3-40-s text-[#090909]'>
              {t('SearchPage.relatedProject')}
            </h2>
            {Array.isArray(projectRes.data) && projectRes.data.length > 0 && (
              <div
                className='xsm:flex xsm:gap-0 xsm:space-x-[0.83333rem] xsm:overflow-x-auto xsm:px-[0.83333rem] grid grid-cols-3 gap-x-[1.5625rem] gap-y-[2.08333rem]'
                style={{
                  scrollbarWidth: 'none',
                }}
              >
                {projectRes.data.map((project, i) => (
                  <ProjectCard
                    project={project}
                    wrapperClassname='xsm:w-[16.19792rem] xsm:shrink-0'
                    key={i}
                  />
                ))}
              </div>
            )}
            {Array.isArray(projectRes.data) && projectRes.data.length === 0 && (
              <div className='col-span-full flex items-center justify-center py-20'>
                <span className='text-[#090909]'>{t('ProjectListPage.noProjects') || 'No projects found'}</span>
              </div>
            )}
          </section>
          <section
            id='service'
            className='xsm:pt-[2.91667rem] pt-[4.69rem]'
          >
            <h2 className='font-open-sans xsm:text-[1.25rem] xsm:tracking-normal xsm:mb-[1.04167rem] traking-[-0.03125rem] xsm:px-[0.83333rem] mb-[2.08333rem] pc-h3-40-s text-[#090909]'>
              {t('SearchPage.relatedService')}
            </h2>
            {Array.isArray(serviceRes.data) && serviceRes.data.length > 0 && (
              <div className='xsm:px-[0.83333rem] xsm:gap-[0.3125rem] grid grid-cols-2 gap-x-[1.66667rem] gap-y-[2.08333rem]'>
                {serviceRes.data.map((service, i) => (
                  <ServiceCard
                    title={service.name}
                    description={service.description}
                    imageSrc={service.acf?.thumbnail || '/default.webp'}
                    href={
                      locale === 'vi'
                        ? `${ROUTES.servicesVi}/${service?.slug}`
                        : `${ROUTES.servicesEn}/${service?.slug}`
                    }
                    key={i}
                  />
                ))}
              </div>
            )}
            {Array.isArray(serviceRes.data) && serviceRes.data.length === 0 && (
              <div className='col-span-full flex items-center justify-center py-20'>
                <span className='text-[#090909]'>{t('ServiceListPage.noServices') || 'No services found'}</span>
              </div>
            )}
          </section>
          <section
            id='blog'
            className='xsm:pt-[2.91667rem] pt-[4.69rem]'
          >
            <h2 className='font-open-sans xsm:text-[1.25rem] xsm:tracking-normal xsm:mb-[1.04167rem] traking-[-0.03125rem] xsm:px-[0.83333rem] mb-[2.08333rem] pc-h3-40-s text-[#090909]'>
              {t('SearchPage.relatedBlog')}
            </h2>
            {Array.isArray(blogRes.data) && blogRes.data.length > 0 && (
              <div
                className='xsm:flex xsm:gap-0 xsm:space-x-[0.83333rem] xsm:overflow-x-auto xsm:px-[0.83333rem] grid grid-cols-3 gap-x-[1.5625rem] gap-y-[2.08333rem]'
                style={{
                  scrollbarWidth: 'none',
                }}
              >
                {blogRes.data.map((blog, i) => (
                  <Link
                    key={i}
                    href={locale === 'vi' ? `${ROUTES.blogsVi}/${blog.slug}` : `${ROUTES.blogsEn}/${blog.slug}`}
                  >
                    <CardBlog
                      title={blog.title || ''}
                      category={blog.taxonomies?.category?.[0]?.name || ''}
                      date={blog.date || ''}
                      thumbnail={blog.featured_image || { url: '', alt: '' }}
                      classNameCard='xsm:w-[15.625rem] xsm:flex-col xsm:gap-[1.04167rem] xsm:items-start'
                      classNameThumbnail='xsm:h-[11.30208rem] xsm:w-full'
                      classNameTitle='xsm:text-[0.83333rem] xsm:font-semibold'
                      classNameCategory='xsm:text-[0.52083rem] xsm:tracking-normal'
                      classNameDate='xsm:text-[0.52083rem] xsm:tracking-normal'
                      classNameMetaWrapper='xsm:space-y-[0.41667rem]'
                      classNameMetaRow='xsm:space-x-[0.41667rem]'
                    />
                  </Link>
                ))}
              </div>
            )}
            {Array.isArray(blogRes.data) && blogRes.data.length === 0 && (
              <div className='col-span-full flex items-center justify-center py-20'>
                <span className='text-[#090909]'>{t('BlogListPage.noBlogs') || 'No blogs found'}</span>
              </div>
            )}
          </section>
          <section
            id='training'
            className='xsm:pt-[2.91667rem] pt-[4.69rem]'
          >
            <h2 className='font-open-sans xsm:text-[1.25rem] xsm:tracking-normal xsm:mb-[1.04167rem] traking-[-0.03125rem] xsm:px-[0.83333rem] mb-[2.08333rem] pc-h3-40-s text-[#090909]'>
              {t('SearchPage.relatedTraining')}
            </h2>
            {Array.isArray(trainingRes.data) && trainingRes.data.length > 0 && (
              <div
                className='xsm:px-[0.83333rem] xsm:flex xsm:gap-0 xsm:space-x-[0.72917rem] xsm:overflow-x-auto grid grid-cols-3 gap-x-[1.5625rem] gap-y-[2.08333rem]'
                style={{
                  scrollbarWidth: 'none',
                }}
              >
                {trainingRes.data.map((training, i) => (
                  <TrainingCard
                    training={training}
                    wrapperClassname='xsm:w-[15.625rem] xsm:shrink-0 xsm:border-b-0 xsm:bg-[#F6F6F6] xsm:pb-0 xsm:last:pb-0'
                    classNameContent='p-[0.83333rem] xsm:pt-[0.625rem] '
                    key={i}
                  />
                ))}
              </div>
            )}
            {Array.isArray(trainingRes.data) && trainingRes.data.length === 0 && (
              <div className='col-span-full flex items-center justify-center py-20'>
                <span className='text-[#090909]'>{t('TrainingListPage.noTrainings') || 'No trainings found'}</span>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  )
}
