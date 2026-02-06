// taxonomy.types.ts

/* ---------- Term ---------- */
export interface ITerm {
  id: number
  name: string
  slug: string
  taxonomy: string
  description: string
  count: number
  parent: number | null
  link: string
  translations: unknown[]
}

/* ---------- Meta ---------- */
export interface ITaxonomyMeta {
  taxonomy: string
  total: number | null
  count: number
}

/* ---------- Response ---------- */
export interface ITaxonomyRes {
  success: boolean
  data: ITerm[]
  meta: ITaxonomyMeta
}
