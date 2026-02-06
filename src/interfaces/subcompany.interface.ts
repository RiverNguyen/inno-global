import { IMedia } from './media.interface'

interface ISubCompanyItem {
  label: string
  value: string
}

export interface ISubCompanyRes {
  acf: {
    company_banner: {
      title: string
    }
    company_detail: {
      name: string
      description: string
      image: IMedia
      items: ISubCompanyItem[]
    }
  }
}

export interface ICompany {
  id: number
  type: string
  slug: string
  title: string
  content: string
  excerpt: string
  date: string
  featured_image: IMedia
}
