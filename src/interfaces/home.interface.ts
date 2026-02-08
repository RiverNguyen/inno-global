/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAcfImage } from '@/interfaces/acf-wp.interface'

export interface IHomeAcfDataRes {
  acf: {
    banner: ISectionBannerAcf
    about_us: ISectionAboutUsAcf
    outstanding_award: ISectionAwardAcf
    capacity_service: ISectionCapacityServiceAcf
  }
}

export interface ISectionBannerAcf {
  image_slide: IAcfImage[]
  partner_slide: IAcfImage[]
}

export interface ISectionAboutUsAcf {
  background_pc: IAcfImage
  background_mb: IAcfImage
  title: string
  description: string
  number: {
    number: string
    subtitle: string
  }[]
}

export interface ISectionAwardAcf {
  title: string
  subtitle: string
  list_awards: {
    image: IAcfImage
    description: string
    year: string
  }[]
}

export interface ISectionCapacityServiceAcf {
  title: string
  list_services: boolean | any[]
}
