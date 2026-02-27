'use client'

import Image from 'next/image'
import { useSession } from 'next-auth/react'

const DashboardPage = () => {
  const { data: session } = useSession()
  const infoItems = [
    {
      label: 'ID Nhân sự',
      value: session?.user?.username,
    },
    {
      label: 'Họ và tên',
      value: session?.user?.display_name,
    },
    {
      label: 'Email',
      value: session?.user?.email,
    },
    {
      label: 'Chức vụ',
      value: session?.user?.roles?.[0] || '---',
    },
  ]

  return (
    <div className='p-[1.46rem] pb-[3.3875rem] bg-white flex-1'>
      <h1 className='text-[#090909] text-[1.46rem] font-semibold leading-[1.5] mb-[2.08rem]'>Thông tin tài khoản</h1>
      <div className='flex space-x-[2.08rem]'>
        <div className='size-[12.44792rem] rounded-full relative overflow-hidden'>
          <Image
            src={session?.user?.avatar_512 || ''}
            alt={session?.user?.first_name || ''}
            className='size-full object-cover'
            fill
          />
        </div>
        <div className='grid grid-cols-2 items-start gap-x-[1.56rem]'>
          {infoItems.map((item) => (
            <div
              key={item.label}
              className='w-[16.06rem]'
            >
              <p className='text-[#090909]/60 text-[0.73rem] leading-[1.5]'>{item.label}</p>
              <p className='text-[0.83rem] font-semibold leading-[1.3] tracking-[-0.00833rem] mt-[0.32rem]'>
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

export default DashboardPage
