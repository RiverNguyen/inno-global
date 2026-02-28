import { IAcfImage } from './acf-wp.interface'
export interface IPageHistoryResponse {
  acf: {
    banner: IBannerHistory
    timeline: ITimelineItem[]
  }
}

export interface IBannerHistory {
  image_desktop: string
  image_mobile: string
  title: string
}

export interface ITimelineItem {
  year: string
  description: string
  image: IAcfImage | null
}