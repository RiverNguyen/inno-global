'use client'

import Link from 'next/link'
import type { ReactNode, SVGProps } from 'react'

import { cn } from '@/lib/utils'

type PaginationLink = {
  href?: string
  label: ReactNode
}

export default function SectionPagination({
  prev,
  center,
  next,
  className,
}: {
  prev?: PaginationLink
  center?: PaginationLink
  next?: PaginationLink
  className?: string
}) {
  return (
    <div className={cn('bg-white py-[2.96875rem] xsm:py-[3.33333rem] xsm:px-[0.83333rem]', className)}>
      <div className="flex max-w-[75.1rem] mx-auto justify-between items-center">
        {prev && prev.href !== undefined && (
          <Link href={prev.href} className="flex items-center gap-[0.3125rem] cursor-pointer">
            <ICArrowLeft className="size-[0.83333rem] xsm:size-[0.625rem]" />
            <span className="text-[#D32F2F] font-open-sans text-[0.83333rem] leading-[150%] [text-box-trim:trim-both] [text-box-edge:cap_alphabetic] xsm:text-[0.625rem]">
              {prev.label}
            </span>
          </Link>
        )}

        {center && center.href !== undefined && (
          <Link
            href={center.href}
            className="flex-center py-[0.41667rem] border-b border-[#D32F2F] text-[#D32F2F] font-open-sans text-[0.83333rem] font-semibold leading-[130%] tracking-[-0.00833rem] xsm:text-[0.625rem] xsm:leading-[150%] xsm:tracking-normal"
          >
            {center.label}
          </Link>
        )}

        {next && next.href !== undefined && (
          <Link href={next.href} className="flex items-center gap-[0.375rem] cursor-pointer">
            <span className="text-[#D32F2F] font-open-sans text-[0.83333rem] leading-[150%] [text-box-trim:trim-both] [text-box-edge:cap_alphabetic] xsm:text-[0.625rem]">
              {next.label}
            </span>
            <ICArrowLeft className="w-[1rem] h-[1rem] rotate-180" />
          </Link>
        )}
      </div>
    </div>
  )
}

const ICArrowLeft = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M6.38016 3.95312L2.3335 7.99979L6.38016 12.0465"
        stroke="#D32F2F"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
