import { auth } from '@/auth'
import FormVerifyOTP from '@/modules/(auth)/dashboard-change-password-page/components/form-verify-otp'

const DashboardChangePasswordModule = async () => {
  const session = await auth()
  return (
    <div className='flex-1 bg-white p-[1.46rem]'>
      {/* <FormChangePassword /> */}
      <FormVerifyOTP email={session?.user?.email} />
    </div>
  )
}

export default DashboardChangePasswordModule
