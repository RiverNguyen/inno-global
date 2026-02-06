'use client'
import Image from 'next/image'

import SectionPagination from '@/components/shared/SectionPagination'
import { ILeadership } from '@/interface/leadership.interface'

import Banner from './banner'
import Info from './info'

export default function Founder({ locale, leader }: { locale: string; leader: ILeadership }) {
  return (
    <main className='xsm:bg-white sm:bg-[linear-gradient(112deg,#F8F8F8_11.8%,#F8F8F8_54.52%,#F8F8F8_84.75%)]'>
      <div className='relative'>
        <Image
          src='/leadership/maskgroup.webp'
          alt='bg-founder'
          width={1920}
          height={694}
          className='xsm:hidden pointer-events-none absolute bottom-0 left-0 h-full w-full object-cover'
        />
        <Banner />
        <Info leader={leader} />
      </div>

      <SectionPagination
        prev={{ href: '', label: 'Trang B' }}
        center={{ href: locale === 'en' ? '/about-us' : '/ve-chung-toi', label: 'Về chúng tôi' }}
        next={{ href: '', label: 'Trang A' }}
      />
    </main>
  )
}
