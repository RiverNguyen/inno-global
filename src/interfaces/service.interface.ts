export interface IServices {
  acf: {
    thumbnail: string
  }
  description: string
  slug: string
  name: string
}

export interface IServiceRes {
  success: boolean
  total: number
  totalPages: number
  page: number
  limit: number
  data: IServices[]
}
