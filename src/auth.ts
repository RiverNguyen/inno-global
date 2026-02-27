/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from 'jwt-decode'
import NextAuth, { CredentialsSignin } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import ENDPOINTS from '@/configs/endpoints'
import ENV from '@/configs/env'
import fetchData from '@/fetches/fetchData'
import fetchDataAuth from '@/fetches/fetchDataAuth'
import { isoToUnixTimestamp } from '@/lib/utils'

// NOTE: define theo responsive login của api, nên bắt BE quy chuẩn đúng với JWT
declare module 'next-auth' {
  interface User {
    expires?: string
    accessToken?: string
    refreshToken?: string
    accessExp?: number
    refreshExp?: number
    user?: {
      id?: number
      username?: string
      email?: string
      roles?: string[]
      avatar_url?: string
      first_name?: string
      last_name?: string
      display_name?: string
      avatar_512?: string
      phong_ban?: string
      user_code?: string
      token?: {
        accessToken?: string
      }
    }
  }

  interface Session {
    expires?: string
    accessToken?: string
    refreshToken?: string
    accessExp?: number
    refreshExp?: number
    user?: {
      id?: number
      username?: string
      email?: string
      roles?: string[]
      avatar_url?: string
      first_name?: string
      last_name?: string
      display_name?: string
      avatar_512?: string
      phong_ban?: string
      user_code?: string
      token?: {
        accessToken?: string
      }
    }
  }
}

function isValidCredentials(credentials: any): boolean {
  return credentials.username && credentials.password
}

function jwtExpFromToken(token: unknown): number | undefined {
  if (typeof token !== 'string' || !token) return
  try {
    const decoded = jwtDecode<{ exp?: number }>(token)
    return typeof decoded?.exp === 'number' ? decoded.exp : undefined
  } catch {
    return
  }
}

function safeIsoExpToUnixSeconds(exp: unknown): number | undefined {
  if (typeof exp !== 'string' || !exp) return
  try {
    return isoToUnixTimestamp(exp, 's')
  } catch {
    return
  }
}

function normalizeAvatarUrl(url: unknown): string | undefined {
  if (typeof url !== 'string' || !url) return
  if (url.startsWith('data:') || url.startsWith('blob:')) return url

  const base = (ENV.CMS ?? '').replace(/\/$/, '')
  if (/^(https?:)?\/\//.test(url)) {
    if (!base) return url
    try {
      const parsed = new URL(url)
      const cmsOrigin = new URL(base).origin
      if (parsed.origin !== cmsOrigin && parsed.pathname.startsWith('/wp-content/')) {
        return `${base}${parsed.pathname}${parsed.search}${parsed.hash}`
      }
    } catch {
      return url
    }
    return url
  }

  if (!base) return url

  return `${base}${url.startsWith('/') ? url : `/${url}`}`
}
function normalizeUserProfile(nextUser: any, prevUser?: any) {
  const mergedUser = {
    ...(prevUser ?? {}),
    ...(nextUser ?? {}),
  }

  const avatar512 = normalizeAvatarUrl(mergedUser?.avatar_512)
  const avatarUrl = normalizeAvatarUrl(mergedUser?.avatar_url)

  if (avatar512) mergedUser.avatar_512 = avatar512
  if (avatarUrl) mergedUser.avatar_url = avatarUrl

  return mergedUser
}

