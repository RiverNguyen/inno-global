import { Metadata } from 'next'

import ENDPOINTS from '@/configs/endpoints'
import ENV from '@/configs/env'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import Contact from '@/modules/contact-page'
import contactService from '@/services/contact'
import metadataValues from '@/utils/metadataValues'

export const dynamicParams = false

export function generateStaticParams() {
  return [{ locale: 'vi' }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const res = await getMetaDataRankMath(ENDPOINTS.contact.rank_math[locale as keyof typeof ENDPOINTS.contact.rank_math])
  return metadataValues(res, ENV.DOMAIN || '')
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const contactAcfData = await contactService.getAcfData(
    ENDPOINTS.contact.page_id[locale as keyof typeof ENDPOINTS.contact.page_id],
  )

  return (
    <Contact
      locale={locale}
      serviceTaxonomies={contactAcfData?.acf}
    />
  )
}
