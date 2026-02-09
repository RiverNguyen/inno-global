import CultureDetail from '@/modules/culture-page'
import cultureService from '@/services/culture'

export const dynamic = 'force-dynamic'

export function generateStaticParams() {
  return [{ locale: 'en' }]
}

export default async function CulturePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  const res = await cultureService.getPage(locale)

  return (
    <main className='xsm:bg-[url("/sub-company/d-bg-deco-mb.webp")] bg-[url("/sub-company/d-bg-deco.webp")] bg-cover bg-center bg-no-repeat'>
      <CultureDetail res={res} />
    </main>
  )
}
