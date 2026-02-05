import Founder from '@/modules/founder/components'

export default async function FounderPage({ params }: { params: Promise<{ locale: string }> }) {
  const [{ locale }] = await Promise.all([params])

  return (
    <Founder locale={locale} />
  )
}