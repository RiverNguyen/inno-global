import { IMedia } from './media.interface'
import { ITerm } from './taxonomy.interface'

export interface IBlogTaxonomyTerm {
  id: number
  name: string
  slug: string
  description?: string
}

export interface IBlogRes {
  success: boolean
  total: number
  totalPages: number
  page: number
  limit: number
  data: IBlog[]
  hasMore: boolean
  hasNextPage: boolean
  hasPrevPage: boolean
  prevPage: null
  nextPage: number
}

export interface IBlog {
  id: number
  title: string
  type: string
  slug: string
  content: string
  excerpt: string
  status?: string
  date: string
  modified?: string
  author?: number
  featured_image: IMedia
  taxonomies: {
    category: ITerm[]
    language: ITerm[]
    post_format: ITerm[]
    post_tag: ITerm[]
    post_translation: ITerm[]
    service: ITerm[]
  }
  acf: {
    short_desc: string
    banner?: {
      title?: string
      image?: {
        desktop?: IMedia | false
        mobile?: IMedia | false
      }
    }
  }
}

export interface ITaxonomies {
  years: {
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
  categories: {
    data: {
      id: number
      name: string
      slug: string
    }[]
  }
}
