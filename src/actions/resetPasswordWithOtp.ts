/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'

import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

interface ResetPasswordWithOtpProps {
  otp?: string
  email?: string
  new_password: string
  confirm_password: string
}

export const resetPasswordWithOtp = async (args: ResetPasswordWithOtpProps) => {
  try {
    const res = await fetchData({
      api: ENDPOINTS.auth.verifyOTPAndResetPassword,
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
