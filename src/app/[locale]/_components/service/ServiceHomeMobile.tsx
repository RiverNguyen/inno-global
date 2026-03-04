'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { Link } from '@/i18n/navigation'

type ServiceHomeItem = {
  title: string
  description: string
  image: string
  href: string
}

export default function ServiceHomeMobile({ services, title }: { services: ServiceHomeItem[]; title: string }) {
  const t = useTranslations('ServiceSection')
  const [selectedService, setSelectedService] = useState<ServiceHomeItem | null>(null)

  return (
    <div className='space-y-[1.67rem] px-[0.83rem] py-[3.33rem] sm:hidden'>
      <h2 className='text-text-100 text-center text-[1.14583rem] leading-[1.2] font-semibold tracking-[-0.01146rem]'>
        {title}
      </h2>
      <div className='grid grid-cols-2 gap-[0.31rem]'>
        {services.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedService(item)}
            className='relative flex h-[5.3125rem] cursor-pointer items-center justify-between overflow-hidden rounded-[0.20833rem] px-[0.625rem] transition-transform'
          >
            <Image
              src={item.image || '/default.webp'}
              alt={item.title}
              width={169}
              height={102}
              quality={100}
              className='absolute top-0 left-0 h-full w-full object-cover'
            />
            <div className='absolute top-0 left-0 z-1 h-full w-full bg-[linear-gradient(180deg,#000_47.12%,rgba(29,29,29,0.72)_71.63%,rgba(102,102,102,0.00)_100%)] opacity-[0.46]'></div>
            <div className='z-2 flex w-full items-center justify-between'>
              <p className='mb-body-14-r max-w-[6.71875rem] text-white'>{item.title}</p>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='7'
                height='11'
                viewBox='0 0 7 11'
                fill='none'
                className='transition-transform group-hover:translate-x-1'
              >
                <path
                  d='M3.96486 5.17871L6.12832 5.18545L3.96631 5.17871L6.20402e-05 0.942809L0.942871 0L6.12832 5.18545L0.942867 10.3709L5.79098e-05 9.42809L3.96486 5.17871Z'
                  fill='white'
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      <CardService
        service={selectedService}
        onClose={() => setSelectedService(null)}
        t={t}
      />
    </div>
  )
}

const CardService = ({
  service,
  onClose,
  t,
}: {
  service: ServiceHomeItem | null
  onClose: () => void
  t: (key: string) => string
}) => {
  return (
    <>
      {/* Overlay Background */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          service ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Card Content (Bottom Sheet) */}
      <div
        className={`fixed right-0 bottom-0 left-0 z-50 rounded-[1.25rem_1.25rem_0_0] bg-white transition-transform duration-300 ease-in-out ${
          service ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className='flex items-center justify-between border-b-[0.8px] border-solid border-[rgba(9,9,9,0.08)] p-[0.83rem]'>
          <p className='mb-header-16-m capitalize'>{t('bottomSheetTitle')}</p>
          <div
            className='flex-center size-[1.25rem] cursor-pointer rounded-full bg-black/10'
            onClick={onClose}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='14'
              height='14'
              viewBox='0 0 14 14'
              fill='none'
            >
              <path
                d='M2.91797 2.91699L11.0841 11.0831'
                stroke='#292D32'
                strokeWidth='1.05882'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M2.91689 11.0831L11.083 2.91699'
                stroke='#292D32'
                strokeWidth='1.05882'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </div>
        <div className='p-[0.83rem_0.83rem_1.56rem_0.83rem]'>
          <p className='mb-[0.52rem] text-[0.72917rem] leading-[1.3] font-semibold tracking-[-0.00729rem]'>
            {service?.title}
          </p>
          <p className='text-text-80 mb-4 text-justify text-[0.625rem]'>{service?.description}</p>
          <Link
            href={service?.href || '#'}
            className='border-text-60 flex w-full items-center justify-center space-x-[0.21rem] rounded-[5.20833rem] border-[1px] border-solid px-[1.25rem] py-[0.68rem]'
          >
            <p className='text-text-100 text-[0.67708rem] font-normal'>{t('viewDetail')}</p>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='13'
              height='13'
              viewBox='0 0 13 13'
              fill='none'
              className='size-[0.67708rem]'
            >
              <path
                d='M9.02765 7.04719L2.43442 7.04719L2.43442 5.96402L9.02727 5.96363L6.1221 3.05846L6.88813 2.29243L11.1013 6.5056L6.88813 10.7188L6.12209 9.95275L9.02765 7.04719Z'
                fill='#090909'
              />
            </svg>
          </Link>
        </div>
      </div>
    </>
  )
}
