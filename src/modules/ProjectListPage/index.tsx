'use client'
import { useTranslations } from 'next-intl'

import ICChevronRight from '@/components/icons/ICChevronRight'
import ICClose from '@/components/icons/ICClose'
import ICSearch from '@/components/icons/ICSearch'
import ProjectCard from '@/components/shared/ProjectCard'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'

import FilterPopup from './components/FilterPopup'
import SortPopup from './components/SortPopup'

const projects = [
  {
    image: '/projects/project-1.webp',
    title: 'Tòa nhà Landmark 81',
    investor: 'FPT',
    location: 'Quảng Ninh',
    link: '#',
  },
  {
    image: '/projects/project-1.webp',
    title: 'Tòa nhà Landmark 81',
    investor: 'FPT',
    location: 'Quảng Ninh',
    link: '#',
  },
  {
    image: '/projects/project-2.webp',
    title: 'Tòa nhà Landmark 81',
    investor: 'FPT',
    location: 'Quảng Ninh',
    link: '#',
  },
  {
    image: '/projects/project-3.webp',
    title: 'Tòa nhà Landmark 81',
    investor: 'FPT',
    location: 'Quảng Ninh',
    link: '#',
  },
  {
    image: '/projects/project-4.webp',
    title: 'Tòa nhà Landmark 81',
    investor: 'FPT',
    location: 'Quảng Ninh',
    link: '#',
  },
  {
    image: '/projects/project-5.webp',
    title: 'Tòa nhà Landmark 81',
    investor: 'FPT',
    location: 'Quảng Ninh',
    link: '#',
  },
  {
    image: '/projects/project-1.webp',
    title: 'Tòa nhà Landmark 81',
    investor: 'FPT',
    location: 'Quảng Ninh',
    link: '#',
  },
  {
    image: '/projects/project-1.webp',
    title: 'Tòa nhà Landmark 81',
    investor: 'FPT',
    location: 'Quảng Ninh',
    link: '#',
  },
  {
    image: '/projects/project-2.webp',
    title: 'Tòa nhà Landmark 81',
    investor: 'FPT',
    location: 'Quảng Ninh',
    link: '#',
  },
  {
    image: '/projects/project-3.webp',
    title: 'Tòa nhà Landmark 81',
    investor: 'FPT',
    location: 'Quảng Ninh',
    link: '#',
  },
  {
    image: '/projects/project-4.webp',
    title: 'Tòa nhà Landmark 81',
    investor: 'FPT',
    location: 'Quảng Ninh',
    link: '#',
  },
  {
    image: '/projects/project-5.webp',
    title: 'Tòa nhà Landmark 81',
    investor: 'FPT',
    location: 'Quảng Ninh',
    link: '#',
  },
]

