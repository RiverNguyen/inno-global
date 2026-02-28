export interface IPrivacyPolicyAcfDataRes {
  acf: {
    title: string
    effective_date: string
    policy_list: IPrivacyPolicyItem[]
  }
}

export interface IPrivacyPolicyItem {
  policy_title: string
  policy_content: string
}
