'use client'

import { ChevronRight, X } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { Dialog, DialogClose, DialogContent, DialogOverlay, DialogPortal } from '@/components/ui/dialog'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

interface ServiceDetailModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  subtitle?: string
  description: string
  imageSrc: string
  href: string
}

export default function ServiceDetailModal({
  open,
  onOpenChange,
  title,
  subtitle,
  description,
  imageSrc,
  href,
}: ServiceDetailModalProps) {
  const t = useTranslations('ServiceListPage')

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogPortal>
        <DialogOverlay className='z-[1000]' />
        <DialogContent
          hideCloseButton
          className={cn(
            'fixed top-1/2 left-1/2 z-[1001] w-full rounded-none! max-w-[47.5rem] max-h-[90vh] -translate-x-1/2 -translate-y-1/2',
            'overflow-y-auto border-0 bg-white p-0 shadow-xl',
            'data-[state=open]:animate-in! data-[state=closed]:animate-out!',
            'data-[state=closed]:fade-out-0! data-[state=open]:fade-in-0!',
            'data-[state=closed]:zoom-out-98! data-[state=open]:zoom-in-98!',
            'duration-300 ease-out',
            'xsm:max-h-[90vh] xsm:w-[calc(100%-2rem)] gap-0 space-y-4',
          )}
        >
          <div className='xsm:px-[0.83333rem] xsm:pt-[0.83333rem] flex items-center justify-between gap-4 px-[1.25rem] pt-[1.04rem]'>
            <h2 className='text-left pc-24-24-semi'>
              <span className='text-primary-red-100'>{title}</span>
              {subtitle ? <span className='ml-1 text-text-100'> ({subtitle})</span> : null}
            </h2>
            <DialogClose>
              <X
                className='size-5'
                strokeWidth={1.5}
              />
              <span className='sr-only'>Close</span>
            </DialogClose>
          </div>

          <div className='xsm:px-[0.83333rem] xsm:pb-[0.83333rem] flex flex-col px-[1.25rem] pb-[1.25rem]'>
            <div className='relative h-[21.1062rem] w-full overflow-hidden'>
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={title}
                  fill
                  className='object-cover'
                  sizes='(max-width: 640px) 100vw, 43.75rem'
                />
              ) : (
                <div className='h-full w-full bg-[#E9E9E9]' />
              )}
            </div>

            {description ? <p className='pc-body-16-r text-text-60 opacity-90 mt-4 mb-8'>{description}</p> : null}

            <Link
              href={href}
              className='hover:underline inline-flex w-fit items-center gap-[0.3125rem] text-[0.83rem] font-medium text-[#0077FF] transition-colors hover:text-[#1D4ED8]'
            >
              {t('viewServiceDetail')}
              {/* <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                className='size-[1.25rem]'
              >
                <path
                  d='M14.4297 5.92969L20.4997 11.9997L14.4297 18.0697'
                  stroke='#0077FF'
                  strokeWidth='1.5'
                  strokeMiterlimit='10'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M3.5 12H20.33'
                  stroke='#0077FF'
                  strokeWidth='1.5'
                  strokeMiterlimit='10'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg> */}
              <ChevronRight
                className='size-4 text-[#0077FF]'
                strokeWidth={1.5}
              />
            </Link>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
