export interface IBusinessDataAcf {
  project_overview: IBDProjectOverview[]
  our_office: IBDOurOffice
  our_policy: IBDOurPolicy
}

export interface IBDProjectOverview {
  label: string
  value: string
}

export interface IBDOurOffice {
  tittle: string
  desc: string
  link: {
    title: string
    url: string
    target: string
  }
  image: string
}
export interface IBDOurPolicy {
  title: string
  desc: string
  link_repeat: {
    link: {
      title: string
      url: string
      target: string
    }
  }[]
}
