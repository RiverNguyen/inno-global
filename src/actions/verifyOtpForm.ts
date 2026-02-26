/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'

import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

interface VerifyOtpProps {
  otp: string
  email?: string
}

export const verifyOtp = async (args: VerifyOtpProps) => {
  try {
    const res = await fetchData({
      api: ENDPOINTS.auth.verifyOTP,
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
