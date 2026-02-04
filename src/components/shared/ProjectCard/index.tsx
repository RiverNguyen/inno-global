'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

import ICChevronDown from '@/components/icons/ICChevronDown'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

interface IProject {
  image: string
  title: string
  investor: string
  location: string
  link: string
}

interface IProjectCard {
  project: IProject
  wrapperClassname?: string
}

export default function ProjectCard({ project, wrapperClassname }: IProjectCard) {
  const t = useTranslations('ProjectListPage')

  return (
    <Link
      href={project.link}
      className={cn('relative overflow-hidden group', wrapperClassname)}
    >
      <div className='relative flex items-center justify-center w-full h-[15.15625rem] rounded-[0.20833rem] xsm:h-[11.30984rem] xsm:rounded-[0.1576rem] overflow-hidden'>
        <Image
          src={project.image}
          alt={project.title}
          width={460}
          height={291}
          className='size-full object-cover z-1 transition-all duration-500 ease-[cubic-bezier(0.44,0,0,0.99)] lg:group-hover:scale-120'
        />
      </div>
      <div className='pt-[0.72917rem]'>
        <div className='flex items-center justify-between mb-[0.3125rem]'>
          <h3 className='font-open-sans text-[0.9375rem] font-semibold leading-[150%] text-[#090909]'>
            {project?.title}
          </h3>
          <div className='lg:opacity-0 inline-flex items-center space-x-[0.20833rem] font-open-sans text-[0.72917rem] font-normal leading-[150%] text-[#D32F2F] transition-all duration-500 ease-[cubic-bezier(0.44,0,0,0.99)] lg:group-hover:opacity-100 xsm:hidden'>
            <span className='[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>
              Xem chi tiết
            </span>
            <ICChevronDown className='size-[0.72917rem] shrink-0 -rotate-90' />
          </div>
        </div>
        <div className='flex flex-col space-y-[0.46875rem]'>
          <div className='flex items-center space-x-[0.3125rem] font-open-sans text-[0.72917rem] leading-[150%] text-[rgba(9,9,9,0.6)]'>
            <Image
              src='/projects/d-brifecase-tick.png'
              alt=''
              width={16}
              height={16}
              className='size-[0.83333rem] shrink-0 object-cover'
            />
            <span className='[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>
              {t('investor')}:
            </span>
            <span className='[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>
              {project?.investor}
            </span>
          </div>
          <div className='flex items-center space-x-[0.3125rem] font-open-sans text-[0.72917rem] leading-[150%] text-[rgba(9,9,9,0.6)]'>
            <Image
              src='/projects/d-location.png'
              alt=''
              width={16}
              height={16}
              className='size-[0.83333rem] shrink-0 object-cover'
            />
            <span className='[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>
              {t('location')}:
            </span>
            <span className='[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>
              {project?.location}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
