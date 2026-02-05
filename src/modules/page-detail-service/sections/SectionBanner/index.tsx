import { useLocale, useTranslations } from 'next-intl'

import Breadcrumb from '@/components/shared/Breadcrumb'
import ROUTES from '@/configs/routes'
import { ISlideItemAcfData } from '@/interfaces/detail-service.interface'
import BannerSlides from '@/modules/page-detail-service/sections/SectionBanner/BannerSlides'

interface SectionBannerProps {
  title: string
  description: string
  slideItems: ISlideItemAcfData[]
}

export default function SectionBanner({ title, description, slideItems }: SectionBannerProps) {
  const t = useTranslations('Breadcrumb')
  const locale = useLocale()
  const navBreadcrumbItems = [
    { label: t('homePage'), href: locale === 'vi' ? ROUTES.homeVi : ROUTES.homeEn },
    { label: t('servicePage'), href: locale === 'vi' ? ROUTES.servicesVi : ROUTES.servicesEn },
  ]
  const lastBreadcrumbItem = { label: t('detailServicePage') }

  return (
    <section className='xsm:h-[21.09375rem] relative h-[29.42708rem]'>
      <div className='absolute top-0 left-0 z-0 h-full w-full'>
        <BannerSlides slideItems={slideItems || []} />
      </div>
      <div className='xsm:bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_35%,rgba(0,0,0,0.74)_50%,#000_70%)] xsm:top-[unset] xsm:bottom-0 xsm:h-[18.17708rem] pointer-events-none absolute top-0 left-0 z-1 size-full bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_49.89%,rgba(0,0,0,0.74)_79.8%,#000_96.54%)] opacity-40'></div>
      <div className='xsm:opacity-60 xsm:h-[16.92708rem] xsm:top-[unset] xsm:bottom-0 xsm:bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_49.89%,rgba(0,0,0,0.74)_75.85%,#000_96.54%)] pointer-events-none absolute top-0 left-0 z-1 size-full bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_49.89%,rgba(0,0,0,0.74)_79.8%,#000_96.54%)] opacity-40'></div>

      <div className='xsm:py-[1.25rem] xsm:px-[0.83333rem] absolute right-0 bottom-0 left-0 z-5 mx-auto max-w-[75rem] py-[3.33333rem]'>
        <div className='xsm:gap-y-[0.78125rem] flex flex-col gap-y-[0.9375rem]'>
          <Breadcrumb
            navItems={navBreadcrumbItems}
            lastItem={lastBreadcrumbItem}
            classNameNavItems='text-white/50'
            classNameLastItem='text-white'
            classNameIcon='text-white'
            classNameContainer='xsm:hidden'
          />
          <h1 className='xsm:text-[1.35417rem] xsm:tracking-normal text-[2.8125rem] leading-[1.2] font-semibold tracking-[-0.02813rem] text-white'>
            {title || ''}
          </h1>
          <p className='xsm:text-[0.72917rem] xsm:text-trim-both xsm:text-edge-[cap_alphabetic] max-w-[37.5rem] text-[0.9375rem] leading-[1.5] text-white/90'>
            {description || ''}
          </p>
        </div>
      </div>
    </section>
  )
}
