export interface IPurposeRepeat {
  title: string
  image: string
  desc: string
}

export interface IPurposeDetail {
  title: string
  purpose_repeat: IPurposeRepeat[]
}

export interface IPurpose {
  purpose_detail: IPurposeDetail
}

export interface IInnoHub {
  desc: string
  purpose: IPurpose[]
}
