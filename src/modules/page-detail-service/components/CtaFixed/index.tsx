'use client'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import { scrollToSection } from '@/utils/scrollToSection'

export default function CtaFixed() {
  const t = useTranslations('DetailServicePage')
  const [activeTarget, setActiveTarget] = useState<string | null>(null)

  const ctaItems = [
    { label: t('sectionRelatedProjects.title'), target: 'related-projects' },
    { label: t('sectionRelatedBlogs.title'), target: 'related-blogs' },
  ]

  const handleClickCtaItem = (e: React.MouseEvent<HTMLLIElement>) => {
    const el = e.currentTarget.closest('[data-section-trigger]')
    const sectionTrigger = el?.getAttribute('data-section-trigger')
    if (!sectionTrigger) return
    scrollToSection(sectionTrigger, 1, 2.5)
  }

  useEffect(() => {
    const sections = ctaItems
      .map((item) => document.getElementById(item.target))
      .filter(Boolean) as HTMLElement[]

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTarget(entry.target.id)
          }
        })
      },
      {
        root: null,
        // kích hoạt khi section đi qua vùng giữa màn hình
        rootMargin: '25% 0px -50% 0px',
        threshold: 0,
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='xsm:block sticky top-0 z-10 hidden bg-white px-[0.83333rem] pt-[1.875rem] shadow-[0_4px_30px_0_rgba(0,0,0,0.08)]'>
      <ul className='flex items-center space-x-[0.20833rem]'>
        {ctaItems.map((item, index) => (
          <li
            key={index}
            onClick={handleClickCtaItem}
            data-section-trigger={item.target}
            className={cn(
              'after:border-primary-red relative px-[0.52083rem] pt-[0.72917rem] pb-[0.625rem] after:absolute after:right-full after:bottom-0 after:left-0 after:border-b-[2px] after:border-solid after:transition-all after:duration-300 after:ease-out',
              item.target === activeTarget && 'after:right-0',
            )}
          >
            <p className='text-edge-[cap_alphabetic] text-trim-both text-primary text-[0.72917rem] leading-[1.5]'>
              {item.label}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
