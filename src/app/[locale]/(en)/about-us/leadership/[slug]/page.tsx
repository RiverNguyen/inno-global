import Founder from '@/modules/founder'

export default async function FounderPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params

  return (
    <Founder
      locale={locale}
      slug={slug}
    />
  )
}
