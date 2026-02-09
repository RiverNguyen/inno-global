import SubCompanyDetail from '@/modules/sub-company-page'
import companyService from '@/services/company'

export const dynamic = 'force-dynamic'

export function generateStaticParams() {
  return [{ locale: 'vi' }]
}

export default async function SubComapanyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const [res, companyRes] = await Promise.all([
    companyService.getPage(locale),
    companyService.getCompanys({ locale, limit: 4 }),
  ])

  return (
    <main className='pt-[3.65rem] xsm:pt-[2.92rem] xsm:bg-[url("/sub-company/d-bg-deco-mb.webp")] bg-[url("/sub-company/d-bg-deco.webp")] bg-cover bg-center bg-no-repeat'>
      <SubCompanyDetail
        res={res}
        companys={companyRes?.data}
      />
    </main>
  )
}
