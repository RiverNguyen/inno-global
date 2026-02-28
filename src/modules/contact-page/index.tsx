'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { ITaxonomyRes } from '@/interfaces/taxonomy.interface'

import FormContact from './components/form-contact'
export default function Contact({ locale, serviceTaxonomies }: { locale: string; serviceTaxonomies: ITaxonomyRes }) {
  const t = useTranslations('ContactForm')
  return (
    <main className='xsm:h-full relative h-[56.25rem] min-h-screen w-full'>
      <Image
        src='/contact/bg.webp'
        alt='Contact'
        fill
        priority
        className='xsm:hidden object-cover'
      />

      <div className='absolute-y-center xsm:static xsm:w-full xsm:translate-x-0 xsm:translate-y-0 xsm:p-[5rem_0.83333rem_5.36458rem_0.83333rem] xsm:gap-[1.25rem] xsm:backdrop-blur-none right-[10.42rem] flex w-[38.75rem] flex-col gap-[2.08333rem] p-[1.66667rem] backdrop-blur-sm'>
        <h1 className='font-open-sans xsm:text-[1.35417rem] xsm:tracking-normal text-[2.8125rem] leading-[120%] font-semibold tracking-[-0.02813rem] text-[rgba(9,9,9,0.80)]'>
          {t('title')}
        </h1>
        <FormContact
          locale={locale}
          serviceTaxonomies={serviceTaxonomies}
        />
      </div>
    </main>
  )
}
