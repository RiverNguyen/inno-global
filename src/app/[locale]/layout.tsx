import { NextIntlClientProvider } from 'next-intl'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import Footer, { IFooter } from '@/layouts/footer/footer'
import Header from '@/layouts/header/Header'
import { footerService } from '@/services/home/footer.service'

export default async function layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const [footerData] = await Promise.all([footerService.getFooterData<{ data: { footer_fields: IFooter } }>(locale)])
  return (
    <NextIntlClientProvider>
      <NuqsAdapter>
        <Header />
        {children}
        <Footer data={footerData.data.footer_fields} />
      </NuqsAdapter>
    </NextIntlClientProvider>
  )
}
