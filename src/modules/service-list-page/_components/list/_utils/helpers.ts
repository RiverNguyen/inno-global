import type { PagedApiResponse, ServiceLikeItem } from './types'

export const PAGE_LIMIT = 12

export function getHasNextPage<T>(page: PagedApiResponse<T> | undefined, limit: number) {
  if (!page) return true

  const explicit = page.hasNextPage ?? page.hasMore ?? (typeof page.nextPage === 'number' ? true : undefined)
  if (explicit === false) return false
  if (explicit === true) return true

  if (typeof page.page === 'number' && typeof page.totalPages === 'number') {
    return page.page < page.totalPages
  }

  const dataLen = Array.isArray(page.data) ? page.data.length : 0
  if (dataLen === 0) return false
  if (typeof page.limit === 'number') return dataLen >= page.limit
  return dataLen >= limit
}

export function getItemTitle(item: ServiceLikeItem) {
  return item?.name ?? item?.title ?? ''
}

export function getItemDescription(item: ServiceLikeItem) {
  return item?.description ?? item?.excerpt ?? ''
}

export function getItemImageSrc(item: ServiceLikeItem) {
  return item?.featured_image?.url ?? item?.featured_image?.source_url ?? item?.acf?.thumbnail ?? '/default.webp'
}
