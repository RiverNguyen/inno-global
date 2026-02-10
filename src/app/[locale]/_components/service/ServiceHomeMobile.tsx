'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

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
    <div className='px-[0.83rem] py-[3.33rem] sm:hidden space-y-[1.67rem]'>
      <h2 className='text-text-100 text-center text-[1.14583rem] font-semibold leading-[1.2] tracking-[-0.01146rem]'>
        {title}
      </h2>
      <div className='grid grid-cols-2 gap-[0.31rem]'>
        {services.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedService(item)}
            className='relative rounded-[0.20833rem] overflow-hidden h-[5.3125rem] px-[0.625rem] flex justify-between items-center cursor-pointer  transition-transform'
          >
            <Image
              src={item.image || '/default.webp'}
              alt={item.title}
              width={169}
              height={102}
              quality={100}
              className='object-cover absolute w-full h-full top-0 left-0'
            />
            <div className='absolute opacity-[0.46] w-full h-full top-0 left-0 z-1 bg-[linear-gradient(180deg,#000_47.12%,rgba(29,29,29,0.72)_71.63%,rgba(102,102,102,0.00)_100%)]'></div>
            <div className='z-2 w-full flex justify-between items-center'>
              <p className='max-w-[6.71875rem] mb-body-14-r text-white'>{item.title}</p>
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
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          service ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />

      {/* Card Content (Bottom Sheet) */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 rounded-[1.25rem_1.25rem_0_0] bg-white transition-transform duration-300 ease-in-out ${
          service ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className='p-[0.83rem] flex justify-between items-center border-b-[0.8px] border-solid border-[rgba(9,9,9,0.08)]'>
          <p className='mb-header-16-m capitalize'>{t('bottomSheetTitle')}</p>
          <div
            className='size-[1.25rem] rounded-full bg-black/10 flex-center cursor-pointer'
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
          <p className='text-[0.72917rem] font-semibold leading-[1.3] tracking-[-0.00729rem] mb-[0.52rem]'>
            {service?.title}
          </p>
          <p className='text-[0.625rem] text-justify text-text-80 mb-4'>{service?.description}</p>
          <Link
            href={service?.href || '#'}
            className='px-[1.25rem] py-[0.68rem] rounded-[5.20833rem] border-solid border-[1px] border-text-60 flex items-center justify-center space-x-[0.21rem] w-full'
          >
            <p className='text-[0.67708rem] text-text-100 font-normal'>{t('viewDetail')}</p>
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
