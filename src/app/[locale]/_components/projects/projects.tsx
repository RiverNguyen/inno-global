'use client'
import { useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'

import BackgroundSwiper from '@/app/[locale]/_components/projects/_components/background-swiper'
import ProjectInfo from '@/app/[locale]/_components/projects/_components/project-info'
import ThumbSwiper from '@/app/[locale]/_components/projects/_components/thumb-swiper'
import { IMedia } from '@/interfaces/media.interface'

export interface IProject {
  id: number
  image: string
  title: string
  content: string
  location: string
  investor: string
  area: string
  year: string
  link: string
  /**
   * Optional raw ACF payload from the API.
   * Only used when mapping home projects data.
   */
  acf?: {
    project_gallery?: IMedia[]
    area?: string
    investor?: string
    location?: string
    starting_year?: string
    year?: string
  }
}

interface IProjectsProps {
  data: IProject[]
}

export default function Projects({ data }: IProjectsProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className='relative h-[28.125rem] w-full sm:h-[56.25rem] sm:overflow-hidden lg:h-screen'>
      <BackgroundSwiper
        data={data}
        thumbsSwiper={thumbsSwiper as SwiperType}
        _activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
      <ThumbSwiper
        data={data}
        setThumbsSwiper={setThumbsSwiper}
      />
      <ProjectInfo
        data={data}
        activeIndex={activeIndex}
      />
    </div>
  )
}
