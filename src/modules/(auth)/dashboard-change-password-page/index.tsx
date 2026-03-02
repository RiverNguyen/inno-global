import { auth } from '@/auth'
import ChangePasswordFlow from '@/modules/(auth)/dashboard-change-password-page/components/change-password-flow'

const DashboardChangePasswordModule = async () => {
  const session = await auth()

  return (
    <>
      <style>
        {`
      @media (max-width: 639px) {
        #main-content {
          background-color: #FFF;
        }
      }
      `}
      </style>
      <div className='xsm:p-[0.83rem] flex-1 bg-white p-[1.46rem]'>
        <ChangePasswordFlow user={session?.user} />
      </div>
    </>
  )
}

export default DashboardChangePasswordModule
