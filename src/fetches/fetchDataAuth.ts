/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { auth } from '@/auth'
import ENV from '@/configs/env'
export type RequestPostGuest = {
  api: string
  headers?: any
  option?: any
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH'
  notJson?: boolean
}

export default async function fetchDataAuth(request: RequestPostGuest) {
  try {
    const session = await auth()
    const token = session?.accessToken

    const myHeaders = new Headers()
    // Only attach Authorization when we actually have a token.
    if (token) {
      myHeaders.append('Authorization', `Bearer ${token}`)
    }

    // Merge any custom headers (e.g. Accept, locale, etc.)
    if (request.headers) {
      for (const [key, value] of Object.entries(request.headers)) {
        if (typeof value !== 'undefined') {
          myHeaders.set(key, String(value))
        }
      }
    }

    if (!request.notJson) {
      // Don't overwrite caller's Content-Type if they set one.
      if (!myHeaders.has('Content-Type')) {
        myHeaders.append('Content-Type', 'application/json')
      }
    }

    const url = `${ENV.CMS ?? ''}${ENV.API ?? ''}${request.api}`

    const res = await fetch(url, {
      method: request.method || 'GET',
      headers: myHeaders,
      ...request.option,
    })

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      // throw new Error('Failed to fetch data')
      return res.json()
    }

    return res.json()
  } catch (error: unknown) {
    // Convert the error to a string or handle based on its type
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`${ENV.CMS ?? ''}${ENV.API ?? ''}${request.api}: ${errorMessage}`)
  }
}
