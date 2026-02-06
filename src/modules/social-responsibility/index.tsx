import { ISocialResponsibilityRes } from '@/interfaces/social-responsibility.interface'
import socialResponsibilityService from '@/services/social-responsibility'

import Banner from './components/banner'
import Content from './components/content'

export default async function SocialResponsibility({ locale }: { locale: string }) {
  const socialResponsibilityData = (await socialResponsibilityService.getAcfData(locale)) as ISocialResponsibilityRes

  const banner = socialResponsibilityData?.acf?.banner
  const contents = socialResponsibilityData?.acf?.content ?? []

  return (
    <main>
      <Banner banner={banner} />
      <Content
        contents={contents}
        locale={locale}
      />
    </main>
  )
}
