'use client'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

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
  keySp: string
  items: {
    label: string
    value: string
  }[]
  onChange: () => void
}

export default function FilterPopup({ label, keySp, items, onChange }: FilterPopupProps) {
  const [selected, setSelected] = useState<string[]>(() => {
    if (typeof window === 'undefined') return []
    const searchParams = new URLSearchParams(window.location.search)
    const initialSelected = searchParams.get(keySp)
    return initialSelected ? initialSelected.split(',') : []
  })

  const t = useTranslations('ProjectListPage')

  const handleChange = (value: string, updateParams: boolean) => {
    if (updateParams && typeof window !== 'undefined') {
      const url = new URL(window.location.href)

      const spValue = url.searchParams.get(keySp)

      const data = spValue ? spValue.split(',') : []
      const dataIndex = data.indexOf(value)

      if (dataIndex !== -1) {
        data.splice(dataIndex, 1)
      } else {
        data.push(value)
      }

      if (data.length > 0) {
        url.searchParams.set(keySp, data.join(','))
      } else {
        url.searchParams.delete(keySp)
      }

      window.history.pushState({}, '', url)
      onChange()
    }

    setSelected(
      (prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value) // remove
          : [...prev, value], // add
    )
  }

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <button
            type='button'
            className='font-open-sans text-[0.72917rem] font-normal leading-[150%] text-[#090909] h-10 p-[0.83333rem_1.14583rem] flex items-center justify-center rounded-[5.20833rem] border border-[rgba(9,9,9,0.08)] space-x-[0.52083rem] cursor-pointer xsm:hidden'
          >
            <span className='[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>
              {label}
            </span>
            <ICChevronDown className='size-[0.83333rem] shrink-0' />
          </button>
        </PopoverTrigger>
        <PopoverContent className='w-auto space-y-[1.04167rem] rounded-[0.20833rem] border-none bg-white p-[1.25rem_1.04167rem] shadow-[0_16px_30px_0_rgba(0,0,0,0.05)]'>
          {items.map((item, i) => (
            <label
              key={i}
              htmlFor={slugify(item.value)}
              className='group flex w-full cursor-pointer items-center space-x-[0.52083rem]'
            >
              <div className='flex size-[1.25rem] items-center justify-center'>
                <input
                  type='checkbox'
                  id={slugify(item.value)}
                  checked={selected.includes(item.value)}
                  onChange={() => handleChange(item.value, true)}
                  className='size-[1.04167rem] rounded-[0.20833rem] text-[#D32F2F] ring-0 border-[#AEAEB2] ring-offset-0 outline-none checked:border-[#0000]'
                />
              </div>
              <span className='font-open-sans text-[0.72917rem] leading-[150%] font-normal text-[rgba(9,9,9,0.60)] select-none [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] group-has-checked:text-[#D32F2F]'>
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
            className='font-open-sans flex cursor-pointer items-center justify-center space-x-[0.52083rem] rounded-[5.20833rem] border border-[rgba(9,9,9,0.08)] p-[0.52083rem_0.83333rem] text-[0.625rem] leading-[140%] font-normal tracking-[-0.00625rem] text-[#090909] sm:hidden'
          >
            <span className='whitespace-nowrap'>{label}</span>
            <ICChevronDown className='size-[0.72917rem] shrink-0' />
          </button>
        </DrawerTrigger>
        <DrawerContent
          hiddenDrag
          className='rounded-[1.25rem_1.25rem_0_0] bg-white'
        >
          <DrawerHeader className='flex items-center justify-between border-b border-b-[rgba(9,9,9,0.08)] p-[0.83333rem]'>
            <DrawerTitle className='font-open-sans text-[0.83333rem] leading-[150%] font-semibold capitalize'>
              {label}
            </DrawerTitle>
            <DrawerClose asChild>
              <button
                type='button'
                className='flex size-[1.25rem] cursor-pointer items-center justify-center rounded-full bg-[rgba(9,9,9,0.10)] backdrop-blur-[14.117646217346191px]'
              >
                <ICClose className='size-[0.72917rem]' />
              </button>
            </DrawerClose>
          </DrawerHeader>
          <div className='space-y-[0.625rem] p-[0.83333rem_0.83333rem_1.66667rem_0.83333rem]'>
            {items.map((item, i) => (
              <label
                htmlFor={slugify(item.value)}
                key={i}
                className='group flex items-center space-x-[0.52083rem]'
              >
                <div className='flex size-[1.25rem] items-center justify-center'>
                  <input
                    type='checkbox'
                    id={slugify(item.value)}
                    checked={selected.includes(item.value)}
                    onChange={() => handleChange(item.value, false)}
                    className='peer size-[1.04167rem] rounded-[0.20833rem] text-[#D32F2F] ring-0 border-[#AEAEB2] ring-offset-0 outline-none checked:border-[#0000]'
                  />
                </div>
                <span className='font-open-sans text-[0.72917rem] leading-[150%] text-[rgba(9,9,9,0.60)] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] group-has-checked:text-[#D32F2F]'>
                  {item.label}
                </span>
              </label>
            ))}
          </div>
          <DrawerFooter className='flex flex-row items-center p-[1.04167rem_0.83333rem] shadow-[0_-5px_4px_0_rgba(0,0,0,0.04)]'>
            <button
              type='button'
              className='font-open-sans inline-flex h-[2.08333rem] cursor-pointer items-center justify-center rounded-[5.20833rem] border border-[rgba(9,9,9,0.60)] p-[0.67708rem_1.25rem] text-[0.67708rem] leading-[150%] font-normal text-[#090909]'
            >
              {t('reset')}
            </button>
            <button
              type='button'
              className='font-open-sans inline-flex grow items-center justify-center space-x-[0.3125rem] rounded-[5.20833rem] bg-[radial-gradient(298.39%_130.99%_at_6.62%_16.15%,#CA2A2A_15.19%,#D32F2F_53.77%,#FF6E6E_100%)] p-[0.625rem_1.04167rem] text-[0.72917rem] leading-[150%] text-white backdrop-blur-[6px]'
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
