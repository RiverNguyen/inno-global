'use client'

import Image from 'next/image'
import { useState, type SVGProps } from 'react'

import { Link } from '@/i18n/navigation'

import ServiceDetailModal from './ServiceDetailModal'

interface ServiceCardProps {
  href: string
  title: string
  description?: string
  imageSrc: string
  /** Optional subtitle, e.g. "(Structural Engineering)" */
  subtitle?: string
}

export default function ServiceCard({ href, title, description = '', imageSrc, subtitle }: ServiceCardProps) {
  const [modalOpen, setModalOpen] = useState(false)

  const cardBody = (
    <div className='group xsm:rounded-[0.20833rem] xsm:h-[5.29167rem] relative flex h-[20.83rem] flex-col overflow-hidden'>
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={title || 'service'}
          width={704}
          height={363}
          className='xsm:h-full absolute top-0 left-0 h-[18.9rem] w-full object-cover'
        />
      ) : (
        <div className='xsm:h-full absolute top-0 left-0 h-[18.9rem] w-full bg-[#E9E9E9]' />
      )}

      <div className='absolute inset-0 bg-[linear-gradient(180deg,#000_47.12%,rgba(29,29,29,0.72)_71.63%,rgba(102,102,102,0.00)_100%)] opacity-[0.46] sm:hidden'></div>

      <div className='xsm:absolute-y-center xsm:bg-transparent xsm:py-[0.20833rem] xsm:px-[0.41667rem] xsm:justify-start xsm:gap-[0.41667rem] absolute top-full left-0 flex w-full translate-y-[-4.8rem] flex-col justify-center gap-[0.52083rem] bg-[#F0F0F0] p-[1.45833rem]'>
        <div className='flex items-center justify-between'>
          <h3 className='group-hover:text-primary-red-100 text-en font-open-sans xsm:line-clamp-2 xsm:text-white xsm:text-[0.72917rem] xsm:flex-1 line-clamp-1 pc-24-24-semi transition-colors duration-500 ease-[cubic-bezier(0.41,0.01,0,1)] sm:translate-y-[-0.15rem]'>
            {title}
          </h3>
          <div className='flex-center xsm:hidden rounded-full bg-[rgba(9,9,9,0.10)] p-[0.46875rem] backdrop-blur-[20px]'>
            <IconChevronRight className='size-[0.83333rem]' />
          </div>
          <IconArrowRight className='xsm:block hidden size-[0.72917rem]' />
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile: navigate instead of modal */}
      <Link
        data-service-item
        href={href}
        className='block sm:hidden'
      >
        {cardBody}
      </Link>

      {/* Desktop+: open modal */}
      <div
        data-service-item
        className='hidden cursor-pointer sm:block'
        onClick={() => setModalOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setModalOpen(true)
          }
        }}
        role='button'
        tabIndex={0}
      >
        {cardBody}
      </div>

      <ServiceDetailModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title={title}
        subtitle={subtitle}
        description={description}
        imageSrc={imageSrc}
        href={href}
      />
    </>
  )
}

const IconChevronRight = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      {...props}
    >
      <path
        d='M4 8H12'
        stroke='#292D32'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M8 12V4'
        stroke='#292D32'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

const IconArrowRight = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='14'
      height='14'
      viewBox='0 0 14 14'
      fill='none'
      {...props}
    >
      <path
        d='M9.72134 7.58901L2.62093 7.58902L2.62093 6.42253L9.72093 6.42211L6.59228 3.29346L7.41723 2.4685L11.9545 7.00577L7.41723 11.543L6.59227 10.7181L9.72134 7.58901Z'
        fill='white'
      />
    </svg>
  )
}
