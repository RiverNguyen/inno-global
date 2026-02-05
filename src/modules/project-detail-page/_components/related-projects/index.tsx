'use client'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import ProjectCard from '@/components/shared/ProjectCard'
import { Link } from '@/i18n/navigation'
import { convertRemToPx } from '@/lib/utils'
import 'swiper/css'
import 'swiper/css/navigation'

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

const RelatedProjects = () => {
  return (
    <section className='xsm:pt-[1.66667rem] xsm:pb-[3.33333rem] py-[5.20833rem]'>
      <div className='flex-y-center mx-auto max-w-[75rem] justify-between'>
        <h2 className='xsm:px-[0.8275rem] xsm:text-[1.25rem] xsm:font-semibold text-[2.8125rem] leading-[1.2] font-semibold tracking-[-0.02813rem] text-[#090909]'>
          Dự án liên quan
        </h2>
        <Link
          href='/'
          className='flex-center group xsm:hidden relative h-[2.6rem] w-fit overflow-hidden rounded-[5.20833rem] px-[1.15rem] text-[0.73rem] leading-[1.5] text-[#090909]/60 outline outline-[#090909]/60 transition-all duration-300 hover:text-white hover:outline-none'
        >
          <span className='absolute inset-0 rounded-[inherit] bg-[radial-gradient(298.39%_130.99%_at_6.62%_16.15%,_#CA2A2A_15.19%,_#D32F2F_53.77%,_#FF6E6E_100%)] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100' />
          <span className='flex-center relative z-10'>
            Xem tất cả
            <ChevronRightIcon className='ml-1.25 size-[0.83333rem] translate-y-[0.0375rem] text-[#090909]/60 transition-all duration-300 group-hover:translate-x-[0.5rem] group-hover:text-white' />
          </span>
        </Link>
      </div>
      <div className='xsm:hidden relative'>
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: '.related-projects-next',
            prevEl: '.related-projects-prev',
            disabledClass: 'opacity-0 pointer-events-none',
          }}
          grabCursor={true}
          className='mt-[1.67rem] h-[19.75rem] w-[75rem]!'
          slidesPerView={3}
          speed={600}
          spaceBetween={convertRemToPx(1.5625) || 25}
        >
          {projects.map((project, index) => (
            <SwiperSlide
              key={index}
              className='h-full w-full'
            >
              <ProjectCard project={project} />
            </SwiperSlide>
          ))}
        </Swiper>

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

      <div className='hidden_scroll mt-[1.04167rem] flex space-x-[0.83333rem] overflow-x-auto px-[0.8275rem] sm:hidden'>
        {Array.from({ length: 10 }).map((_, index) => (
          <Image
            key={index}
            width={200}
            height={300}
            src={`https://picsum.photos/id/${index}/200/300`}
            alt='Project'
            className='h-[14.83rem] w-[16.2rem] shrink-0 object-cover'
          />
        ))}
      </div>
      <div className='px-[0.8275rem] sm:hidden'>
        <Link
          href='/'
          className='flex-center mx-auto mt-[1.66667rem] h-[2.5rem] w-full rounded-[5.2rem] border border-[#090909]/60 shadow-[0_0_2px_0_rgba(0,0,0,0.10),_0_1px_8px_0_rgba(0,0,0,0.10)] backdrop-blur-[6px]'
        >
          <span className='flex-center text-[0.73rem] leading-[1.5] text-[#090909]/60'>
            Xem tất cả
            <ChevronRightIcon className='ml-1.5 size-[0.83333rem] text-[#090909]/60' />
          </span>
        </Link>
      </div>
    </section>
  )
}

export default RelatedProjects
