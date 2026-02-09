import { IMedia } from './media.interface'

export interface IOrganizationalChartRes {
  acf: {
    organizational_title: string
    organizational_chart: {
      desktop: IMedia
      mobile: IMedia
    }
  }
}
