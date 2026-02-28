'use server'

import { signOut } from '@/auth'
import ENDPOINTS from '@/configs/endpoints'
import fetchDataAuth from '@/fetches/fetchDataAuth'

export const logoutAll = async (redirectTo?: string) => {
  await signOut({
    redirectTo,
    redirect: true,
  })
  await fetchDataAuth({
    api: ENDPOINTS.auth.logoutAll,
    method: 'POST',
  })
}
