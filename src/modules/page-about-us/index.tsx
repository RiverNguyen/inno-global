import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'

import Breadcrumb from '@/components/shared/Breadcrumb'
import ROUTES from '@/configs/routes'
import { IAboutUsAcfDataRes } from '@/interfaces/about-us.interface'
import SectionAbout from '@/modules/page-about-us/sections/SectionAbout'
import SectionBanner from '@/modules/page-about-us/sections/SectionBanner'
import SectionMission from '@/modules/page-about-us/sections/SectionMission'
import SectionVision from '@/modules/page-about-us/sections/SectionVision'

interface PageAboutUsProps {
  acfData: IAboutUsAcfDataRes
}

export default function PageAboutUs({ acfData }: PageAboutUsProps) {
  const t = useTranslations('Breadcrumb')
  const locale = useLocale()
  const navBreadcrumbItems = [
    { label: t('homePage'), href: locale === 'vi' ? ROUTES.homeVi : ROUTES.homeEn },
  ]
  const lastBreadcrumbItem = { label: t('aboutUsPage') }
  return (
    <main className='font-open-sans relative overflow-hidden bg-white'>
      <Image
        alt=''
        width={1920}
        height={1275}
        src={'/images/about-us/background-pc.webp'}
        className='pointer-events-none absolute top-[52.3125rem] left-0 h-auto w-full'
      />
      <div className='relative z-1'>
        <SectionBanner bannerAcfData={acfData?.acf?.banner} />
        <div className='xsm:py-0 xsm:space-y-0 mx-auto max-w-[75rem] space-y-[7.29167rem] py-[6.25rem]'>
          <Breadcrumb
            navItems={navBreadcrumbItems}
            lastItem={lastBreadcrumbItem}
            classNameContainer='mb-[1.25rem] xsm:hidden'
          />
          <SectionAbout aboutUsAcf={acfData?.acf?.about_us} />
          <div className='xsm:bg-transparent xsm:shadow-none relative bg-white shadow-[0_4px_32px_0_rgba(0,0,0,0.06)] sm:overflow-hidden'>
            <Image
              alt=''
              width={1440}
              height={910}
              src='/images/about-us/bg-frame.svg'
              className='xsm:hidden absolute top-0 left-0 z-0 size-full object-cover'
            />
            <div className='xsm:space-y-[1.66667rem] xsm:pt-[3.33333rem] xsm:px-[0.83333rem] xsm:pb-[2.5rem] relative z-1'>
              <SectionVision visionAcfData={acfData?.acf?.vision} />
              <SectionMission missionAcfData={acfData?.acf?.mission} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
