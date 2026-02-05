import Image from 'next/image'

import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'

export default function Banner() {
  return (
    <div className="relative xsm:px-[0.83333rem] xsm:pt-[1.66667rem]">
      {/* ===== HERO IMAGE: desktop only ===== */}
      <div className="relative hidden h-[29.42708rem] sm:block">
        <div className="z-1 absolute inset-0 opacity-40 bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_49.89%,rgba(0,0,0,0.74)_79.8%,#000_96.54%)]"></div>
        <Image
          src="/services/d-banner.webp"
          alt=""
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="z-2 sm:absolute sm:left-0 sm:bottom-0 sm:w-full sm:py-[3.33333rem] sm:px-[12.5rem]">
        <div className="hidden sm:block mb-[1.25rem]">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink className="text-[rgba(255,255,255,0.50)] font-open-sans text-[0.72917rem] font-normal leading-[150%] [text-box-trim:trim-both] [text-box-edge:cap_alphabetic]" href="/">Trang chủ</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-[rgba(255,255,255,0.40)] size-[0.83333rem]" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white font-open-sans text-[0.72917rem] font-semibold leading-[150%] tracking-[-0.00365rem]">Dịch vụ</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <h1 className="text-white font-open-sans text-[3.33333rem] font-semibold leading-[2.39583rem] xsm:text-[#090909] xsm:text-[1.35417rem] xsm:leading-[120%]">
          Dịch vụ
        </h1>
      </div>
    </div>
  )
}
