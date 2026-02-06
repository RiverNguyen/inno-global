import { IAcfImage, IAcfLink } from '@/interfaces/acf-wp.interface'

export interface ISectionBannerAcf {
  background_pc: IAcfImage
  background_mobile: IAcfImage
}

export interface INavItemAcf {
  link: IAcfLink
}

export interface ISectionAboutUsAcf {
  title: string
  description: string
  nav_items: INavItemAcf[]
}

export interface ISectionVisionAcf {
  title: string
  description: string
  image: IAcfImage
}

export interface ISectionMissionAcf {
  title: string
  description: string
  image: IAcfImage
}

export interface IAboutUsAcfDataRes {
  acf: {
    banner: ISectionBannerAcf
    about_us: ISectionAboutUsAcf
    vision: ISectionVisionAcf
    mission: ISectionMissionAcf
  }
}
