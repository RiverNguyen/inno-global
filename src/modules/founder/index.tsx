import FounderClient from '@/modules/founder/components'
import leadershipService from '@/services/leadership'

export default async function Founder({ locale, slug }: { locale: string; slug: string }) {
  const [leader, founderPage] = await Promise.all([
    leadershipService.getLeadershipDetail(slug, locale),
    leadershipService.getFounderPageAcf(locale),
  ])

  const bannerTitle = founderPage?.acf?.title

  return (
    <FounderClient
      locale={locale}
      leader={leader}
      bannerTitle={bannerTitle}
    />
  )
}
