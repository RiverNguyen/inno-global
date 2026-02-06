'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

import ICChevronDown from '@/components/icons/ICChevronDown'
import { Link } from '@/i18n/navigation'
import { Project } from '@/interfaces/project.interface'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  wrapperClassname?: string
  classNameThumbnail?: string
  classNameTitle?: string
}

export default function ProjectCard({
  project,
  wrapperClassname,
  classNameThumbnail,
  classNameTitle,
}: ProjectCardProps) {
  const t = useTranslations('ProjectListPage')

  return (
    <Link
      href={`/danh-sach-du-an/${project.slug}`}
      className={cn('group relative overflow-hidden', wrapperClassname)}
    >
      <div
        className={cn(
          'xsm:h-[11.30984rem] xsm:rounded-[0.1576rem] relative flex h-[15.15625rem] w-full items-center justify-center overflow-hidden rounded-[0.20833rem]',
          classNameThumbnail,
        )}
      >
        <Image
          src={project.featured_image.url}
          alt={project.title}
          width={460}
          height={291}
          className='z-1 size-full object-cover transition-all duration-500 ease-[cubic-bezier(0.44,0,0,0.99)] lg:group-hover:scale-120'
        />
      </div>
      <div className='pt-[0.72917rem]'>
        <div className='mb-[0.3125rem] flex items-center justify-between'>
          <h3
            className={cn(
              'font-open-sans line-clamp-1 max-w-[16rem] text-[0.9375rem] leading-[150%] font-semibold text-[#090909]',
              classNameTitle,
            )}
          >
            {project?.title}
          </h3>
          <div className='font-open-sans xsm:hidden inline-flex items-center space-x-[0.20833rem] text-[0.72917rem] leading-[150%] font-normal text-[#D32F2F] transition-all duration-500 ease-[cubic-bezier(0.44,0,0,0.99)] lg:opacity-0 lg:group-hover:opacity-100'>
            <span className='[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>{t('seeDetail')}</span>
            <ICChevronDown className='size-[0.72917rem] shrink-0 -rotate-90' />
          </div>
        </div>
        <div className='flex flex-col space-y-[0.46875rem]'>
          <div className='font-open-sans flex items-center space-x-[0.3125rem] text-[0.72917rem] leading-[150%] text-[rgba(9,9,9,0.6)]'>
            <Image
              src='/projects/d-brifecase-tick.png'
              alt=''
              width={16}
              height={16}
              className='size-[0.83333rem] shrink-0 object-cover'
            />
            <span className='whitespace-nowrap [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>
              {t('investor')}:
            </span>
            <span className='line-clamp-1 max-w-full'>{project?.taxonomies?.investor?.[0]?.name || '-'}</span>
          </div>
          <div className='font-open-sans flex items-center space-x-[0.3125rem] text-[0.72917rem] leading-[150%] text-[rgba(9,9,9,0.6)]'>
            <Image
              src='/projects/d-location.png'
              alt=''
              width={16}
              height={16}
              className='size-[0.83333rem] shrink-0 object-cover'
            />
            <span className='[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>{t('location')}:</span>
            <span className='[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>
              {project?.taxonomies?.location?.[0]?.name || '-'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
