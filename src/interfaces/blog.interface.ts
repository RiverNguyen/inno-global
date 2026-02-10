import { IMedia } from './media.interface'
import { ITerm } from './taxonomy.interface'

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
  type: string
  slug: string
  title: string
  content: string
  excerpt: string
  date: string
  featured_image: IMedia
  acf: {
    short_desc: string
  }
  taxonomies: {
    category: ITerm[]
    language: ITerm[]
    post_format: ITerm[]
    post_tag: ITerm[]
    post_translation: ITerm[]
    service: ITerm[]
  }
}
