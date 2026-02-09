import SocialResponsibility from '@/modules/social-responsibility'

export default async function SocialResponsibilityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  return <SocialResponsibility locale={locale} />
}
