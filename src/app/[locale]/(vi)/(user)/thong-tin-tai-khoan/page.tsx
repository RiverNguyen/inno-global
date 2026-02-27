import { getTranslations } from 'next-intl/server'

import { auth } from '@/auth'

import AvatarEdit from './_components/AvatarEdit'
import BackButton from './_components/BackButton'

export default async function DashboardPage() {
  const [session, t] = await Promise.all([auth(), getTranslations('UserPage')])
  const infoItems = [
    { labelKey: 'staffId' as const, value: session?.user?.user_code || '---' },
    { labelKey: 'fullName' as const, value: session?.user?.display_name || '---' },
    { labelKey: 'email' as const, value: session?.user?.email || '---' },
    { labelKey: 'department' as const, value: session?.user?.phong_ban || '---' },
    { labelKey: 'position' as const, value: session?.user?.roles?.[0] === 'employee' ? t('employee') : t('undefined') || '---' },
  ]

  return (
    <div className='p-[1.46rem] pb-[3.3875rem] bg-white flex-1 xsm:pt-[3.54rem] xsm:px-[0.83rem]'>
      <div className="flex items-center xsm:mb-[1.5rem]">
        <BackButton />
        <h1 className='text-[#090909] text-[1.46rem] font-semibold leading-[1.5] mb-[2.08rem] xsm:mb-0 xsm:text-[0.83rem] xsm:text-[#333] xsm:font-semibold'>{t('accountInfo')}</h1>
      </div>
      <div className='flex space-x-[2.08rem] xsm:flex-col'>
        <AvatarEdit avatarUrl={session?.user?.avatar_512} />
        <div className='grid grid-cols-2 gap-x-[1.56rem] xsm:grid-cols-1 xsm:gap-y-[0.9375rem] xsm:mt-[1.35rem]'>
          {infoItems.map((item) => (
            <div key={item.labelKey} className='w-[16.06rem] xsm:w-full'>
              <p className='text-[#090909]/60 text-[0.73rem] leading-[1.5]'>{t(item.labelKey)}</p>
              <p className='text-[0.83rem] font-semibold leading-[1.3] tracking-[-0.00833rem] mt-[0.32rem] xsm:text-[0.729rem] xsm:leading-[1.5]'>
                {item.value}
              </p>
              <hr className='mt-[0.62rem] border-[#1A1A1A]/15' />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
