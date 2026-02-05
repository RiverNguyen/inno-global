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
    <section className="py-[5.20833rem] xsm:pt-[1.66667rem] xsm:pb-[3.33333rem]">
      <div className="flex-y-center justify-between max-w-[75rem] mx-auto">
        <h2 className="text-[#090909] text-[2.8125rem] font-semibold leading-[1.2] xsm:px-[0.8275rem] tracking-[-0.02813rem] xsm:text-[1.25rem] xsm:font-semibold">Dự án liên quan</h2>
        <Link
          href="/"
          className="
            relative overflow-hidden
            h-[2.6rem] flex-center w-fit group
            px-[1.15rem]
            rounded-[5.20833rem]
            outline outline-[#090909]/60
            text-[0.73rem] leading-[1.5] text-[#090909]/60
            transition-all duration-300
            hover:text-white
            hover:outline-none
            xsm:hidden
          "
        >
          <span
            className="
              absolute inset-0
              bg-[radial-gradient(298.39%_130.99%_at_6.62%_16.15%,_#CA2A2A_15.19%,_#D32F2F_53.77%,_#FF6E6E_100%)]
              opacity-0
              group-hover:opacity-100
              transition-opacity duration-300 ease-in-out
              rounded-[inherit]
            "
          />
          <span className="relative z-10 flex-center">
            Xem tất cả
            <ChevronRightIcon
              className="
                ml-1.25 size-[0.83333rem]
                translate-y-[0.0375rem]
                text-[#090909]/60
                group-hover:text-white
                group-hover:translate-x-[0.5rem]
                transition-all duration-300
              "
            />
          </span>
        </Link>

      </div>
      <div className="relative xsm:hidden">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: '.related-projects-next',
            prevEl: '.related-projects-prev',
            disabledClass: 'opacity-0 pointer-events-none',
          }}
          grabCursor={true}
          className="h-[19.75rem] w-[75rem]! mt-[1.67rem]"
          slidesPerView={3}
          speed={600}
          spaceBetween={convertRemToPx(1.5625) || 25}

        >
          {projects.map((project, index) => (
            <SwiperSlide key={index} className='w-full h-full'>
              <ProjectCard
                project={project}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex w-[83.33333rem] pointer-events-none absolute-center justify-between">
          <button
            type="button"
            className="
              related-projects-prev pointer-events-auto
              relative overflow-hidden
              size-[2.083rem]
              rounded-full flex-center
              bg-[#F0F0F0]
              group
              cursor-pointer
              transition-all duration-300
            "
          >
            <span
              className="
                absolute inset-0
                rounded-full
                bg-[radial-gradient(298.39%_130.99%_at_6.62%_16.15%,_#CA2A2A_15.19%,_#D32F2F_53.77%,_#FF6E6E_100%)]
                opacity-0
                group-hover:opacity-100
                transition-opacity duration-300 ease-in-out
              "
            />

            <ChevronLeftIcon
              className="
                relative z-10
                size-[1.25rem]
                text-[#090909]/60
                group-hover:text-white
                transition-all duration-300
              "
            />
          </button>

          <button
            type="button"
            className="
              related-projects-next pointer-events-auto
              relative overflow-hidden
              size-[2.083rem]
              rounded-full flex-center
              bg-[#F0F0F0]
              group
              cursor-pointer
              transition-all duration-300
            "
          >
            <span
              className="
                absolute inset-0
                rounded-full
                bg-[radial-gradient(298.39%_130.99%_at_6.62%_16.15%,_#CA2A2A_15.19%,_#D32F2F_53.77%,_#FF6E6E_100%)]
                opacity-0
                group-hover:opacity-100
                transition-opacity duration-300 ease-in-out
              "
            />

            <ChevronRightIcon
              className="
                relative z-10
                size-[1.25rem]
                text-[#090909]/60
                group-hover:text-white
                transition-all duration-300
              "
            />
          </button>

        </div>
      </div>

      <div className="flex space-x-[0.83333rem] overflow-x-auto px-[0.8275rem] mt-[1.04167rem] sm:hidden hidden_scroll">
        {Array.from({ length: 10 }).map((_, index) => (
          <Image
            key={index}
            width={200}
            height={300}
            src={`https://picsum.photos/id/${index}/200/300`}
            alt="Project"
            className="w-[16.2rem] h-[14.83rem] object-cover shrink-0"
          />
        ))}
      </div>
      <div className="px-[0.8275rem] sm:hidden">
        <Link href="/" className='w-full flex-center mt-[1.66667rem] rounded-[5.2rem] border border-[#090909]/60 backdrop-blur-[6px] mx-auto
      shadow-[0_0_2px_0_rgba(0,0,0,0.10),_0_1px_8px_0_rgba(0,0,0,0.10)] h-[2.5rem]'>
          <span className="text-[0.73rem] leading-[1.5] text-[#090909]/60 flex-center">
            Xem tất cả
            <ChevronRightIcon
              className="ml-1.5 size-[0.83333rem] text-[#090909]/60"
            />
          </span>
        </Link>
      </div>

    </section>
  )
}

export default RelatedProjects
