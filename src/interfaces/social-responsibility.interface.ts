export interface ISocialResponsibilityBanner {
  title?: string
  description?: string
  image_desktop?: string
  image_mobile?: string
}

export interface ISocialResponsibilityContentItem {
  title?: string
  description?: string
  image?: string
}

export interface ISocialResponsibilityAcf {
  banner?: ISocialResponsibilityBanner
  content?: ISocialResponsibilityContentItem[]
}

export interface ISocialResponsibilityRes {
  acf?: ISocialResponsibilityAcf
}
