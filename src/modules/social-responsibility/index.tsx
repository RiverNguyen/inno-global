import { ISocialResponsibilityRes } from '@/interfaces/social-responsibility.interface'
import socialResponsibilityService from '@/services/social-responsibility'

import Banner from './components/banner'
import Content from './components/content'

export default async function SocialResponsibility({ locale }: { locale: string }) {
  const socialResponsibilityData = (await socialResponsibilityService.getAcfData(locale)) as ISocialResponsibilityRes

  const banner = socialResponsibilityData?.acf?.banner
  const contents = socialResponsibilityData?.acf?.content ?? []
  const aboutUsHref = locale === 'en' ? '/about-us' : '/ve-chung-toi'

  return (
    <main>
      <style>{`
        .header-desktop {
          background-color: #fff;
        }
      `}</style>
      <Banner
        banner={banner}
        aboutUsHref={aboutUsHref}
      />
      <Content
        contents={contents}
        aboutUsHref={aboutUsHref}
        locale={locale}
      />
    </main>
  )
}
