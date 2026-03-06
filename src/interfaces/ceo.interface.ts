export interface ICEOPageAcfDataRes {
  acf: {
    message: {
      post_content: string
      post_title: string
      acf: {
        position: string
        show: string
      }
      thumbnail: string
    }[]
  }
}
