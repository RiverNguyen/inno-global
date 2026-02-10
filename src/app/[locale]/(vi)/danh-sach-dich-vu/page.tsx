import ENDPOINTS from '@/configs/endpoints'
import ENV from '@/configs/env'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import ServiceList from '@/modules/service-list-page'
import serviceApi from '@/services/service'
import metadataValues from '@/utils/metadataValues'

export function generateStaticParams() {
  return [{ locale: 'vi' }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const res = await getMetaDataRankMath(ENDPOINTS.service.rank_math[locale as keyof typeof ENDPOINTS.service.rank_math])
  return metadataValues(res, ENV.DOMAIN || '')
}

interface PageProps {
  params: Promise<{ locale: string }>
}

const ServicesPage = async ({ params }: PageProps) => {
  const { locale } = await params

  const [services, page] = await Promise.all([
    serviceApi.getAll(locale),
    serviceApi.getPage(locale as 'vi' | 'en'),
  ])

  return (
    <main>
      <ServiceList
        initialPage={services}
        page={page?.acf}
        dataSource='service'
      />
    </main>
  )
}

export default ServicesPage
