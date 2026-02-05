import Image from 'next/image'

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

export default function Banner() {
  return (
    <div className='xsm:px-[0.83333rem] xsm:pt-[1.66667rem] relative'>
      {/* ===== HERO IMAGE: desktop only ===== */}
      <div className='relative hidden h-[29.42708rem] sm:block'>
        <div className='absolute inset-0 z-1 bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_49.89%,rgba(0,0,0,0.74)_79.8%,#000_96.54%)] opacity-40'></div>
        <Image
          src='/services/d-banner.webp'
          alt=''
          fill
          priority
          className='object-cover'
        />
      </div>

      <div className='z-2 sm:absolute sm:bottom-0 sm:left-0 sm:w-full sm:px-[12.5rem] sm:py-[3.33333rem]'>
        <div className='mb-[1.25rem] hidden sm:block'>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  className='font-open-sans text-[0.72917rem] leading-[150%] font-normal text-[rgba(255,255,255,0.50)] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'
                  href='/'
                >
                  Trang chủ
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className='size-[0.83333rem] text-[rgba(255,255,255,0.40)]' />
              <BreadcrumbItem>
                <BreadcrumbPage className='font-open-sans text-[0.72917rem] leading-[150%] font-semibold tracking-[-0.00365rem] text-white'>
                  Dịch vụ
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <h1 className='open-sans xsm:text-[#090909] xsm:text-[1.35417rem] xsm:leading-[120%] text-[3.33333rem] leading-[2.39583rem] font-semibold text-white'>
          Dịch vụ
        </h1>
      </div>
    </div>
  )
}
