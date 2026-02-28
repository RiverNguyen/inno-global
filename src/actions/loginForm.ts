/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { signIn } from '@/auth'

type ValuesProps = {
  username: string
  password: string
  redirectTo?: string
}

/** Shape of auth errors (next-auth may throw object with type/message/cause; we also throw Error with cause) */
type AuthErrorLike = { type?: string; message?: string; cause?: unknown }

function isAuthErrorLike(err: unknown): err is AuthErrorLike {
  return typeof err === 'object' && err !== null && 'type' in err
}

function stripAuthJsReadMore(message: string) {
  if (!message) return message
  return message
    .replace(/\.\s*Read more at https:\/\/errors\.authjs\.dev#[^\s]+/g, '')
    .replace(/\s*Read more at https:\/\/errors\.authjs\.dev#[^\s]+/g, '')
    .trim()
}

export const loginForm = async (values: ValuesProps) => {
  try {
    await signIn('credentials', {
      redirect: false,
      redirectTo: values.redirectTo || '/',
      username: values.username,
      password: values.password,
    })

    return { ok: true }
  } catch (err) {
    if (isAuthErrorLike(err) && err.type) {
      // 1) CredentialsSignin
      if (err.type === 'CredentialsSignin') {
        const code = (err as any)?.code ?? (err.cause as any)?.code ?? 'credentials'
        const message = stripAuthJsReadMore(err.message || 'Sign in failed')
        return { ok: false, code, message, cause: err.cause }
      }

      // 2) CallbackRouteError
      if (err.type === 'CallbackRouteError') {
        const cause = (err.cause as { err?: { message?: string } })?.err?.message
        return { ok: false, code: err.type, message: 'Auth error', cause }
      }

      // 3) Other auth error types
      return { ok: false, code: err.type, message: 'Auth error', cause: err.cause }
    }

    // Plain Error (e.g. from auth.ts or API message)
    if (err instanceof Error) {
      const code = (err.cause as any)?.code ?? (err.message || 'unknown')
      const message = (err.message || 'Unexpected error').includes('Read more at')
        ? 'Unexpected error'
        : err.message || 'Unexpected error'
      return { ok: false, code: String(code), message, cause: err.cause }
    }

    return { ok: false, code: 'unknown', message: 'Unexpected error' }
  }
}
