import { NextIntlClientProvider } from 'next-intl'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import { auth } from '@/auth'
import { IAcfImage } from '@/interfaces/acf-wp.interface'
import { IMenu } from '@/interfaces/header.interface'
import { IMedia } from '@/interfaces/media.interface'
import CTA from '@/layouts/cta'
import Footer, { IFooter } from '@/layouts/footer/footer'
import Header from '@/layouts/header/Header'
import { ctaService } from '@/services/home/cta.service'
import { footerService } from '@/services/home/footer.service'
import headerService from '@/services/home/header.service'

export default async function layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const [footerData, headerData, session, ctaData] = await Promise.all([
    footerService.getFooterData<{ data: { footer_fields: IFooter } }>(locale),
    headerService.getHeaderData<{ data: { logo: IAcfImage; menus: IMenu[] } }>(locale),
    auth(),
    ctaService.getCTAData<{ data: { cta_field: { icon: IMedia; link: string }[] } }>(),
  ])
  return (
    <NextIntlClientProvider>
      <NuqsAdapter>
        <Header
          data={headerData?.data}
          session={session}
        />
        {children}
        <CTA data={ctaData?.data?.cta_field} />
        <Footer data={footerData?.data?.footer_fields} />
      </NuqsAdapter>
    </NextIntlClientProvider>
  )
}
