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
      <div className='xsm:max-w-full mx-auto max-w-[75rem] bg-white'>
        <Breadcrumb className='xsm:hidden pt-[2.34375rem]'>
          <BreadcrumbItem className='gap-[0.52083rem]'>
            <BreadcrumbLink
              href='/'
              className='font-open-sans text-[0.72917rem] leading-[150%] font-normal text-[rgba(9,9,9,0.4)] transition-all duration-300 ease-out [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] lg:hover:text-[rgba(9,9,9,0.6)]'
            >
              {t('breadcrumbHome')}
            </BreadcrumbLink>
            <ICChevronRight className='size-[0.83333rem] shrink-0' />
            <BreadcrumbPage className='font-open-sans text-[0.72917rem] leading-[150%] font-semibold text-[rgba(9,9,9,0.6)]'>
              {t('breadcrumbProject')}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </Breadcrumb>
        <h1 className='xsm:px-[0.83333rem] font-open-sans xsm:text-[1.35417rem] xsm:leading-[120%] xsm:text-[#090909] xsm:tracking-normal xsm:pt-[1.66667rem] xsm:mb-0 mb-[0.41667rem] pt-[3.125rem] text-[2.8125rem] leading-[120%] font-semibold tracking-[-0.02813rem] text-[rbga(9,9,9,0.8)]'>
          Danh sách dự án
        </h1>
      </div>
      <div className='xsm:pt-[1.25rem] xsm:pb-[0.83rem] sticky top-0 z-5 w-full bg-white py-5'>
        <div className='xsm:max-w-full xsm:flex-col mx-auto flex max-w-[75rem] items-center justify-between'>
          <div
            className='xsm:w-full xsm:order-2 xsm:px-[0.83333rem] xsm:overflow-x-auto xsm:space-x-[0.3125rem] flex items-center space-x-[0.72917rem]'
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
          <div className='xsm:w-full xsm:space-x-[0.41667rem] xsm:px-[0.83333rem] xsm:mb-[0.72917rem] flex items-center space-x-[0.9375rem]'>
            <div className='xsm:w-auto xsm:grow relative w-[16.61458rem] overflow-hidden'>
              <input
                type='text'
                placeholder={t('placeholderSearch')}
                className='font-open-sans xsm:h-[2.08333rem] xsm:p-[0.83333rem] xsm:text-[0.625rem] xsm:pr-[calc(0.83333rem+0.83333rem+0.83333rem)] w-full rounded-[6.25rem] border-none bg-[#F0F0F0] py-[0.83333rem] pr-[calc(0.83333rem+1.14583rem+1.14583rem)] pl-[1.14583rem] text-[0.72917rem] leading-[150%] font-normal text-[rgba(9,9,9,0.6)] focus:ring-0'
              />
              <div className='xsm:right-[0.83333rem] absolute top-1/2 right-[1.14583rem] -translate-y-1/2'>
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
      <div className='xsm:pt-[1.66667rem] xsm:pb-[3.33333rem] bg-[#F8F8F8] pt-[2.29rem] pb-[7.29167rem]'>
        <div className='xsm:max-w-full mx-auto max-w-[75rem]'>
          <div
            className='xsm:px-[0.83333rem] xsm:w-full xsm:space-x-[1.5625rem] flex items-center space-x-[1.77083rem] overflow-x-auto'
            style={{
              scrollbarWidth: 'none',
            }}
          >
            <div className='flex items-center space-x-[0.41667rem]'>
              <span className='font-open-sans xsm:text-[0.72917rem] xsm:leading-[150%] text-[0.83333rem] leading-normal font-semibold whitespace-nowrap text-[#090909] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>
                Loại hình:
              </span>
              <div className='flex items-center space-x-[1.04167rem] bg-[#F0F0F0] p-[0.46875rem_0.52083rem]'>
                <div className='font-open-sans flex items-center space-x-[0.36458rem] text-[0.72917rem] leading-[150%] font-normal text-[#090909]'>
                  <span className='inline-block whitespace-nowrap [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>
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
                <div className='font-open-sans flex items-center space-x-[0.36458rem] text-[0.72917rem] leading-[150%] font-normal text-[#090909]'>
                  <span className='inline-block whitespace-nowrap [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>
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
              <span className='font-open-sans xsm:text-[0.72917rem] xsm:leading-[150%] text-[0.83333rem] leading-normal font-semibold whitespace-nowrap text-[#090909] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>
                Dịch vụ tham gia:
              </span>
              <div className='flex items-center space-x-[1.04167rem] bg-[#F0F0F0] p-[0.46875rem_0.52083rem]'>
                <div className='font-open-sans flex items-center space-x-[0.36458rem] text-[0.72917rem] leading-[150%] font-normal text-[#090909]'>
                  <span className='inline-block whitespace-nowrap [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>
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
                <div className='font-open-sans flex items-center space-x-[0.36458rem] text-[0.72917rem] leading-[150%] font-normal text-[#090909]'>
                  <span className='inline-block whitespace-nowrap [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>
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
            className='xsm:grid-cols-1 xsm:px-[0.83333rem] xsm:pt-[1.66667rem] xsm:gap-y-[1.04167rem] grid grid-cols-3 gap-x-[1.5625rem] gap-y-[2.08333rem] pt-[2.08333rem]'
          >
            {projects?.map((project, i) => (
              <ProjectCard
                key={i}
                project={project}
              />
            ))}
          </div>
          {/* Loading */}
          <div className='xsm:pt-[1.04167rem] pt-[3.75rem]'>
            <span></span>
          </div>
        </div>
      </div>
    </>
  )
}
