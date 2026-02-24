'use client'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { IProjectDetail } from '@/interfaces/project.interface'
import { cn, convertRemToPx } from '@/lib/utils'
import Banner from '@/modules/project-detail-page/_components/banner'
import Content from '@/modules/project-detail-page/_components/content'
import Overview from '@/modules/project-detail-page/_components/overview'
import RelatedProjects from '@/modules/project-detail-page/_components/related-projects'

const ProjectDetail = ({ res, relatedProjects }: { res: IProjectDetail; relatedProjects: IProjectDetail[] }) => {
  const location = res?.taxonomies?.location[0]?.name || ''
  const gallery = res?.acf?.project_gallery || []
  const [currentTab, setCurrentTab] = useState<'info' | 'related'>('info')

  const t = useTranslations('DetailProjectPage')

  const handleScrollTo = (id: 'info' | 'related') => {
    const el = document.getElementById(id)
    if (!el) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
      return
    }

    const headerHeight = document.querySelector('header')?.clientHeight || 0

    const offset = headerHeight + (convertRemToPx(2.25) || 36)

    const y = el.getBoundingClientRect().top + window.scrollY - offset

    window.scrollTo({
      top: y,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const relatedSection = document.querySelector('#related') as HTMLElement

    const headerHeight = document.querySelector('header')?.clientHeight || 0

    const offset = headerHeight + (convertRemToPx(2.25) || 36)

    if (!relatedSection) return

    const handleScroll = () => {
      const relatedTop = Math.floor(relatedSection.getBoundingClientRect().top + window.scrollY - offset)

      if (window.scrollY >= relatedTop) {
        setCurrentTab('related')
      } else {
        setCurrentTab('info')
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <div
        id='tab-bar'
        className='sticky top-0 sm:hidden w-full shadow-[0_4px_30px_0_rgba(0,0,0,0.08)] z-[50]'
      >
        <div
          className='flex items-center overflow-x-auto space-x-[0.20833rem] bg-white px-[0.83333rem]'
          style={{
            scrollbarWidth: 'none',
          }}
        >
          <button
            type='button'
            onClick={() => handleScrollTo('info')}
            className={cn(
              'font-open-sans text-[0.72917rem] leading-[150%] text-[#090909] text-edge-cap text-trim-both p-[0.8917rem_0.52083rem_0.625rem_0.52083rem] flex items-center justify-center border-b-2 border-b-transparent cursor-pointer transition ease-out duration-300',
              currentTab === 'info' && 'border-b-[#D32F2F]',
            )}
          >
            {t('info')}
          </button>
          <button
            type='button'
            onClick={() => handleScrollTo('related')}
            className={cn(
              'font-open-sans text-[0.72917rem] leading-[150%] text-[#090909] text-edge-cap text-trim-both p-[0.8917rem_0.52083rem_0.625rem_0.52083rem] flex items-center justify-center border-b-2 border-b-transparent cursor-pointer transition ease-out duration-300',
              currentTab === 'related' && 'border-b-[#D32F2F]',
            )}
          >
            {t('related')}
          </button>
        </div>
      </div>
      <Banner
        title={res?.title}
        location={location}
        gallery={gallery}
      />
      <Overview overview={res?.acf?.project_overview} />
      <Content content={res?.content} />
      <RelatedProjects data={relatedProjects} />
    </>
  )
}

export default ProjectDetail
