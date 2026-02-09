import OrganizationalChartDetail from '@/modules/organizational-chart-page'
import organizationService from '@/services/organization-chart'

export const dynamic = 'force-dynamic'

export function generateStaticParams() {
  return [{ locale: 'vi' }]
}

export default async function OrganizationChartPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  const res = await organizationService.getPage(locale)

  return (
    <main className='xsm:bg-[url("/sub-company/d-bg-deco-mb.webp")] bg-[url("/sub-company/d-bg-deco.webp")] bg-cover bg-center bg-no-repeat'>
      <OrganizationalChartDetail res={res} />
    </main>
  )
}
