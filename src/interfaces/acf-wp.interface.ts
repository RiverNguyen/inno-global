export interface IAcfImage {
  id: number
  url: string
  alt: string
  title: string
  filename: string
  filesize: number
  width: number
  height: number
  mime_type: string
  type: 'image'
  subtype: string
  sizes: {
    thumbnail?: string
    medium?: string
    medium_large?: string
    large?: string
    [key: string]: string | undefined
  }
}

export interface IAcfLink {
  title: string
  url: string
  target: '_self' | '_blank' | string
}

export interface ITaxonomy {
  id: number
  name: string
  slug: string
}
