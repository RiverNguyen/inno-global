'use client'

import Image from 'next/image'

import FormContact from './components/form-contact'
export default function Contact({ locale }: { locale: string }) {

  return (
    <main className='relative w-full min-h-screen h-[56.25rem]'>
      <Image
        src='/contact/bg.webp'
        alt='Contact'
        fill
        priority
        className='object-cover'
      />

      <div className='absolute-y-center right-[10.42rem] w-[38.75rem] p-[1.66667rem] flex flex-col gap-[2.08333rem] backdrop-blur-sm'>
        <h1 className='text-[rgba(9,9,9,0.80)] font-open-sans text-[2.8125rem] font-semibold leading-[120%] tracking-[-0.02813rem]'>
          Liên hệ
        </h1>
        <FormContact locale={locale} />
      </div>
    </main>
  )
}