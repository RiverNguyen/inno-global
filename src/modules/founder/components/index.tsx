'use client'
import Image from 'next/image'

import SectionPagination from '@/components/shared/SectionPagination'

import Banner from './banner'
import Info from './info'

export default function Founder({ locale }: { locale: string }) {
  return (
    <main className="sm:bg-[linear-gradient(112deg,#F8F8F8_11.8%,#F8F8F8_54.52%,#F8F8F8_84.75%)] xsm:bg-white">
      <div className='relative'>
        <Image
          src='/leadership/maskgroup.webp'
          alt="bg-founder"
          width={1920}
          height={694}
          className="absolute bottom-0 left-0 w-full h-full object-cover pointer-events-none xsm:hidden"
        />
        <Banner />
        <Info />
      </div>

      <SectionPagination
        prev={{ href: '', label: 'Trang B' }}
        center={{ href: locale === 'en' ? '/about-us' : '/ve-chung-toi', label: 'Về chúng tôi' }}
        next={{ href: '', label: 'Trang A' }}
      />
    </main>
  )
}