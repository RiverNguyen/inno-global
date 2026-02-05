'use client'

import Breadcrumb from '@/components/shared/Breadcrumb'

export default function SubCompanyDetail() {
  return (
    <>
      <div className='bg-white py-[2.08333rem]'>
        <div className='xsm:max-w-full mx-auto max-w-[75rem]'>
          <Breadcrumb
            navItems={[
              {
                label: 'Trang chủ',
                href: '/',
              },
              {
                label: 'Về chúng tôi',
                href: '/about-us',
              },
            ]}
            lastItem={{
              label: 'Công ty con',
            }}
            classNameContainer='mb-[1.25rem]'
          />
          <h1 className='font-open-sans text-[2.8125rem] leading-[120%] font-semibold tracking-[-0.02813rem] text-[rgba(9,9,9,0.80)]'>
            Công ty con/ Liên kết
          </h1>
        </div>
      </div>
      <div className='xsm:max-w-full mx-auto max-w-[75rem]'>
        <h2 className='font-open-sans mb-[1.04167rem] text-[2.08333rem] leading-[120%] font-semibold tracking-[-0.03125rem] text-[#090909]'></h2>
        <p className='font-open-sans text-[0.9375rem] leading-[150%] text-[#090909]'></p>
        <div className='relative pt-[10.3125rem] pb-[7.70833rem]'></div>
      </div>
    </>
  )
}
