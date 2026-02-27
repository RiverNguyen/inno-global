import { Metadata } from 'next'

import endpoints from '@/configs/endpoints'
import ENV from '@/configs/env'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import Contact from '@/modules/contact-page'
import serviceApi from '@/services/service'
import metadataValues from '@/utils/metadataValues'

export const dynamicParams = false

export function generateStaticParams() {
  return [{ locale: 'vi' }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const res = await getMetaDataRankMath(endpoints.contact.rank_math[locale as keyof typeof endpoints.contact.rank_math])
  return metadataValues(res, ENV.DOMAIN || '')
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const [serviceTaxonomies] = await Promise.all([serviceApi.getTaxonomies(locale)])
  return (
    <Contact
      locale={locale}
      serviceTaxonomies={serviceTaxonomies}
    />
  )
}
