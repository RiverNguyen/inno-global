import { IMedia } from './media.interface'
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
