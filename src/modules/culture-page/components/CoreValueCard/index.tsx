'use client'

import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import ICClose from '@/components/icons/ICClose'
import useIsMobile from '@/hooks/useIsMobile'
import { ICultureCoreValue } from '@/interfaces/culture.interface'
import { cn } from '@/lib/utils'
import DrawerProvider from '@/provider/DrawerProvider'

const formatNumber = (n: number) => n.toString().padStart(2, '0')

interface CoreValueCardProps {
  item: ICultureCoreValue
  number: number
  pageTitle: string
}

export default function CoreValueCard({ item, number, pageTitle }: CoreValueCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { isMobile, isLoading } = useIsMobile()

  const toggleOpen = () => setIsOpen((prev) => !prev)

  return (
    <>
      <article
        onClick={toggleOpen}
        className={cn(
          'xsm:rounded-[0.20833rem] xsm:p-[1.25rem_0.625rem] xsm:h-[7.03125rem] xsm:flex xsm:items-center relative h-[7.76042rem] cursor-pointer overflow-hidden p-[1.5625rem_1.875rem] transition-all duration-500 ease-[cubic-bezier(0.44,0.02,0,0.99)]',
          isOpen && 'xsm:h-[7.03125rem] h-[24.16667rem]',
        )}
      >
        <Image
          src={item?.image?.url}
          alt={item?.image?.alt}
          width={714}
          height={464}
          className='xsm:h-full absolute top-0 left-0 h-[24.16667rem] w-full object-cover'
        />
        <div
          className={cn(
            'xsm:h-full absolute top-0 left-0 z-1 h-[24.16667rem] w-full bg-[linear-gradient(180deg,#000_61.45%,rgba(29,29,29,0.72)_114.35%,rgba(102,102,102,0.00)_130.43%)] opacity-56 transition-all duration-500 ease-[cubic-bezier(0.44,0.02,0,0.99)]',
            isOpen &&
              'xsm:bg-[linear-gradient(180deg,#000_61.45%,rgba(29,29,29,0.72)_114.35%,rgba(102,102,102,0.00)_130.43%)] xsm:opacity-56 bg-[#000] opacity-60',
          )}
        ></div>
        <div
          className={'xsm:mb-0 relative z-2 mb-[1.675rem] flex w-full items-center justify-between space-x-[1.25rem]'}
        >
          <div>
            <span className='xsm:mb-[0.20833rem] xsm:text-[1.25rem] font-open-sans sm:text-edge-[cap_alphabetic] mb-[0.625rem] inline-block text-[1.66667rem] leading-[120%] font-semibold tracking-[-0.01667rem] text-white sm:[text-box-trim:trim-both]'>
              {formatNumber(number)}
            </span>

            <h3 className='xsm:text-[0.72917rem] font-open-sans xsm:min-h-auto line-clamp-2 min-h-[2.875rem] text-[0.9275rem] leading-[150%] font-semibold text-white'>
              {item?.title}
            </h3>
          </div>
          <div className='xsm:size-[1.45833rem] flex size-[1.77083rem] shrink-0 items-center justify-center rounded-full bg-[rgba(255,255,255,0.16)] backdrop-blur-[20px]'>
            <ChevronDown
              className={cn(
                'xsm:size-[0.625rem] xsm:rotate-180 size-[0.83333rem] text-white transition-all duration-500 ease-[cubic-bezier(0.44,0.02,0,0.99)]',
                isOpen && 'rotate-180',
              )}
            />
          </div>
        </div>
        <div
          className={cn(
            'font-open-sans xsm:hidden relative z-2 w-full space-y-[1.67rem] border-t border-t-white/30 pt-[1.56rem] text-white',
          )}
        >
          {Array.isArray(item?.descs) &&
            item.descs.map((desc, i) => (
              <div key={i}>
                <h3 className='mb-[0.625rem] text-[0.9375rem] leading-[150%] font-semibold'>{desc?.title}</h3>
                <p className='text-edge-[cap_alphabetic] line-clamp-4 text-[0.72917rem] leading-[150%] [text-box-trim:trim-both]'>
                  {desc?.content}
                </p>
              </div>
            ))}
        </div>
      </article>
      {isMobile && !isLoading && (
        <DrawerProvider
          open={isOpen}
          setOpen={setIsOpen}
          className='z-101'
        >
          <div className='flex items-center justify-between space-x-[0.52083rem] p-[0.83333rem]'>
            <p className='font-open-sans text-[0.83333rem] leading-[150%] font-semibold capitalize'>{pageTitle}</p>
            <button
              type='button'
              onClick={() => setIsOpen(false)}
              className='flex size-[1.25rem] cursor-pointer items-center justify-center rounded-full bg-[rgba(9,9,9,0.10)] backdrop-blur-[14.117646217346191px]'
            >
              <ICClose className='size-[0.72917rem]' />
            </button>
          </div>
          <div className='space-y-[1.5625rem]'>
            <div className='h-[0.05208rem] w-full bg-[rgba(9,9,9,0.08)]'></div>
            <div className='font-open-sans space-y-[1.35417rem] p-[0_0.83333rem_1.5625rem_0.83333rem]'>
              {Array.isArray(item?.descs) &&
                item.descs.map((desc, i) => (
                  <div key={i}>
                    <h3 className='xsm:mb-[0.52083rem] xsm:text-[0.72917rem] xsm:text-[#090909] mb-[0.625rem] text-[0.9375rem] leading-[150%] font-semibold'>
                      {desc?.title}
                    </h3>
                    <p className='sm:text-edge-[cap_alphabetic] xsm:text-[0.625rem] xsm:opacity-90 xsm:text-[rgba(9,9,9,0.80)] text-[0.72917rem] leading-[150%] sm:line-clamp-4 sm:[text-box-trim:trim-both]'>
                      {desc?.content}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </DrawerProvider>
      )}
    </>
  )
}
