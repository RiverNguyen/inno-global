import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import NextTopLoader from 'nextjs-toploader'
import { Toaster } from 'sonner'

import './globals.css'

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Inno Global',
  description: 'Inno Global',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${openSans.variable} ${openSans.className} antialiased`}>
        {/* <FontSizeProvider> */}
        {/* <FontSizeGate> */}
        <SessionProvider>{children}</SessionProvider>
        <NextTopLoader
          color='radial-gradient(298.39% 130.99% at 6.62% 16.15%, #CA2A2A 15.19%, #D32F2F 53.77%, #FF6E6E 100%)'
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing='ease'
          speed={200}
          shadow='0 0 10px #CA2A2A,0 0 5px #D32F2F'
          template='<div class="bar" role="bar"><div class="peg"></div></div>
    <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
          zIndex={1600}
          showAtBottom={false}
        />
        <Toaster richColors />
        {/* </FontSizeGate> */}
        {/* </FontSizeProvider> */}
      </body>
    </html>
  )
}
