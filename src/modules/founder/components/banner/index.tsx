import { useTranslations } from 'next-intl'

import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb'

export default function Banner() {
  const t = useTranslations()

  return (
    <div className="bg-white">
      <div className="w-full max-w-[75rem] mx-auto flex flex-col gap-[1.25rem] py-[2.08333rem] xsm:p-[1.66667rem_0.83333rem_0.83333rem_0.83333rem]">
        {/* Breadcrumb */}
        <Breadcrumb className="xsm:hidden">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">{t('FounderPage.home')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/about">{t('FounderPage.about')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{t('FounderPage.title')}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-[rgba(9,9,9,0.80)] font-open-sans text-[2.8125rem] font-semibold leading-[120%] tracking-[-0.02813rem] xsm:text-[#090909] xsm:text-[1.35417rem]">
          {t('FounderPage.title')}
        </h1>
      </div>
    </div>
  )
}
