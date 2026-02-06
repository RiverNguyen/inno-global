'use client'

import Link from 'next/link'
import type { ReactNode, SVGProps } from 'react'

type PaginationLink = {
  href?: string
  label: ReactNode
}

export default function SectionPagination({
  prev,
  center,
  next,
}: {
  prev?: PaginationLink
  center: PaginationLink
  next?: PaginationLink
}) {
  return (
    <div className='xsm:py-[3.33333rem] xsm:px-[0.83333rem] bg-white py-[2.96875rem]'>
      <div className='mx-auto flex max-w-[75.1rem] items-center justify-between'>
        {prev && prev.href !== undefined ? (
          <Link
            href={prev.href}
            className='flex cursor-pointer items-center gap-[0.3125rem]'
          >
            <ICArrowLeft className='xsm:size-[0.625rem] size-[0.83333rem]' />
            <span className='font-open-sans xsm:text-[0.625rem] text-[0.83333rem] leading-[150%] text-[#D32F2F] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>
              {prev.label}
            </span>
          </Link>
        ) : (
          <div className='flex items-center gap-[0.3125rem]'>
            <ICArrowLeft className='xsm:size-[0.625rem] size-[0.83333rem]' />
            <span className='font-open-sans xsm:text-[0.625rem] text-[0.83333rem] leading-[150%] text-[#D32F2F] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>
              {prev?.label}
            </span>
          </div>
        )}

        {center.href !== undefined ? (
          <Link
            href={center.href}
            className='flex-center font-open-sans xsm:text-[0.625rem] xsm:leading-[150%] xsm:tracking-normal border-b border-[#D32F2F] py-[0.41667rem] text-[0.83333rem] leading-[130%] font-semibold tracking-[-0.00833rem] text-[#D32F2F]'
          >
            {center.label}
          </Link>
        ) : (
          <div className='flex-center font-open-sans xsm:text-[0.625rem] xsm:leading-[150%] xsm:tracking-normal border-b border-[#D32F2F] py-[0.41667rem] text-[0.83333rem] leading-[130%] font-semibold tracking-[-0.00833rem] text-[#D32F2F]'>
            {center.label}
          </div>
        )}

        {next && next.href !== undefined ? (
          <Link
            href={next.href}
            className='flex cursor-pointer items-center gap-[0.375rem]'
          >
            <span className='font-open-sans xsm:text-[0.625rem] text-[0.83333rem] leading-[150%] text-[#D32F2F] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>
              {next.label}
            </span>
            <ICArrowLeft className='h-[1rem] w-[1rem] rotate-180' />
          </Link>
        ) : (
          <div className='flex items-center gap-[0.375rem]'>
            <span className='font-open-sans xsm:text-[0.625rem] text-[0.83333rem] leading-[150%] text-[#D32F2F] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>
              {next?.label}
            </span>
            <ICArrowLeft className='h-[1rem] w-[1rem] rotate-180' />
          </div>
        )}
      </div>
    </div>
  )
}

const ICArrowLeft = (props: SVGProps<SVGSVGElement>) => {
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
        d='M6.38016 3.95312L2.3335 7.99979L6.38016 12.0465'
        stroke='#D32F2F'
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
