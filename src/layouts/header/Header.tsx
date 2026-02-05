'use client'

import Image from 'next/image'
import { useState } from 'react'

import ButtonOutline from '@/components/custom/ButtonOutline'
import ButtonRed from '@/components/custom/ButtonRed'
import ICClose from '@/components/icons/ICClose'
import ICMenu from '@/components/icons/ICMenu'
import ICSearchHead from '@/components/icons/ICSearchHead'
import ICUser from '@/components/icons/ICUser'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

const links = [
  {
    label: 'Dự án',
    href: '/',
  },
  {
    label: 'Năng lực - dịch vụ',
    href: '/nang-luc-dich-vu',
  },
  {
    label: 'Về chúng tôi',
    href: '/ve-chung-toi',
  },
  {
    label: 'Tin tức',
    href: '/tin-tuc',
  },
  {
    label: 'Đào tạo',
    href: '/dao-tao',
  },
  {
    label: 'Tuyển dụng',
    href: '/tuyen-dung',
  },
  {
    label: 'INNO Hub',
    href: '/inno-hub',
  },
]

export default function Header() {
  const [openSearch, setOpenSearch] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)

  const handleOpenSearch = () => {
    setOpenSearch(true)
  }

  const handleCloseSearch = () => {
    setOpenSearch(false)
  }

  const handleToggleMenu = () => {
    setOpenMenu(!openMenu)
    setOpenSearch(false)
  }

  return (
    <>
      <div
        onClick={handleCloseSearch}
        className={cn(
          'fixed top-0 left-0 size-full bg-black/60 z-[98] pointer-events-none opacity-0 transition-all duration-500',
          openSearch && 'pointer-events-auto opacity-100',
        )}
      ></div>
      <header className='fixed top-0 left-0 w-full z-[99] h-[3.65rem] xsm:h-[2.92rem] bg-[#DADADA] shadow-[0_0_30px_0_rgba(0,_0,_0,_0.06)] xsm:shadow-[0_4px_30px_0_rgba(0,_0,_0,_0.06)] backdrop-blur-[4px] flex-y-center xsm:bg-white/80'>
        <div className='container flex items-center justify-between xsm:px-[0.83333rem]'>
          {/* navigation */}
          <nav className='flex-y-center w-fit'>
            <Link href='/'>
              <Image
                src='/header/d-logo.svg'
                alt='logo'
                width={93}
                height={44}
                unoptimized
                className='h-[2.29167rem] xsm:h-[1.5625rem] w-auto'
              />
            </Link>
            <div className='relative ml-[2.08rem] xsm:hidden'>
              <div
                className={cn(
                  'flex-y-center space-x-[1.46rem] absolute-y-center left-0 w-fit',
                  openSearch && 'opacity-0 pointer-events-none',
                )}
              >
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className='pc-body-16-r text-en whitespace-nowrap'
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
          {/* search */}
          <div className='flex-y-center space-x-5 xsm:hidden'>
            <button
              onClick={handleOpenSearch}
              className={cn(
                'size-[1.875rem] flex-y-center bg-white/80 rounded-full transition-all duration-500 relative',
                openSearch && 'w-[51.04167rem] shrink-0 overflow-hidden',
              )}
            >
              {openSearch && (
                <input
                  type='text'
                  className='pc-body-14-r placeholder:text-text-60 w-full h-full pl-[0.73rem] pr-[2rem] outline-none border-none focus:border-none focus:ring-0 focus:outline-none text-text-100'
                  placeholder='Nhập từ khoá tìm kiếm'
                />
              )}
              <div className='size-[1.875rem] flex-center absolute top-0 right-0'>
                <ICSearchHead className='size-[0.72917rem] text-text-100 rounded-full' />
              </div>
            </button>
            <Link
              href='/line-he'
              className='inline-block pc-body-16-r text-en'
            >
              Liên hệ
            </Link>
            <ButtonRed>
              <span>Đăng nhập</span>
              <ICUser className='size-[0.83333rem] text-white' />
            </ButtonRed>
            <div className='flex-y-center space-x-[0.4rem] pc-body-16-r text-text-100'>
              <Link
                href='/'
                locale='vi'
                className='text-primary-red-100'
              >
                VI
              </Link>
              <div className='border-l border-solid border-text-60 h-[0.625rem]'></div>
              <Link
                href='/'
                locale='en'
              >
                EN
              </Link>
            </div>
          </div>
          {/* mobile menu */}
          <div className='flex items-center w-fit rounded-[5.20833rem] bg-[rgba(9,_9,_9,_0.10)]'>
            <button
              onClick={handleOpenSearch}
              className='w-fit h-[1.875rem] px-[0.62rem]'
            >
              <ICSearchHead className='size-[0.9375rem] text-text-80' />
            </button>
            <div className='border-l border-solid border-[rgba(9,_9,_9,_0.60)]/[0.28] h-[0.9375rem]'></div>
            <button
              className='w-fit h-[1.875rem] px-[0.62rem]'
              onClick={handleToggleMenu}
            >
              <ICMenu className='size-[0.9375rem] text-text-80' />
            </button>
          </div>
        </div>
      </header>
      <div
        className={cn(
          'fixed h-screen top-0 left-0 w-full z-[98] bg-white sm:hidden pt-[calc(2.92rem+0.31rem)] px-[0.83333rem] overflow-y-auto transition-all duration-500 translate-x-full',
          openMenu && 'translate-x-0',
        )}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className='mb-header-16-m text-en whitespace-nowrap py-[0.94rem] border-b border-solid border-[rgba(9,9,9,0.08)] block'
          >
            {link.label}
          </Link>
        ))}
        <ButtonRed className='w-full mt-[2.19rem] mb-[0.83rem]'>
          <span>Đăng nhập</span>
          <ICUser className='size-[0.83333rem] text-white' />
        </ButtonRed>
        <ButtonOutline className='w-full'>Liên hệ</ButtonOutline>
      </div>
      <div
        className={cn(
          'fixed h-screen top-0 left-0 w-full z-[98] bg-white sm:hidden pt-[calc(2.92rem+0.31rem)] px-[0.83333rem] overflow-y-auto transition-all duration-500 translate-x-full',
          openSearch && 'translate-x-0',
        )}
      >
        <div className='flex-y-center justify-between h-[1.87rem]'>
          <span className='mb-body-14-r text-text-40'>Lịch sử tìm kiếm</span>
          <Image
            src='/header/ic-trash.svg'
            alt='trash'
            width={28}
            height={28}
            className='size-[1.45833rem] shrink-0 object-contain'
            unoptimized
          />
        </div>
        <div className='w-full h-fit'>
          {Array.from({ length: 20 }).map((_, index) => (
            <button
              key={index}
              className='mb-body-14-r text-text-100 flex-y-center justify-between w-full h-[2.34rem]'
            >
              <span>Demo {index + 1}</span>
              <ICClose className='size-[1rem] shrink-0 text-title-m' />
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
