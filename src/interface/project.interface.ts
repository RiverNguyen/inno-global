import { IMedia } from './media.interface'
import { ITaxonomy } from './taxonomy.interface'

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
    investor: ITaxonomy[]
    location: ITaxonomy[]
    service: ITaxonomy[]
    starting_year: ITaxonomy[]
    building_type: ITaxonomy[]
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