export default function ProjectListPage() {
  const t = useTranslations('ProjectListPage')

  return (
    <>
      <div className='max-w-[75rem] mx-auto xsm:max-w-full bg-white'>
        <Breadcrumb className='pt-[2.34375rem] xsm:hidden'>
          <BreadcrumbItem className='gap-[0.52083rem]'>
            <BreadcrumbLink
              href='/'
              className='font-open-sans text-[0.72917rem] font-normal leading-[150%] text-[rgba(9,9,9,0.4)] lg:hover:text-[rgba(9,9,9,0.6)] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] transition-all duration-300 ease-out'
            >
              {t('breadcrumbHome')}
            </BreadcrumbLink>
            <ICChevronRight className='size-[0.83333rem] shrink-0' />
            <BreadcrumbPage className='font-open-sans text-[rgba(9,9,9,0.6)] text-[0.72917rem] font-semibold leading-[150%]'>
              {t('breadcrumbProject')}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </Breadcrumb>
        <h1 className='xsm:px-[0.83333rem] font-open-sans text-[2.8125rem] font-semibold leading-[120%] tracking-[-0.02813rem] text-[rbga(9,9,9,0.8)] pt-[3.125rem] mb-[0.41667rem] xsm:text-[1.35417rem] xsm:leading-[120%] xsm:text-[#090909] xsm:tracking-normal xsm:pt-[1.66667rem] xsm:mb-0'>
          Danh sách dự án
        </h1>
      </div>
      <div className='bg-white sticky top-0 z-5 py-5 w-full xsm:pt-[1.25rem] xsm:pb-[0.83rem] '>
        <div className='max-w-[75rem] mx-auto xsm:max-w-full flex items-center justify-between xsm:flex-col'>
          <div
            className='xsm:w-full flex items-center space-x-[0.72917rem] xsm:order-2 xsm:px-[0.83333rem] xsm:overflow-x-auto xsm:space-x-[0.3125rem]'
            style={{
              scrollbarWidth: 'none',
            }}
          >
            <FilterPopup
              label='Loại hình'
              keySp='type'
              items={[
                {
                  label: 'Demo nội dung',
                  value: 'demo noi dung',
                },
                {
                  label: 'Demo nội dung 2',
                  value: 'demo noi dung 2',
                },
              ]}
              onChange={() => {}}
            />
            <FilterPopup
              label='Dịch vụ tham gia'
              keySp='service'
              items={[
                {
                  label: 'Demo nội dung',
                  value: 'demo noi dung',
                },
                {
                  label: 'Demo nội dung 2',
                  value: 'demo noi dung 2',
                },
              ]}
              onChange={() => {}}
            />
            <FilterPopup
              label='Địa điểm'
              keySp='location'
              items={[
                {
                  label: 'Demo nội dung',
                  value: 'demo noi dung',
                },
                {
                  label: 'Demo nội dung 2',
                  value: 'demo noi dung 2',
                },
              ]}
              onChange={() => {}}
            />
            <FilterPopup
              label='Năm'
              keySp='year'
              items={[
                {
                  label: 'Demo nội dung',
                  value: 'demo noi dung',
                },
                {
                  label: 'Demo nội dung 2',
                  value: 'demo noi dung 2',
                },
              ]}
              onChange={() => {}}
            />
          </div>
          <div className='xsm:w-full flex items-center space-x-[0.9375rem] xsm:space-x-[0.41667rem] xsm:px-[0.83333rem] xsm:mb-[0.72917rem]'>
            <div className='relative overflow-hidden w-[16.61458rem] xsm:w-auto xsm:grow'>
              <input
                type='text'
                placeholder={t('placeholderSearch')}
                className='font-open-sans text-[0.72917rem] font-normal leading-[150%] text-[rgba(9,9,9,0.6)] w-full pl-[1.14583rem] py-[0.83333rem] pr-[calc(0.83333rem+1.14583rem+1.14583rem)] rounded-[6.25rem] bg-[#F0F0F0] border-none focus:ring-0 xsm:h-[2.08333rem] xsm:p-[0.83333rem] xsm:text-[0.625rem] xsm:pr-[calc(0.83333rem+0.83333rem+0.83333rem)]'
              />
              <div className='absolute top-1/2 right-[1.14583rem] xsm:right-[0.83333rem] -translate-y-1/2'>
                <ICSearch className='size-[0.83333rem]' />
              </div>
            </div>
            <SortPopup
              label={t('sortPopup')}
              keySp='sort'
              items={[
                {
                  label: 'Mới nhất đến cũ nhất',
                  value: 'newest',
                },
                {
                  label: 'Cũ nhất đến mới nhất',
                  value: 'oldest',
                },
              ]}
              onChange={() => {}}
            />
          </div>
        </div>
      </div>
      <div className=' bg-[#F8F8F8] pt-[2.29rem] pb-[7.29167rem] xsm:pt-[1.66667rem] xsm:pb-[3.33333rem]'>
        <div className='max-w-[75rem] mx-auto xsm:max-w-full'>
          <div
            className='flex items-center space-x-[1.77083rem] xsm:px-[0.83333rem] xsm:w-full overflow-x-auto xsm:space-x-[1.5625rem]'
            style={{
              scrollbarWidth: 'none',
            }}
          >
            <div className='flex items-center space-x-[0.41667rem]'>
              <span className='whitespace-nowrap font-open-sans text-[0.83333rem] font-semibold leading-normal text-[#090909] xsm:text-[0.72917rem] xsm:leading-[150%] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>
                Loại hình:
              </span>
              <div className='flex items-center space-x-[1.04167rem] bg-[#F0F0F0] p-[0.46875rem_0.52083rem]'>
                <div className='flex items-center space-x-[0.36458rem] font-open-sans text-[0.72917rem] font-normal leading-[150%] text-[#090909]'>
                  <span className='inline-block [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] whitespace-nowrap'>
                    Demo 1
                  </span>
                  <button
                    type='button'
                    className='shrink-0 cursor-pointer'
                  >
                    <ICClose className='size-[0.83333rem]' />
                  </button>
                </div>
                <div className='h-[0.83333rem] w-[0.05208rem] shrink-0 bg-[rgba(9,9,9,0.08)]'></div>
                <div className='flex items-center space-x-[0.36458rem] font-open-sans text-[0.72917rem] font-normal leading-[150%] text-[#090909]'>
                  <span className='inline-block [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] whitespace-nowrap'>
                    Demo 1
                  </span>
                  <button
                    type='button'
                    className='shrink-0 cursor-pointer'
                  >
                    <ICClose className='size-[0.83333rem]' />
                  </button>
                </div>
              </div>
            </div>
            <div className='flex items-center space-x-[0.41667rem]'>
              <span className='whitespace-nowrap font-open-sans text-[0.83333rem] font-semibold leading-normal text-[#090909] xsm:text-[0.72917rem] xsm:leading-[150%] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>
                Dịch vụ tham gia:
              </span>
              <div className='flex items-center space-x-[1.04167rem] bg-[#F0F0F0] p-[0.46875rem_0.52083rem]'>
                <div className='flex items-center space-x-[0.36458rem] font-open-sans text-[0.72917rem] font-normal leading-[150%] text-[#090909]'>
                  <span className='inline-block [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] whitespace-nowrap'>
                    Demo 1
                  </span>
                  <button
                    type='button'
                    className='shrink-0 cursor-pointer'
                  >
                    <ICClose className='size-[0.83333rem]' />
                  </button>
                </div>
                <div className='h-[0.83333rem] w-[0.05208rem] shrink-0 bg-[rgba(9,9,9,0.08)]'></div>
                <div className='flex items-center space-x-[0.36458rem] font-open-sans text-[0.72917rem] font-normal leading-[150%] text-[#090909]'>
                  <span className='inline-block [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] whitespace-nowrap'>
                    Demo 1
                  </span>
                  <button
                    type='button'
                    className='shrink-0 cursor-pointer'
                  >
                    <ICClose className='size-[0.83333rem]' />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            id='project-list'
            className='pt-[2.08333rem] grid grid-cols-3 gap-x-[1.5625rem] gap-y-[2.08333rem] xsm:grid-cols-1 xsm:px-[0.83333rem] xsm:pt-[1.66667rem] xsm:gap-y-[1.04167rem]'
          >
            {projects?.map((project, i) => (
              <ProjectCard
                key={i}
                project={project}
              />
            ))}
          </div>
          {/* Loading */}
          <div className='pt-[3.75rem] xsm:pt-[1.04167rem]'>
            <span></span>
          </div>
        </div>
      </div>
    </>
  )
}
