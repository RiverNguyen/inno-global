import { IAcfImage, ITaxonomy } from '@/interfaces/acf-wp.interface'

export interface ISlideItemAcfData {
  background_pc: IAcfImage
  background_mobile: IAcfImage
}

export interface ISectionBannerAcfData {
  slide_items: ISlideItemAcfData[]
}

export interface IDetailServiceDataRes {
  data: {
    name: string
    description: string
    slug: string
    acf: {
      banner: ISectionBannerAcfData
      banner_desc: string
    }
  }
}

export interface IRelatedProjectItemData {
  id: number
  title: string
  slug: string
  featured_image: IAcfImage
  taxonomies: {
    investor: ITaxonomy[]
    location: ITaxonomy[]
  }
}

export interface IRelatedProjectsDataRes {
  data: IRelatedProjectItemData[]
  limit: number
  totalPages: number
  page: number
}

export interface IRelatedBlogItemData {
  id: number
  title: string
  slug: string
  date: string
  featured_image: IAcfImage
  taxonomies: {
    category: ITaxonomy[]
  }
}

export interface IRelatedBlogsDataRes {
  data: IRelatedBlogItemData[]
  limit: number
  totalPages: number
  page: number
}
