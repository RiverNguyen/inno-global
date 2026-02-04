import Image from 'next/image'
import React from 'react'

export default function SectionBanner() {
  return (
    <section className='xsm:h-[21.09375rem] relative h-[29.42708rem] overflow-hidden bg-[#F8F8F8]'>
      <div className='xsm:hidden absolute top-0 left-0 z-0 block h-full w-full'>
        <Image
          alt=''
          width={1600}
          height={565}
          loading='eager'
          src={'/images/about-us/d-banner-pc.jpg'}
          className='h-full w-full object-cover'
        />
      </div>

      <div className='xsm:block absolute top-0 left-0 z-0 hidden h-full w-full'>
        <Image
          alt=''
          width={375}
          height={405}
          loading='eager'
          src={'/images/about-us/d-banner-mb.jpg'}
          className='h-full w-full object-cover'
        />
      </div>

      <div className='xsm:hidden absolute top-0 left-0 z-1 h-full w-full bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_28%,rgba(0,0,0,0.50)_155.43%)]'></div>
    </section>
  )
}
