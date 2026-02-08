import FounderClient from '@/modules/founder/components'
import leadershipService from '@/services/leadership'

export default async function Founder({ locale, slug }: { locale: string; slug: string }) {
  const leader = await leadershipService.getLeadershipDetail(slug)

  return (
    <FounderClient
      locale={locale}
      leader={leader}
    />
  )
}
