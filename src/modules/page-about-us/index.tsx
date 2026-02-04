import Image from 'next/image'

import Breadcrumb from '@/components/shared/Breadcrumb'
import SectionAbout from '@/modules/page-about-us/sections/SectionAbout'
import SectionBanner from '@/modules/page-about-us/sections/SectionBanner'
import SectionMission from '@/modules/page-about-us/sections/SectionMission'
import SectionVision from '@/modules/page-about-us/sections/SectionVision'

export default function PageAboutUs() {
  return (
    <main className='font-open-sans relative bg-white'>
      <SectionBanner />
      <div className='xsm:py-0 xsm:space-y-0 mx-auto max-w-[75rem] space-y-[7.29167rem] py-[6.25rem]'>
        <Breadcrumb
          navItems={[{ label: 'Trang chủ', href: '/' }]}
          lastItem={{ label: 'Về chúng tôi' }}
          classNameContainer='mb-[1.25rem] xsm:hidden'
        />
        <SectionAbout />
        <div className='xsm:bg-transparent xsm:shadow-none relative bg-white shadow-[0_4px_32px_0_rgba(0,0,0,0.06)] sm:overflow-hidden'>
          <Image
            alt=''
            width={1440}
            height={910}
            src='/images/about-us/bg-frame.svg'
            className='xsm:hidden absolute top-0 left-0 z-0 size-full object-cover'
          />
          <div className='xsm:space-y-[1.66667rem] xsm:pt-[3.33333rem] xsm:px-[0.83333rem] xsm:pb-[2.5rem] relative z-1'>
            <SectionVision />
            <SectionMission />
          </div>
        </div>
      </div>
    </main>
  )
}
