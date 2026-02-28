/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'

import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

interface ForgotPasswordProps {
  email: string
}

export const forgotPassword = async (args: ForgotPasswordProps) => {
  try {
    const res = await fetchData({
      api: ENDPOINTS.auth.forgotPassword,
      method: 'POST',
      option: {
        body: JSON.stringify(args),
      },
    })
    return res
  } catch (error) {
    return false
  }
}
