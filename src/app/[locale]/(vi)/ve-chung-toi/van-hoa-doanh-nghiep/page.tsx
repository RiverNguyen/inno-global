import CultureDetail from '@/modules/culture-page'
import cultureService from '@/services/culture'

export const dynamic = 'force-dynamic'

export function generateStaticParams() {
  return [{ locale: 'vi' }]
}

export default async function CulturePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  const res = await cultureService.getPage(locale)

  return (
    <main className='pt-[3.65rem] xsm:pt-[2.92rem] xsm:bg-[url("/sub-company/d-bg-deco-mb.webp")] bg-[url("/sub-company/d-bg-deco.webp")] bg-cover bg-center bg-no-repeat'>
      <CultureDetail res={res} />
    </main>
  )
}
