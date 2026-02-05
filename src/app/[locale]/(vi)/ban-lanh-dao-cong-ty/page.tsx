import Leadership from '@/modules/leadership-page'

export default async function LeadershipPage({ params }: { params: Promise<{ locale: string }> }) {
  const [{ locale }] = await Promise.all([params])

  return <Leadership locale={locale} />
}
