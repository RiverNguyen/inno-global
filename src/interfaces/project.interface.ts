import { IAcfImage } from '@/interfaces/acf-wp.interface'
import { IMedia } from '@/interfaces/media.interface'

export type ProjectFeaturedImage =
  | (Pick<IMedia, 'url'> & Partial<Omit<IMedia, 'url'>>)
  | (Pick<IAcfImage, 'url'> & Partial<Omit<IAcfImage, 'url'>>)

export interface IProject {
  id: number
  slug: string
  title: string
  // API responses vary by endpoint (WP media vs ACF image); UI needs at least `.url`.
  featured_image: ProjectFeaturedImage
  taxonomies: {
    investor: {
      name: string
      slug: string
    }[]
    location: {
      name: string
      slug: string
    }[]
  }
}

// Backward-compat alias (some components import `Project`)
export type Project = IProject

export interface ITaxonomies {
  locations: {
    data: {
      id: number
      name: string
      slug: string
    }[]
  }
  services: {
    data: {
      id: number
      name: string
      slug: string
    }[]
  }
  years: {
    data: {
      id: number
      name: string
      slug: string
    }[]
  }
  types: {
    data: {
      id: number
      name: string
      slug: string
    }[]
  }
  awards: {
    data: {
      id: number
      name: string
      slug: string
    }[]
  }
}

import { ITerm } from './taxonomy.interface'

export interface IProjectDetailAcf {
  project_gallery: IMedia[]
  project_overview: {
    label: string
    value: string
  }[]
}

export interface IProjectDetail {
  id: number
  type: string
  slug: string
  title: string
  content: string
  excerpt: string
  date: string
  featured_image: IMedia
  acf?: IProjectDetailAcf
  taxonomies: {
    investor: ITerm[]
    location: ITerm[]
    service: ITerm[]
    starting_year: ITerm[]
    building_type: ITerm[]
  }
}

export interface IProjectsRes {
  success: boolean
  total: number
  totalPages: number
  page: number
  limit: number
  data: IProjectDetail[]
}
