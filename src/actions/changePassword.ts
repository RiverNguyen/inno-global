'use server'

import ENDPOINTS from '@/configs/endpoints'
import fetchDataAuth from '@/fetches/fetchDataAuth'

interface ChangePasswordProps {
  current_password: string
  new_password: string
  confirm_password: string
}

export const changePassword = async (args: ChangePasswordProps) => {
  try {
    const data = (await fetchDataAuth({
      api: ENDPOINTS.auth.changePassword,
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      notJson: true,
      option: {
        body: JSON.stringify(args),
      },
    })) as { success?: boolean; message?: string; data?: unknown }

    if (!data?.success) {
      return { success: false, message: data?.message || 'Thay đổi mật khẩu thất bại' }
    }
    return { success: true, message: 'Thay đổi mật khẩu thành công', data: data?.data }
  } catch {
    return { success: false, message: 'Thay đổi mật khẩu thất bại' }
  }
}
