import { getTranslations } from 'next-intl/server'

import { auth } from '@/auth'
import AvatarEdit from '@/modules/(auth)/dashboard/_components/avatar-edit'
import BackButton from '@/modules/(auth)/dashboard/_components/back-button'

export default async function DashboardPage() {
  const [session, t] = await Promise.all([auth(), getTranslations('UserPage')])
  const infoItems = [
    { labelKey: 'staffId' as const, value: session?.user?.user_code || '---' },
    { labelKey: 'fullName' as const, value: session?.user?.display_name || '---' },
    { labelKey: 'email' as const, value: session?.user?.email || '---' },
    { labelKey: 'department' as const, value: session?.user?.phong_ban || '---' },
    {
      labelKey: 'position' as const,
      value: session?.user?.roles?.[0] === 'employee' ? t('employee') : t('undefined') || '---',
    },
  ]

  return (
    <div className='xsm:pt-[3.54rem] xsm:px-[0.83rem] flex-1 bg-white p-[1.46rem] pb-[3.3875rem] overflow-auto max-h-[calc(100vh-6.46rem)]'>
      <div className='xsm:mb-[1.5rem] flex items-center'>
        <BackButton />
        <h1 className='xsm:mb-0 xsm:text-[0.83rem] xsm:text-[#333] xsm:font-semibold mb-[2.08rem] text-[1.46rem] leading-[1.5] font-semibold text-[#090909]'>
          {t('accountInfo')}
        </h1>
      </div>
      <div className='xsm:flex-col flex space-x-[2.08rem]'>
        <AvatarEdit avatarUrl={session?.user?.avatar_512} />
        <div className='xsm:grid-cols-1 xsm:gap-y-[0.9375rem] xsm:mt-[1.35rem] grid grid-cols-2 gap-x-[1.56rem]'>
          {infoItems.map((item) => (
            <div
              key={item.labelKey}
              className='xsm:w-full w-[16.06rem]'
            >
              <p className='text-[0.73rem] leading-[1.5] text-[#090909]/60'>{t(item.labelKey)}</p>
              <p className='xsm:text-[0.729rem] xsm:leading-[1.5] mt-[0.32rem] text-[0.83rem] leading-[1.3] font-semibold tracking-[-0.00833rem]'>
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
