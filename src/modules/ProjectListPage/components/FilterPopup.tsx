'use client'
import { useTranslations } from 'next-intl'

import ICChevronDown from '@/components/icons/ICChevronDown'
import ICChevronRight from '@/components/icons/ICChevronRight'
import ICClose from '@/components/icons/ICClose'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { slugify } from '@/utils/slugify'

interface FilterPopupProps {
  label: string
  items: {
    label: string
    value: string
  }[]
  onChange: () => void
}

export default function FilterPopup({ label, items, onChange }: FilterPopupProps) {
  const t = useTranslations('ProjectListPage')

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <button
            type='button'
            className='font-open-sans text-[0.72917rem] font-normal leading-[150%] text-[#090909] h-[2.5rem] p-[0.83333rem_1.14583rem] flex items-center justify-center rounded-[5.20833rem] border border-[rgba(9,9,9,0.08)] space-x-[0.52083rem] cursor-pointer xsm:hidden'
          >
            <span className='[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>
              {label}
            </span>
            <ICChevronDown className='size-[0.83333rem] shrink-0' />
          </button>
        </PopoverTrigger>
        <PopoverContent className='p-[1.25rem_1.04167rem] w-auto bg-white rounded-[0.20833rem] shadow-[0_16px_30px_0_rgba(0,0,0,0.05)] border-none space-y-[1.04167rem]'>
          {items.map((item, i) => (
            <label
              key={i}
              htmlFor={slugify(item.value)}
              className='flex items-center space-x-[0.52083rem] w-full cursor-pointer group'
            >
              <div className='size-[1.25rem] flex items-center justify-center'>
                <input
                  type='checkbox'
                  id={slugify(item.value)}
                  onChange={onChange}
                  className='size-[1.04167rem] rounded-[0.20833rem] text-[#D32F2F] ring-0 border-[#AEAEB2] ring-offset-0 outline-none checked:border-[#0000]'
                />
              </div>
              <span className='font-open-sans text-[0.72917rem] font-normal leading-[150%] text-[rgba(9,9,9,0.60)] group-has-checked:text-[#D32F2F] select-none [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>
                {item.label}
              </span>
            </label>
          ))}
        </PopoverContent>
      </Popover>

      <Drawer>
        <DrawerTrigger asChild>
          <button
            type='button'
            className='font-open-sans text-[0.625rem] font-normal leading-[140%] tracking-[-0.00625rem] text-[#090909] p-[0.52083rem_0.83333rem] flex items-center justify-center rounded-[5.20833rem] border border-[rgba(9,9,9,0.08)] space-x-[0.52083rem] cursor-pointer sm:hidden'
          >
            <span className='whitespace-nowrap'>{label}</span>
            <ICChevronDown className='size-[0.72917rem] shrink-0' />
          </button>
        </DrawerTrigger>
        <DrawerContent
          hiddenDrag
          className=' bg-white rounded-[1.25rem_1.25rem_0_0]'
        >
          <DrawerHeader className='p-[0.83333rem] flex items-center justify-between border-b border-b-[rgba(9,9,9,0.08)]'>
            <DrawerTitle className='font-open-sans text-[0.83333rem] font-semibold leading-[150%] capitalize'>
              {label}
            </DrawerTitle>
            <DrawerClose asChild>
              <button
                type='button'
                className='size-[1.25rem] flex items-center justify-center rounded-full bg-[rgba(9,9,9,0.10)] backdrop-blur-[14.117646217346191px] cursor-pointer'
              >
                <ICClose className='size-[0.72917rem]' />
              </button>
            </DrawerClose>
          </DrawerHeader>
          <div className='p-[0.83333rem_0.83333rem_1.66667rem_0.83333rem] space-y-[0.625rem]'>
            {items.map((item, i) => (
              <label
                htmlFor={slugify(item.value)}
                key={i}
                className='group flex items-center space-x-[0.52083rem]'
              >
                <div className='size-[1.25rem] flex items-center justify-center'>
                  <input
                    type='checkbox'
                    id={slugify(item.value)}
                    onChange={onChange}
                    className='peer size-[1.04167rem] rounded-[0.20833rem] text-[#D32F2F] ring-0 border-[#AEAEB2] ring-offset-0 outline-none checked:border-[#0000]'
                  />
                </div>
                <span className='font-open-sans text-[0.72917rem] leading-[150%] text-[rgba(9,9,9,0.60)] group-has-checked:text-[#D32F2F] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>
                  {item.label}
                </span>
              </label>
            ))}
          </div>
          <DrawerFooter className='flex items-center flex-row shadow-[0_-5px_4px_0_rgba(0,0,0,0.04)] p-[1.04167rem_0.83333rem]'>
            <button
              type='button'
              className='h-[2.08333rem] p-[0.67708rem_1.25rem] inline-flex items-center justify-center rounded-[5.20833rem] border border-[rgba(9,9,9,0.60)] cursor-pointer text-[0.67708rem] font-open-sans leading-[150%] font-normal text-[#090909]'
            >
              {t('reset')}
            </button>
            <button
              type='button'
              className='inline-flex items-center justify-center space-x-[0.3125rem] p-[0.625rem_1.04167rem] font-open-sans text-[0.72917rem] leading-[150%] text-white bg-[radial-gradient(298.39%_130.99%_at_6.62%_16.15%,#CA2A2A_15.19%,#D32F2F_53.77%,#FF6E6E_100%)] rounded-[5.20833rem] backdrop-blur-[6px] grow'
            >
              <span className='[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>
                {t('apply')}
              </span>
              <ICChevronRight className='size-[0.83333rem] shrink-0 [&>path]:stroke-white [&>path]:[stroke-opacity:1]' />
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
