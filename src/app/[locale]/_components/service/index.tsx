
import ROUTES from '@/configs/routes'
import { getItemDescription, getItemImageSrc, getItemTitle } from '@/modules/service-list-page/_components/list/_utils/helpers'
import type { ServiceLikeItem } from '@/modules/service-list-page/_components/list/_utils/types'
import serviceApi from '@/services/service'

import ServiceHome from './ServiceHome'
import ServiceHomeMobile from './ServiceHomeMobile'

export default async function ServiceSection({ locale, title }: { locale: 'vi' | 'en'; title: string }) {
  const servicesRes = await serviceApi.getAll(locale)

  const services = (servicesRes?.data ?? []).map((item: ServiceLikeItem) => {
    const title = getItemTitle(item)
    const description = getItemDescription(item)
    const image = getItemImageSrc(item)
    const baseHref = locale === 'vi' ? ROUTES.servicesVi : ROUTES.servicesEn
    const href = item?.slug ? `${baseHref}/${item.slug}` : baseHref
    return { title, description, image, href }
  })

  return (
    <>
      <ServiceHome services={services} title={title} />
      <ServiceHomeMobile services={services} title={title} />
    </>
  )
}
