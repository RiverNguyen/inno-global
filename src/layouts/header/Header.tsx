'use client'

import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import ButtonOutline from '@/components/custom/ButtonOutline'
import ButtonRed from '@/components/custom/ButtonRed'
import ICClose from '@/components/icons/ICClose'
import ICMenu from '@/components/icons/ICMenu'
import ICSearchHead from '@/components/icons/ICSearchHead'
import ICUser from '@/components/icons/ICUser'
import { useScrollHeader } from '@/hooks/useScrollHeader'
import { Link } from '@/i18n/navigation'
import { IAcfImage } from '@/interfaces/acf-wp.interface'
import { IMenu } from '@/interfaces/header.interface'
import { cn } from '@/lib/utils'

const languages = [
  { key: 'vi' as const, label: 'Tiếng Việt' },
  { key: 'en' as const, label: 'Tiếng Anh' },
]

export default function Header({ data }: { data: { logo: IAcfImage; menus: IMenu[] } }) {
  const { logo, menus } = data
  const [openSearch, setOpenSearch] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  const [openMobileLanguage, setOpenMobileLanguage] = useState(true)
  const mobileSearchInputRef = useRef<HTMLInputElement>(null)
  const params = useParams()
  const locale = params.locale as 'vi' | 'en'

  const headerRef = useRef<HTMLElement>(null)
  useScrollHeader(headerRef as React.RefObject<HTMLElement>)

  useEffect(() => {
    if (!openSearch) return
    const frame = window.requestAnimationFrame(() => {
      mobileSearchInputRef.current?.focus()
    })
    return () => window.cancelAnimationFrame(frame)
  }, [openSearch])

  useEffect(() => {
    if (!window.matchMedia('(max-width: 639px)').matches) return
    const shouldLock = openMenu || openSearch
    const { body, documentElement } = document
    body.style.overflow = shouldLock ? 'hidden' : ''
    documentElement.style.overflow = shouldLock ? 'hidden' : ''
    return () => {
      body.style.overflow = ''
      documentElement.style.overflow = ''
    }
  }, [openMenu, openSearch])

  const handleOpenSearch = () => {
    setOpenMenu(false)
    setOpenSearch(true)
  }

  const handleCloseAll = () => {
    setOpenMenu(false)
    setOpenSearch(false)
  }

  const handleCloseSearch = () => {
    setOpenSearch(false)
  }

  const handleToggleMenu = () => {
    setOpenMenu((prev) => !prev)
    setOpenSearch(false)
  }
  if (!Array.isArray(menus) || menus.length === 0) return null
  return (
    <>
      <div
        onClick={handleCloseSearch}
        className={cn(
          'xsm:hidden pointer-events-none fixed top-0 left-0 z-[98] size-full bg-black/60 opacity-0 transition-opacity duration-200',
          openSearch && 'pointer-events-auto opacity-100',
          (openMenu || openSearch) && 'z-[200]',
        )}
      ></div>
      <header
        className={cn(
          'xsm:h-[2.92rem] transition-all duration-300 xsm:shadow-[0_4px_30px_0_rgba(0,_0,_0,_0.06)] flex-y-center xsm:bg-white/80 fixed top-0 left-0 z-[99] h-[3.65rem] w-full bg-[#DADADA] shadow-[0_0_30px_0_rgba(0,_0,_0,_0.06)] backdrop-blur-[4px]',
          (openMenu || openSearch) && 'z-[201]',
        )}
        ref={headerRef}
      >
        <div
          className={cn(
            'xsm:px-[0.83333rem] container flex items-center justify-between',
            openSearch && 'xsm:space-x-[0.83rem]',
          )}
        >
          {/* navigation */}
          <nav className={cn('flex-y-center w-fit', openSearch && 'xsm:hidden')}>
            <Link
              href='/'
              onClick={handleCloseAll}
            >
              {logo?.url && (
                <Image
                  src={logo.url}
                  alt={logo?.alt || ''}
                  width={93}
                  height={44}
                  unoptimized
                  priority
                  className='xsm:h-[1.5625rem] h-[2.29167rem] w-auto'
                />
              )}
            </Link>
            <div className='xsm:hidden relative ml-[2.08rem]'>
              <div
                className={cn(
                  'flex-y-center absolute-y-center left-0 w-fit space-x-[1.46rem]',
                  openSearch && 'pointer-events-none opacity-0',
                )}
              >
                {Array.isArray(menus) &&
                  menus.slice(0, menus.length - 1).map((menu) => (
                    <Link
                      key={menu.link.url || ''}
                      href={menu.link.url || ''}
                      target={menu.link.target || '_self'}
                      className='pc-body-16-r text-en whitespace-nowrap'
                    >
                      {menu.link.title}
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
                <ICSearchHead className='text-text-100 size-[0.875rem]' />
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
              href={menus[menus.length - 1].link.url || ''}
              target={menus[menus.length - 1].link.target || '_self'}
              className='pc-body-16-r text-en inline-block xsm:hidden'
            >
              {menus[menus.length - 1].link.title}
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
          <div
            className={cn(
              'flex h-[1.875rem] w-[3.9rem] shrink-0 items-center overflow-hidden rounded-[5.20833rem] bg-[rgba(9,_9,_9,_0.10)] sm:hidden transition-[width,opacity,transform] duration-180 ease-out',
              openSearch && 'w-[calc(100%-2.1rem)]',
              openMenu && 'xsm:hidden',
            )}
          >
            <input
              ref={mobileSearchInputRef}
              type='text'
              placeholder='Nhập từ khoá tìm kiếm'
              className={cn(
                'h-[1.875rem] min-w-0 flex-1 max-w-0 border-none bg-transparent p-0 text-en opacity-0 outline-none transition-[max-width,opacity,padding] duration-200 ease-out [will-change:max-width,opacity] placeholder:pc-body-14-r placeholder:text-en-60 focus:border-none focus:outline-none focus:ring-0',
                openSearch && 'max-w-full px-[0.83rem] opacity-100',
              )}
            />
            <button
              onClick={handleOpenSearch}
              className='flex-center size-[1.875rem] shrink-0'
            >
              <ICSearchHead className='text-text-80 size-[0.9375rem]' />
            </button>
            <div
              className={cn(
                'flex-y-center max-w-[3rem] shrink-0 overflow-hidden transition-[max-width,opacity,transform] duration-150 ease-out [will-change:max-width,opacity,transform]',
                openSearch
                  ? 'pointer-events-none max-w-0 -translate-x-1 opacity-0'
                  : 'max-w-[3rem] translate-x-0 opacity-100',
              )}
            >
              <div className='h-[0.9375rem] border-l border-solid border-[rgba(9,_9,_9,_0.60)]/[0.28]'></div>
              <button
                className='flex-center size-[1.875rem] shrink-0'
                onClick={handleToggleMenu}
              >
                <ICMenu className='text-text-80 size-[0.9375rem]' />
              </button>
            </div>
          </div>
          {/* close mobile */}
          {(openMenu || openSearch) && (
            <button
              onClick={handleCloseAll}
              className='xsm:flex-center hidden size-[1.35417rem] shrink-0'
            >
              <ICClose className='size-full' />
            </button>
          )}
        </div>
      </header>
      {/* mobile menu */}
      <div
        className={cn(
          'fixed top-0 left-0 z-[98] h-screen w-full overflow-y-auto bg-white px-[0.83333rem] pt-[calc(2.92rem+0.31rem)] transition-[transform,opacity] duration-200 ease-out will-change-transform sm:hidden pb-[20vh]',
          openMenu ? 'translate-x-0 opacity-100 pointer-events-auto' : 'translate-x-full opacity-0 pointer-events-none',
          openMenu && 'z-[200]',
        )}
      >
        {Array.isArray(menus) &&
          menus.slice(0, menus.length - 1).map((menu) => (
            <Link
              key={menu.link.url || ''}
              href={menu.link.url || ''}
              target={menu.link.target || '_self'}
              className='mb-header-16-m text-en block border-b border-solid border-[rgba(9,9,9,0.08)] py-[0.94rem] whitespace-nowrap'
              onClick={handleCloseAll}
            >
              {menu.link.title}
            </Link>
          ))}
        <div className='mt-[1.46rem] border-b border-solid border-[rgba(9,9,9,0.08)] pb-[0.83rem]'>
          <button
            type='button'
            onClick={() => setOpenMobileLanguage((prev) => !prev)}
            className='mb-header-16-m text-en flex w-full items-center justify-between'
          >
            <span>Ngôn ngữ</span>
            <ChevronDown
              className={cn(
                'size-[0.95rem] shrink-0 transition-transform duration-200 ease-out',
                openMobileLanguage && 'rotate-180 text-primary-red-100',
              )}
            />
          </button>
          <div
            className={cn(
              'overflow-hidden transition-[max-height,opacity,margin] duration-200 ease-out',
              openMobileLanguage ? 'mt-[0.62rem] max-h-[6rem] opacity-100' : 'mt-0 max-h-0 opacity-0',
            )}
          >
            {languages.map((lang) => (
              <Link
                key={lang.key}
                href='/'
                locale={lang.key}
                className={cn(
                  'mb-header-16-m block py-[0.52rem]',
                  lang.key === locale ? 'text-primary-red-100' : 'text-en-60',
                )}
                onClick={handleCloseAll}
              >
                {lang.label}
              </Link>
            ))}
          </div>
        </div>
        <ButtonRed className='mt-[2.19rem] mb-[0.83rem] w-full'>
          <span>Đăng nhập</span>
          <ICUser className='size-[0.83333rem] text-white' />
        </ButtonRed>

        <Link
          href={menus[menus.length - 1].link.url || ''}
          target={menus[menus.length - 1].link.target || '_self'}
          className='w-full block'
          onClick={handleCloseAll}
        >
          <ButtonOutline className='w-full'>{menus[menus.length - 1].link.title}</ButtonOutline>
        </Link>
      </div>
      {/* search */}
      <div
        className={cn(
          'fixed top-0 left-0 z-[98] h-screen w-full overflow-y-auto bg-white px-[0.83333rem] pt-[calc(2.92rem+0.31rem)] transition-[transform,opacity] duration-200 ease-out will-change-transform sm:hidden',
          openSearch
            ? 'translate-x-0 opacity-100 pointer-events-auto'
            : 'translate-x-full opacity-0 pointer-events-none',
          openSearch && 'z-[200]',
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
