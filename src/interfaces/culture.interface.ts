import { IMedia } from './media.interface'

export interface ICultureCoreValue {
  title: string
  descs: { title: string; content: string }[]
  image: IMedia
}

export interface ICultureRes {
  acf: {
    culture_title: string
    culture_items: ICultureCoreValue[]
    culture_activity: {
      title: string
      gallery: IMedia[]
    }
  }
}
