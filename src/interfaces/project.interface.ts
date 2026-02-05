import { IMedia } from '@/interfaces/media.interface'

export interface IProject {
  id: number
  slug: string
  title: string
  featured_image: IMedia
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
}
