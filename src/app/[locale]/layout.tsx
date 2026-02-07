import { NextIntlClientProvider } from 'next-intl'

import Header from '@/layouts/header/Header'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <NextIntlClientProvider>
      <Header />
      {children}
    </NextIntlClientProvider>
  )
}
