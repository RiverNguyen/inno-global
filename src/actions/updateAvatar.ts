'use server'

import ENDPOINTS from '@/configs/endpoints'
import fetchDataAuth from '@/fetches/fetchDataAuth'

export const updateAvatar = async (formData: FormData) => {
  try {
    const file = formData.get('avatar') as File | null
    if (!file?.size) {
      return { success: false, message: 'Vui lòng chọn ảnh' }
    }

    const uploadData = new FormData()
    uploadData.append('avatar', file)

    const data = (await fetchDataAuth({
      api: ENDPOINTS.auth.updateAvatar,
      method: 'POST',
      notJson: true,
      option: {
        body: uploadData,
      },
    })) as { success?: boolean; message?: string; data?: unknown }

    if (!data?.success) {
      return { success: false, message: data?.message || 'Cập nhật ảnh thất bại' }
    }
    return { success: true, message: 'Đã cập nhật ảnh đại diện', data: data?.data }
  } catch {
    return { success: false, message: 'Cập nhật ảnh thất bại' }
  }
}