async function refreshAccessToken(token: any) {
  try {
    // NOTE: Call api refresh token, thay endpoint vào đây và sửa lại theo responsive trả về và token truyền vào
    const res = await fetchData({
      method: 'POST' as const,
      api: ENDPOINTS.auth.refreshToken,
      option: {
        body: JSON.stringify({
          refresh_token: token?.refreshToken,
        }),
      },
    })
    const newAccessToken = res?.token?.accessToken
    const newRefreshToken = res?.token?.refreshToken
    if (!newAccessToken) {
      throw new Error('RefreshAccessTokenError')
    }

    const accessExp = jwtExpFromToken(newAccessToken) ?? safeIsoExpToUnixSeconds(res?.token?.accessPayload?.exp)
    const refreshExp = jwtExpFromToken(newRefreshToken) ?? safeIsoExpToUnixSeconds(res?.token?.refreshPayload?.exp)

    return {
      ...token,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken ?? token?.refreshToken,
      refreshExp: refreshExp ?? token?.refreshExp,
      expires: accessExp ?? token?.expires,
    }
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      if (token?.accessToken) {
        const decodedToken = jwtDecode(token.accessToken as string)
        token.accessExp = decodedToken.exp
      }
      if (account && user) {
        const normalizedUser = normalizeUserProfile(user?.user)
        return {
          ...token,
          ...user,
          user: {
            ...normalizedUser,
            token: {
              ...(normalizedUser?.token ?? {}),
              accessToken: user.accessToken ?? normalizedUser?.token?.accessToken,
            },
          },
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          refreshExp: user.refreshExp,
        }
      }
      if (trigger === 'update') {
        if (session?._action === 'updateInfo') {
          const dataMe = await fetchDataAuth({
            api: ENDPOINTS.auth.info,
          })
          const { success, data } = dataMe ?? {}
          if (!success || !data) return token

          const normalizedUser = normalizeUserProfile(data, token?.user)
          return {
            ...token,
            user: normalizedUser,
          }
        }
        if (session?._action === 'refreshToken') {
          return refreshAccessToken(token)
        }
      }

      if (token?.accessExp && Date.now() < (token?.accessExp as number) * 1000) {
        return token
      }
      // Thực hiện refresh token khi exp < 30s
      return refreshAccessToken(token)
    },
    async session({ session, token }: { token: any; session: any }) {
      if (token) {
        session.accessToken = token.accessToken
        session.refreshToken = token.refreshToken
        session.refreshExp = token.refreshExp
        // NOTE: Thêm logic để lấy thông tin user từ api nếu cần truyền vào session
        session.user = token.user
        if (!session?.user?.token?.accessToken && token?.accessToken) {
          session.user = {
            ...(session.user ?? {}),
            token: {
              ...(session?.user?.token ?? {}),
              accessToken: token.accessToken,
            },
          }
        }
        session.expires = token.expires
      }
      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials, _req) => {
        try {
          if (!isValidCredentials(credentials)) return null
          // NOTE: Thực hiện call api login, thay endpoint và payload vào đây
          const request = {
            api: ENDPOINTS.auth.login,
            method: 'POST' as const,
            headers: {
              'Content-Type': 'application/json',
            },
            option: {
              body: JSON.stringify({
                username: credentials?.username,
                password: credentials?.password,
              }),
            },
          }
          const res = await fetchDataAuth(request)

          if (res?.success) {
            const data = res?.data as { id?: number; user?: { id?: number } }
            const accessToken = res?.token?.accessToken
            const refreshToken = res?.token?.refreshToken
            const refreshExp = jwtExpFromToken(refreshToken) ?? safeIsoExpToUnixSeconds(res?.token?.refreshPayload?.exp)
            return {
              id: String(data?.id ?? data?.user?.id ?? ''),
              user: { ...res?.data },
              accessToken,
              refreshToken,
              refreshExp,
            }
          }
          // NOTE: Sai tài khoản/mật khẩu hoặc login fail -> trả về error type CredentialsSignin
          // để client side có thể xử lý hiển thị message (toast) thay vì CallbackRouteError (500).
          const err = new CredentialsSignin(res?.message || 'Invalid credentials')
          err.code = 'invalid_credentials'
          throw err
        } catch (error) {
          if (error instanceof Error) throw error
          throw new Error(String(error))
        }
      },
    }),
  ],
  secret: ENV.AUTH_SECRET, // NOTE: đưa biến này ra .env, sử dụng env.AUTH_SECRET
})
