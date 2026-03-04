import { NextResponse, type NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { auth } from '@/auth'

import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

// Các slug auth mà user đã login thì không được vào
const AUTH_SLUGS = [
  '/dang-nhap',
  '/doi-mat-khau',
  '/xac-thuc-otp',
  '/quen-mat-khau',
  '/login',
  '/forgot-password',
  '/change-password',
  '/verify-otp',
]

export default auth((req: NextRequest & { auth?: unknown }) => {
  const { pathname } = req.nextUrl

  const isAuthPage = AUTH_SLUGS.some((slug) => pathname.includes(slug))
  const isLoggedIn = !!req.auth // có session của next-auth

  // Nếu đã đăng nhập mà vào các slug auth -> redirect
  if (isAuthPage && isLoggedIn) {
    // Lấy locale hợp lệ nếu có, nếu không thì dùng defaultLocale
    const segments = pathname.split('/')
    const possibleLocale = segments[1]
    const supportedLocales = routing.locales as unknown as string[]
    const locale = supportedLocales.includes(possibleLocale) ? possibleLocale : routing.defaultLocale

    // Ví dụ redirect về trang chủ theo locale
    return NextResponse.redirect(new URL(`/${locale}`, req.nextUrl))
    // hoặc nếu bạn luôn muốn về `/dashboard`:
    // return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.nextUrl))
  }

  // Còn lại để next-intl xử lý i18n như cũ
  return intlMiddleware(req)
})

export const config = {
  matcher: [
    // giống cấu hình cũ trong `src/proxy.ts`
    '/((?!api|_next|_vercel|.*\\..*).*)',
    '/([\\w-]+)?/users/(.+)',
  ],
}
