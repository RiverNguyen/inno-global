import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb'

export default function Banner() {
  return (
    <div className="bg-white">
      <div className="w-full max-w-[75rem] mx-auto flex flex-col gap-[1.25rem] pt-[3.125rem] pb-[2.08333rem] xsm:p-[1.66667rem_0.83333rem_0.83333rem_0.83333rem] xsm:shadow-[0_4px_30px_0_rgba(0,0,0,0.08)]">
        {/* Breadcrumb */}
        <Breadcrumb className="xsm:hidden">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/about">Về chúng tôi</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Ban lãnh đạo công ty</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-[rgba(9,9,9,0.80)] font-open-sans text-[2.8125rem] font-semibold leading-[120%] tracking-[-0.02813rem] xsm:text-[#090909] xsm:text-[1.35417rem]">
          Ban Lãnh Đạo Công Ty
        </h1>
      </div>
    </div>
  )
}
