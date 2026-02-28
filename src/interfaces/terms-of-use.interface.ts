export interface ITermsOfUseAcfDataRes {
  acf: {
    title: string
    effective_date: string
    term_list: ITermsOfUseItem[]
  }
}

export interface ITermsOfUseItem {
  term_title: string
  term_content: string
}
