'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

import FormContact from './components/form-contact'
export default function Contact({ locale }: { locale: string }) {
  const t = useTranslations('ContactForm')
  return (
    <main className='relative w-full min-h-screen h-[56.25rem] xsm:h-full'>
      <Image
        src='/contact/bg.webp'
        alt='Contact'
        fill
        priority
        className='object-cover xsm:hidden'
      />

      <div className='absolute-y-center right-[10.42rem] w-[38.75rem] p-[1.66667rem] flex flex-col gap-[2.08333rem] backdrop-blur-sm xsm:static xsm:w-full xsm:translate-x-0 xsm:translate-y-0 xsm:p-[5rem_0.83333rem_5.36458rem_0.83333rem] xsm:gap-[1.25rem] xsm:backdrop-blur-none'>
        <h1 className='text-[rgba(9,9,9,0.80)] font-open-sans text-[2.8125rem] font-semibold leading-[120%] tracking-[-0.02813rem] xsm:text-[1.35417rem] xsm:tracking-normal'>
          {t('title')}
        </h1>
        <FormContact locale={locale} />
      </div>
    </main>
  )
}
