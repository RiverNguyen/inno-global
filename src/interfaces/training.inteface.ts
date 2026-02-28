import { ProjectFeaturedImage } from './project.interface'

export interface ITrainingRes {
  success: boolean
  total: number
  totalPages: number
  page: number
  limit: number
  data: ITraining[]
}

export interface ITraining {
  id: number
  slug: string
  title: string
  content: string
  acf: {
    banner: {
      image: {
        desktop: string
        mobile: string
      }
    }
  }
  // API responses vary by endpoint (WP media vs ACF image); UI needs at least `.url`.
  featured_image: ProjectFeaturedImage
  taxonomies: {
    training_category: {
      name: string
      slug: string
    }[]
    lecturer: {
      name: string
      slug: string
    }[]
    participant: {
      name: string
      slug: string
    }[]
    training_format: {
      name: string
      slug: string
    }[]
    starting_year: {
      name: string
      slug: string
    }[]
  }
}

export interface ITrainingTaxonomies {
  categories: {
    data: {
      id: number
      name: string
      slug: string
    }[]
  }
  years: {
    data: {
      id: number
      name: string
      slug: string
    }[]
  }
}

export interface ITrainingAcfData {
  banner: {
    image: {
      desktop: string
      mobile: string
    }
    title: string
  }
}
