import CEOModule from '@/modules/ceo/components'
import leadershipService from '@/services/leadership'

export default async function CEO({ locale }: { locale: string }) {
  const data = await leadershipService.getCEOPageAcf(locale)

  return (
    <CEOModule
      locale={locale}
      data={data?.acf}
    />
  )
}
