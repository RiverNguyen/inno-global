import { auth } from '@/auth'
import ChangePasswordFlow from '@/modules/(auth)/dashboard-change-password-page/components/change-password-flow'

const DashboardChangePasswordModule = async () => {
  const session = await auth()

  return (
    <div className='flex-1 bg-white p-[1.46rem]'>
      <ChangePasswordFlow user={session?.user} />
    </div>
  )
}

export default DashboardChangePasswordModule
