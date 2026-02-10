'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'
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
  const params = useParams()
  const locale = params.locale as 'vi' | 'en'

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
          'pointer-events-none fixed top-0 left-0 z-[98] size-full bg-black/60 opacity-0 transition-all duration-500',
          openSearch && 'pointer-events-auto opacity-100',
        )}
      ></div>
      <header className='xsm:h-[2.92rem] xsm:shadow-[0_4px_30px_0_rgba(0,_0,_0,_0.06)] flex-y-center xsm:bg-white/80 fixed top-0 left-0 z-[99] h-[3.65rem] w-full bg-[#DADADA] shadow-[0_0_30px_0_rgba(0,_0,_0,_0.06)] backdrop-blur-[4px]'>
        <div className='xsm:px-[0.83333rem] container flex items-center justify-between'>
          {/* navigation */}
          <nav className='flex-y-center w-fit'>
            <Link href='/'>
              <Image
                src='/header/d-logo.svg'
                alt='logo'
                width={93}
                height={44}
                unoptimized
                priority
                className='xsm:h-[1.5625rem] h-[2.29167rem] w-auto'
              />
            </Link>
            <div className='xsm:hidden relative ml-[2.08rem]'>
              <div
                className={cn(
                  'flex-y-center absolute-y-center left-0 w-fit space-x-[1.46rem]',
                  openSearch && 'pointer-events-none opacity-0',
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
            <div
              onClick={!openSearch ? handleOpenSearch : undefined}
              className={cn(
                'flex-y-center relative size-[1.875rem] rounded-full bg-white/80 transition-all duration-500',
                openSearch && 'w-[51.04167rem] shrink-0',
              )}
            >
              {openSearch && (
                <input
                  type='text'
                  className='pc-body-14-r placeholder:text-text-60 text-text-100 h-full w-full border-none pr-[2rem] pl-[0.73rem] outline-none focus:border-none focus:ring-0 focus:outline-none bg-transparent'
                  placeholder='Nhập từ khoá tìm kiếm'
                />
              )}
              <button
                type='button'
                aria-label={openSearch ? 'Close search' : 'Open search'}
                onClick={handleOpenSearch}
                className='flex-center absolute top-0 right-0 size-[1.875rem]'
              >
                <ICSearchHead className='text-text-100 size-[0.72917rem] rounded-full' />
              </button>
              <div
                className={cn(
                  'absolute bottom-[-0.88rem] left-0 translate-y-full w-full h-fit bg-white p-[1.25rem_0.83rem] cursor-default',
                  openSearch
                    ? 'opacity-100 pointer-events-auto delay-300 transition-all duration-300'
                    : 'opacity-0 pointer-events-none ',
                )}
                style={{
                  boxShadow:
                    '0 563px 158px 0 rgba(92, 92, 92, 0.00), 0 361px 144px 0 rgba(92, 92, 92, 0.01), 0 203px 122px 0 rgba(92, 92, 92, 0.05), 0 90px 90px 0 rgba(92, 92, 92, 0.09), 0 23px 50px 0 rgba(92, 92, 92, 0.10)',
                }}
              >
                <div className='flex-y-center justify-between pb-[0.83rem] border-b border-solid border-[rgba(9,9,9,0.08)]'>
                  <span className='pc-body-14-r text-text-40'>Lịch sử tìm kiếm</span>
                  <Image
                    src='/header/ic-trash.svg'
                    alt='trash'
                    width={28}
                    height={28}
                    className='size-[1.25rem] shrink-0 object-contain cursor-pointer'
                    unoptimized
                  />
                </div>
                {Array.from({ length: 10 }).map((_, index) => (
                  <button
                    key={index}
                    className='pc-body-16-r text-text-100 flex-y-center h-[2.29rem] w-full justify-between'
                  >
                    <span>Demo {index + 1}</span>
                    <ICClose className='text-text-100 size-[0.83333rem] shrink-0 stroke-[1.5px]' />
                  </button>
                ))}
              </div>
            </div>
            <Link
              href='/line-he'
              className='pc-body-16-r text-en inline-block xsm:hidden'
            >
              Liên hệ
            </Link>
            <ButtonRed className='xsm:hidden'>
              <span>Đăng nhập</span>
              <ICUser className='size-[0.83333rem] text-white' />
            </ButtonRed>
            <div className='flex-y-center pc-body-16-r text-text-100 space-x-[0.4rem] uppercase xsm:hidden'>
              {['vi', 'en'].map((lang) => (
                <Link
                  key={lang}
                  href='/'
                  locale={lang}
                  className={cn(lang === locale ? 'text-primary-red-100' : '')}
                >
                  {lang}
                </Link>
              ))}
            </div>
          </div>
          {/* mobile menu */}
          <div className='flex w-fit items-center rounded-[5.20833rem] bg-[rgba(9,_9,_9,_0.10)] sm:hidden'>
            <button
              onClick={handleOpenSearch}
              className='h-[1.875rem] w-fit px-[0.62rem]'
            >
              <ICSearchHead className='text-text-80 size-[0.9375rem]' />
            </button>
            <div className='h-[0.9375rem] border-l border-solid border-[rgba(9,_9,_9,_0.60)]/[0.28]'></div>
            <button
              className='h-[1.875rem] w-fit px-[0.62rem]'
              onClick={handleToggleMenu}
            >
              <ICMenu className='text-text-80 size-[0.9375rem]' />
            </button>
          </div>
        </div>
      </header>
      {/* mobile menu */}
      <div
        className={cn(
          'fixed top-0 left-0 z-[98] h-screen w-full translate-x-full overflow-y-auto bg-white px-[0.83333rem] pt-[calc(2.92rem+0.31rem)] transition-all duration-500 sm:hidden',
          openMenu && 'translate-x-0',
        )}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className='mb-header-16-m text-en block border-b border-solid border-[rgba(9,9,9,0.08)] py-[0.94rem] whitespace-nowrap'
          >
            {link.label}
          </Link>
        ))}
        <ButtonRed className='mt-[2.19rem] mb-[0.83rem] w-full'>
          <span>Đăng nhập</span>
          <ICUser className='size-[0.83333rem] text-white' />
        </ButtonRed>
        <ButtonOutline className='w-full'>Liên hệ</ButtonOutline>
      </div>
      {/* search */}
      <div
        className={cn(
          'fixed top-0 left-0 z-[98] h-screen w-full translate-x-full overflow-y-auto bg-white px-[0.83333rem] pt-[calc(2.92rem+0.31rem)] transition-all duration-500 sm:hidden',
          openSearch && 'translate-x-0',
        )}
      >
        <div className='flex-y-center h-[1.87rem] justify-between'>
          <span className='mb-body-14-r text-text-40 '>Lịch sử tìm kiếm</span>
          <Image
            src='/header/ic-trash.svg'
            alt='trash'
            width={28}
            height={28}
            className='size-[1.45833rem] shrink-0 object-contain'
            unoptimized
          />
        </div>
        <div className='h-fit w-full'>
          {Array.from({ length: 20 }).map((_, index) => (
            <button
              key={index}
              className='mb-body-14-r text-text-100 flex-y-center h-[2.34rem] w-full justify-between'
            >
              <span>Demo {index + 1}</span>
              <ICClose className='text-title-m size-[1rem] shrink-0' />
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
