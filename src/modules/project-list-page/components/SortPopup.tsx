'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'

import ICChevronRight from '@/components/icons/ICChevronRight'
import ICClose from '@/components/icons/ICClose'
import ICSort from '@/components/icons/ICSort'
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

import './style.css'

interface SortPopupProps {
  label: string
  keySp: string
  items: {
    label: string
    value: string
  }[]
  value?: string
  onChange?: (value: string) => void
}

export default function SortPopup({ label, items, value, onChange }: SortPopupProps) {
  const [internalSelected, setInternalSelected] = useState<string>('')
  const selectedItem = value !== undefined ? value : internalSelected

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [pendingSort, setPendingSort] = useState(selectedItem)

  const handleDrawerOpenChange = (open: boolean) => {
    setDrawerOpen(open)
    if (open) {
      setPendingSort(selectedItem)
    }
  }

  const t = useTranslations('ProjectListPage')

  const handleChange = (newValue: string) => {
    if (value === undefined) {
      setInternalSelected(newValue)
    }
    onChange?.(newValue)
  }

  const handleApplyDrawer = () => {
    if (value === undefined) {
      setInternalSelected(pendingSort)
    }
    onChange?.(pendingSort)
    setDrawerOpen(false)
  }

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <button
            type='button'
            className='font-open-sans xsm:size-[2.08333rem] xsm:bg-[#F0F0F0] xsm:border-none xsm:space-x-0 xsm:rounded-full xsm:hidden relative flex h-[2.5rem] shrink-0 cursor-pointer items-center justify-center space-x-[0.52083rem] rounded-[5.20833rem] border border-[rgba(9,9,9,0.08)] px-[1.14583rem] py-[0.83333rem] text-[0.72917rem] leading-[150%] font-normal text-[#090909]'
          >
            <span className='xsm:hidden [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>{t('sort')}</span>
            <ICSort className='size-[0.83333rem] shrink-0' />
          </button>
        </PopoverTrigger>
        <PopoverContent className='w-auto space-y-[1.04167rem] rounded-[0.20833rem] border-none bg-white p-[1.25rem_1.04167rem] shadow-[0_16px_30px_0_rgba(0,0,0,0.05)]'>
          {items.map((item, i) => (
            <label
              htmlFor={slugify(item.value)}
              key={i}
              className='group flex w-full cursor-pointer items-center space-x-[0.52083rem]'
            >
              <div className='flex size-[1.25rem] items-center justify-center'>
                <input
                  type='radio'
                  id={slugify(item.value)}
                  checked={item.value === selectedItem}
                  onChange={() => handleChange(item.value)}
                  className='size-[1.04167rem] rounded-[5.20833rem] border-[#AEAEB2] text-[#D32F2F] ring-0 ring-offset-0 outline-none checked:border-[#0000]'
                />
              </div>
              <span className='font-open-sans text-[0.72917rem] leading-[150%] font-normal text-[rgba(9,9,9,0.60)] select-none [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] group-has-checked:text-[#D32F2F]'>
                {item.label}
              </span>
            </label>
          ))}
        </PopoverContent>
      </Popover>

      <Drawer
        open={drawerOpen}
        onOpenChange={handleDrawerOpenChange}
      >
        <DrawerTrigger asChild>
          <button
            type='button'
            className='font-open-sans xsm:size-[2.08333rem] xsm:bg-[#F0F0F0] xsm:border-none xsm:space-x-0 xsm:rounded-full relative flex h-[2.5rem] shrink-0 cursor-pointer items-center justify-center space-x-[0.52083rem] rounded-[5.20833rem] border border-[rgba(9,9,9,0.08)] px-[1.14583rem] py-[0.83333rem] text-[0.72917rem] leading-[150%] font-normal text-[#090909] sm:hidden'
          >
            <ICSort className='size-[0.83333rem] shrink-0' />
          </button>
        </DrawerTrigger>
        <DrawerContent
          hiddenDrag
          className='rounded-[1.25rem_1.25rem_0_0] bg-white z-[102]'
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
                <div className='flex size-[1.25167rem] items-center justify-center'>
                  <input
                    type='radio'
                    id={slugify(item.value)}
                    checked={item.value === pendingSort}
                    onChange={() => setPendingSort(item.value)}
                    className='size-[1.04333rem] rounded-[5.20833rem] border-[#AEAEB2] text-[#D32F2F] ring-0 ring-offset-0 outline-none checked:border-[#0000]'
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
              onClick={handleApplyDrawer}
              className='font-open-sans inline-flex grow items-center justify-center space-x-[0.3125rem] rounded-[5.20833rem] bg-[radial-gradient(298.39%_130.99%_at_6.62%_16.15%,#CA2A2A_15.19%,#D32F2F_53.77%,#FF6E6E_100%)] p-[0.625rem_1.04167rem] text-[0.72917rem] leading-[150%] text-white backdrop-blur-[6px]'
            >
              <span className='[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>{t('apply')}</span>
              <ICChevronRight className='size-[0.83333rem] shrink-0 [&>path]:stroke-white [&>path]:[stroke-opacity:1]' />
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
