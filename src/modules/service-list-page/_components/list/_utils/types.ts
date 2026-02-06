export type DataSource = 'service' | 'project'

export type PagedApiResponse<T> = {
  success?: boolean
  data?: T[]
  total?: number
  totalPages?: number
  page?: number
  limit?: number
  hasMore?: boolean
  hasNextPage?: boolean
  hasPrevPage?: boolean
  nextPage?: number
}

export type ServiceLikeItem = {
  id?: number | string
  slug?: string
  name?: string
  title?: string
  description?: string
  excerpt?: string
  featured_image?: { url?: string; source_url?: string }
  acf?: { thumbnail?: string }
}

export type ServiceListInitialPage = PagedApiResponse<ServiceLikeItem>
