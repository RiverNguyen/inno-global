'use client'

import Image from 'next/image'

export default function AboutUsHome() {
  return (
    <div className='h-screen w-full relative'>
      <Image
        src='/home/d-bg-about-us.jpg'
        alt='About Us'
        fill
        sizes='100vw'
        className='object-cover size-full'
      />
      <div className='absolute top-0 right-0 z-10 h-screen container flex justify-end'>
        <div className='w-[36.4rem] h-fit'></div>
      </div>
    </div>
  )
}
