import Image from 'next/image'

import { ISectionBannerAcf } from '@/interfaces/about-us.interface'

interface SectionBannerProps {
  bannerAcfData: ISectionBannerAcf
}

export default function SectionBanner({ bannerAcfData }: SectionBannerProps) {
  return (
    <section className='xsm:h-[21.09375rem] relative h-[29.42708rem] overflow-hidden bg-[#F8F8F8]'>
      <div className='xsm:hidden absolute top-0 left-0 z-0 block h-full w-full'>
        {bannerAcfData?.background_pc && (
          <Image
            alt={bannerAcfData?.background_pc?.alt || ''}
            width={1600}
            height={565}
            loading='eager'
            src={bannerAcfData?.background_pc?.url}
            className='h-full w-full object-cover'
          />
        )}
      </div>

      <div className='xsm:block absolute top-0 left-0 z-0 hidden h-full w-full'>
        {bannerAcfData?.background_mobile && (
          <Image
            alt={bannerAcfData?.background_mobile?.alt || ''}
            width={375}
            height={405}
            loading='eager'
            src={bannerAcfData?.background_mobile?.url}
            className='h-full w-full object-cover'
          />
        )}
      </div>

      <div className='xsm:hidden absolute top-0 left-0 z-1 h-full w-full bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_28%,rgba(0,0,0,0.50)_155.43%)]'></div>
    </section>
  )
}
