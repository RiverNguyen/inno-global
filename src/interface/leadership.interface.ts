// leadership.interface.ts
import { IMedia } from '@/interface/media.interface'

/* ----------------------------------
 * Leadership item
 * ---------------------------------- */
export interface ILeadership {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string
  status: 'publish' | 'draft' | string
  type: 'leadership'
  date: string
  modified: string
  author: number

  featured_image?: IMedia | null
  taxonomies?: ILeadershipTaxonomies
  acf?: ILeadershipACF | null
}

/* ----------------------------------
 * Taxonomies
 * ---------------------------------- */
export interface ILeadershipTaxonomies {
  language?: ILeadershipLanguageTerm[]
  post_translations?: unknown[]
  leadership_group?: ILeadershipGroupTerm[]
}

export interface ILeadershipLanguageTerm {
  id: number
  name: string
  slug: string
  description: string
}

export interface ILeadershipGroupTerm {
  id: number
  name: string
  slug: string
  description: string
}

/* ----------------------------------
 * ACF
 * ---------------------------------- */
export interface ILeadershipACF {
  position: string
  order: string
}

/* ----------------------------------
 * Response list
 * ---------------------------------- */
export interface ILeadershipRes {
  success: boolean
  total: number
  totalPages: number
  page: number
  limit: number
  data: ILeadership[]
  args: ILeadershipArgs
}

export interface ILeadershipArgs {
  post_type: 'leadership'
  posts_per_page: number
  paged: number
  order: 'ASC' | 'DESC'
  orderby: string
  tax_query: unknown[]
  post_status: 'publish' | string
  lang: string
}

/* ----------------------------------
 * Helper types
 * ---------------------------------- */
export type ILeadershipACFData = ILeadership['acf']
export type ILeadershipTaxonomiesData = ILeadership['taxonomies']
