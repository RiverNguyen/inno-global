import FounderClient from '@/modules/founder/components'
import leadershipService from '@/services/leadership'

export default async function Founder({ locale, slug }: { locale: string; slug: string }) {
  const [leader] = await Promise.all([leadershipService.getLeadershipDetail(slug, locale)])

  return (
    <FounderClient
      locale={locale}
      leader={leader}
      bannerTitle={leader?.title}
    />
  )
}
