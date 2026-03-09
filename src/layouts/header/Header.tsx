'use client'

import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import type { Session } from 'next-auth'
import { useTranslations } from 'next-intl'
import { useRouter } from 'nextjs-toploader/app'
import { Fragment, useEffect, useRef, useState } from 'react'

import ButtonOutline from '@/components/custom/ButtonOutline'
import ButtonRed from '@/components/custom/ButtonRed'
import ICClose from '@/components/icons/ICClose'
import ICMenu from '@/components/icons/ICMenu'
import ICSearchHead from '@/components/icons/ICSearchHead'
import ICUser from '@/components/icons/ICUser'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import ROUTES from '@/configs/routes'
import { useScrollHeader } from '@/hooks/useScrollHeader'
import { Link } from '@/i18n/navigation'
import { IAcfImage } from '@/interfaces/acf-wp.interface'
import { IMenu } from '@/interfaces/header.interface'
import { cn } from '@/lib/utils'

export default function Header({
  data,
  session,
}: {
  data: { logo: IAcfImage; menus: IMenu[] }
  session: Session | null
}) {
  const t = useTranslations('Header')
  const languages = [
    { key: 'vi' as const, label: t('languageVi') },
    { key: 'en' as const, label: t('languageEn') },
  ]
  const { logo, menus } = data
  const [openSearch, setOpenSearch] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  const [openMobileLanguage, setOpenMobileLanguage] = useState(true)
  const mobileSearchInputRef = useRef<HTMLInputElement>(null)
  const params = useParams()
  const router = useRouter()
  const locale = params.locale as 'vi' | 'en'

  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    const searchs = typeof window !== 'undefined' ? localStorage.getItem('searchs') : null
    return searchs ? JSON.parse(searchs) : []
  })

  const headerRef = useRef<HTMLElement>(null)
  const searchRef = useRef<HTMLFormElement>(null)
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

  useEffect(() => {
    if (!openSearch) return
    if (window.matchMedia('(max-width: 639px)').matches) return

    const handleClickOutside = (event: MouseEvent) => {
      if (!searchRef.current) return

      if (!searchRef.current.contains(event.target as Node)) {
        setOpenSearch(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openSearch])

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

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const value = e.currentTarget?.search?.value.trim() || e.currentTarget?.['search-mobile']?.value.trim()
    if (!value) return

    const newSearchHistory = [value, ...searchHistory.filter((item: string) => item !== value)]

    localStorage.setItem('searchs', JSON.stringify(newSearchHistory))
    setSearchHistory(newSearchHistory)
    handleCloseAll()
    mobileSearchInputRef.current?.blur()
    router.push(locale === 'vi' ? `${ROUTES.searchVi}?q=${value}` : `${ROUTES.searchEn}?q=${value}`)
  }

  const handleRemoveSearchHistory = (value: string) => {
    const newSearchHistory = searchHistory.filter((item: string) => item !== value)
    localStorage.setItem('searchs', JSON.stringify(newSearchHistory))
    setSearchHistory(newSearchHistory)
  }

  const handleRemoveAllSearchHistory = () => {
    localStorage.removeItem('searchs')
    setSearchHistory([])
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
          'xsm:h-[2.92rem] xsm:shadow-[0_4px_30px_0_rgba(0,_0,_0,_0.06)] flex-y-center fixed top-0 left-0 z-[99] h-[3.65rem] w-full bg-white/80 shadow-[0_0_30px_0_rgba(0,_0,_0,_0.06)] backdrop-blur-[4px] transition-all duration-300',
          (openMenu || openSearch) && 'z-[201]',
          'header-desktop',
          openMenu && 'duration-0',
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
              <Image
                src={logo.url}
                alt={logo?.alt || ''}
                width={93}
                height={44}
                unoptimized
                priority
                className='xsm:h-[1.5625rem] h-[1.875rem] w-auto'
              />
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
                      className='pc-body-16-r text-en whitespace-nowrap'
                    >
                      {menu.link.title}
                    </Link>
                  ))}
              </div>
            </div>
          </nav>
          {/* search */}
          <div className='flex-y-center xsm:hidden space-x-5'>
            <div className='flex-y-center'>
              <form
                ref={searchRef}
                onClick={!openSearch ? handleOpenSearch : undefined}
                onSubmit={handleSearchSubmit}
                className={cn(
                  'flex-y-center relative size-[1.875rem] rounded-full bg-white/80 transition-all duration-500',
                  openSearch && 'w-[40.04167rem] shrink-0',
                )}
              >
                {openSearch && (
                  <input
                    id='search'
                    type='text'
                    className='pc-body-14-r placeholder:text-text-60 text-text-100 h-full w-full border-none bg-transparent pr-[2rem] pl-[0.73rem] outline-none focus:border-none focus:ring-0 focus:outline-none'
                    placeholder={t('searchPlaceholder')}
                  />
                )}
                <button
                  type={openSearch ? 'submit' : 'button'}
                  aria-label={openSearch ? 'Submit search' : 'Open search'}
                  onClick={openSearch ? undefined : handleOpenSearch}
                  className='flex-center absolute top-0 right-0 size-[1.875rem]'
                >
                  <ICSearchHead className='text-text-100 size-[0.875rem]' />
                </button>
                {searchHistory.length > 0 && (
                  <div
                    id='result'
                    className={cn(
                      'absolute bottom-[-0.88rem] left-0 h-fit w-full translate-y-full cursor-default bg-white p-[1.25rem_0.83rem]',
                      openSearch
                        ? 'pointer-events-auto opacity-100 transition-all delay-300 duration-300'
                        : 'pointer-events-none opacity-0',
                    )}
                    style={{
                      boxShadow:
                        '0 563px 158px 0 rgba(92, 92, 92, 0.00), 0 361px 144px 0 rgba(92, 92, 92, 0.01), 0 203px 122px 0 rgba(92, 92, 92, 0.05), 0 90px 90px 0 rgba(92, 92, 92, 0.09), 0 23px 50px 0 rgba(92, 92, 92, 0.10)',
                    }}
                  >
                    <div className='flex-y-center justify-between border-b border-solid border-[rgba(9,9,9,0.08)] pb-[0.83rem]'>
                      <span className='pc-body-14-r text-text-40'>{t('searchHistory')}</span>
                      <Image
                        src='/header/ic-trash.svg'
                        alt='trash'
                        width={28}
                        height={28}
                        className='size-[1.25rem] shrink-0 cursor-pointer object-contain'
                        unoptimized
                        onClick={handleRemoveAllSearchHistory}
                      />
                    </div>
                    {searchHistory.map((value, index) => (
                      <div
                        key={index}
                        className='pc-body-16-r text-text-100 flex-y-center h-[2.29rem] w-full justify-between'
                      >
                        <Link
                          href={locale === 'vi' ? `${ROUTES.searchVi}?q=${value}` : `${ROUTES.searchEn}?q=${value}`}
                          className='grow text-left'
                          onClick={handleCloseAll}
                        >
                          {value}
                        </Link>
                        <button
                          type='button'
                          onClick={() => handleRemoveSearchHistory(value)}
                        >
                          <ICClose className='text-text-100 size-[0.83333rem] shrink-0 stroke-[1.5px]' />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </form>
              <div
                className={cn(
                  'overflow-hidden transition-all duration-300 ease-out',
                  openSearch
                    ? 'max-w-[2.5rem] opacity-100 pointer-events-auto'
                    : 'max-w-0 opacity-0 pointer-events-none',
                )}
              >
                <button
                  type='button'
                  onClick={handleCloseSearch}
                  aria-label='Close search'
                  className='flex-center ml-1 size-[1.875rem] shrink-0'
                >
                  <ICClose className='text-text-100 size-[0.875rem] stroke-[1.5px]' />
                </button>
              </div>
            </div>
            <Link
              href={menus[menus.length - 1].link.url || ''}
              className='pc-body-16-r text-en xsm:hidden inline-block'
            >
              {menus[menus.length - 1].link.title}
            </Link>
            {!session?.user && (
              <Link href={locale === 'vi' ? '/dang-nhap' : '/login'}>
                <ButtonRed className='xsm:hidden'>
                  <span>{locale === 'vi' ? 'Đăng nhập' : 'Login'}</span>
                  <ICUser className='size-[0.83333rem] text-white' />
                </ButtonRed>
              </Link>
            )}
            <div className='flex-y-center pc-body-16-r text-text-100 xsm:hidden space-x-[0.42rem] uppercase'>
              {['vi', 'en'].map((lang, index) => (
                <Fragment key={lang}>
                  {index > 0 && <div className='h-[0.625rem] w-px bg-[rgba(9,9,9,0.60)]'></div>}
                  <Link
                    href='/'
                    locale={lang}
                    className={cn(lang === locale ? 'text-primary-red-100' : '')}
                  >
                    {lang}
                  </Link>
                </Fragment>
              ))}
            </div>

            {session?.user && (
              <Link
                href={locale === 'vi' ? '/thong-tin-tai-khoan' : '/info'}
                className='flex-y-center space-x-[0.52rem]'
              >
                <div className='relative size-[2.5rem] overflow-hidden rounded-full border border-[#D32F2F]'>
                  <Avatar className='size-full'>
                    <AvatarImage
                      src={session?.user?.avatar_512 || ''}
                      className='object-cover'
                    />
                    <AvatarFallback>
                      <Skeleton className='size-full rounded-full' />
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className=''>
                  <p className='text-[0.83rem] leading-[1.5] tracking-[-0.0167rem] text-[#090909]'>
                    {session?.user?.display_name || '---'}
                  </p>
                  <p className='text-[0.72917rem] leading-[1.5] text-[#090909]/40'>ID: {session?.user?.user_code}</p>
                </div>
              </Link>
            )}
          </div>
          {/* mobile menu */}
          <div className='flex-y-center space-x-[0.63rem] sm:hidden'>
            <form
              onSubmit={handleSearchSubmit}
              className={cn(
                'flex h-[1.875rem] w-[3.9rem] shrink-0 items-center overflow-hidden rounded-[5.20833rem] bg-[rgba(9,_9,_9,_0.10)] transition-[width,opacity,transform] duration-180 ease-out sm:hidden',
                openSearch && 'w-[calc(100%-2.1rem)]',
                openMenu && 'xsm:hidden',
              )}
            >
              <input
                ref={mobileSearchInputRef}
                type='text'
                placeholder={t('searchPlaceholder')}
                id='search-mobile'
                className={cn(
                  'text-en placeholder:pc-body-14-r placeholder:text-en-60 h-[1.875rem] max-w-0 min-w-0 flex-1 border-none bg-transparent p-0 opacity-0 transition-[max-width,opacity,padding] duration-200 ease-out [will-change:max-width,opacity] outline-none focus:border-none focus:ring-0 focus:outline-none',
                  openSearch && 'max-w-full px-[0.83rem] opacity-100',
                )}
              />
              {!openSearch && (
                <button
                  type='button'
                  onClick={handleOpenSearch}
                  className='flex-center size-[1.875rem] shrink-0'
                >
                  <ICSearchHead className='text-text-80 size-[0.9375rem]' />
                </button>
              )}

              {openSearch && (
                <button
                  type='submit'
                  className='flex-center size-[1.875rem] shrink-0'
                >
                  <ICSearchHead className='text-text-80 size-[0.9375rem]' />
                </button>
              )}

              <div
                className={cn(
                  'flex-y-center max-w-[3rem] shrink-0 overflow-hidden transition-[max-width,opacity,transform] duration-150 ease-out [will-change:max-width,opacity,transform]',
                  openSearch
                    ? 'pointer-events-none max-w-0 -translate-x-1 opacity-0 duration-0'
                    : 'max-w-[3rem] translate-x-0 opacity-100',
                )}
              >
                <div className='h-[0.9375rem] border-l border-solid border-[rgba(9,_9,_9,_0.60)]/[0.28]'></div>
                <button
                  type='button'
                  className='flex-center size-[1.875rem] shrink-0'
                  onClick={handleToggleMenu}
                >
                  <ICMenu className='text-text-80 size-[0.9375rem]' />
                </button>
              </div>
            </form>
            {session?.user && !openMenu && !openSearch && (
              <Link href={locale === 'vi' ? '/ca-nhan' : '/personal'}>
                <div className='relative size-[2.03125rem] overflow-hidden rounded-full border border-[#D32F2F] lg:hidden'>
                  <Avatar className='size-full'>
                    <AvatarImage
                      src={session?.user?.avatar_512 || ''}
                      className='object-cover'
                    />
                    <AvatarFallback>
                      <Skeleton className='size-full rounded-full' />
                    </AvatarFallback>
                  </Avatar>
                </div>
              </Link>
            )}
          </div>

          {/* close mobile */}
          {(openMenu || openSearch) && (
            <button
              type='button'
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
          'fixed top-0 left-0 z-[98] h-screen w-full overflow-y-auto bg-white px-[0.83333rem] pt-[calc(2.92rem+0.31rem)] pb-[20vh] transition-[transform,opacity] duration-200 ease-out will-change-transform sm:hidden',
          openMenu ? 'pointer-events-auto translate-x-0 opacity-100' : 'pointer-events-none translate-x-full opacity-0',
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
        <div className='mt-[1.13rem] border-b border-solid border-[rgba(9,9,9,0.08)] pb-[0.3rem]'>
          <button
            type='button'
            onClick={() => setOpenMobileLanguage((prev) => !prev)}
            className='mb-header-16-m text-en flex w-full items-center justify-between'
          >
            <span>{t('language')}</span>
            <ChevronDown
              className={cn(
                'size-[0.95rem] shrink-0 transition-transform duration-200 ease-out',
                openMobileLanguage && 'text-primary-red-100 rotate-180',
              )}
            />
          </button>
          <div
            className={cn(
              'overflow-hidden transition-[max-height,opacity,margin] duration-200 ease-out',
              openMobileLanguage ? 'mt-[0.5rem] max-h-[6rem] opacity-100' : 'mt-0 max-h-0 opacity-0',
            )}
          >
            {languages.map((lang) => (
              <Link
                key={lang.key}
                href='/'
                locale={lang.key}
                className={cn(
                  'pc-body-14-r block py-[0.4rem]',
                  lang.key === locale ? 'text-primary-red-100' : 'text-en-60',
                )}
                onClick={handleCloseAll}
              >
                {lang.label}
              </Link>
            ))}
          </div>
        </div>
        {!session?.user && (
          <Link
            href={locale === 'vi' ? '/dang-nhap' : '/login'}
            onClick={handleCloseAll}
          >
            <ButtonRed className='mt-[2.19rem] mb-[0.83rem] w-full'>
              <span>{locale === 'vi' ? 'Đăng nhập' : 'Login'}</span>
              <ICUser className='size-[0.83333rem] text-white' />
            </ButtonRed>
          </Link>
        )}

        <Link
          href={menus[menus.length - 1].link.url || ''}
          target={menus[menus.length - 1].link.target || '_self'}
          className='block w-full'
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
            ? 'pointer-events-auto translate-x-0 opacity-100'
            : 'pointer-events-none translate-x-full opacity-0',
          openSearch && 'z-[200]',
        )}
      >
        <div className='flex-y-center h-[1.87rem] justify-between'>
          <span className='mb-body-14-r text-text-40'>{t('searchHistory')}</span>
          <Image
            src='/header/ic-trash.svg'
            alt='trash'
            width={28}
            height={28}
            className='size-[1.45833rem] shrink-0 object-contain'
            unoptimized
            onClick={handleRemoveAllSearchHistory}
          />
        </div>
        <div className='h-fit w-full'>
          {searchHistory.map((value, index) => (
            <div
              key={index}
              className='mb-body-14-r text-text-100 flex-y-center h-[2.34rem] w-full justify-between'
            >
              <Link
                href={locale === 'vi' ? `${ROUTES.searchVi}?q=${value}` : `${ROUTES.searchEn}?q=${value}`}
                className='grow text-left'
                onClick={handleCloseAll}
              >
                {value}
              </Link>
              <button
                type='button'
                onClick={() => handleRemoveSearchHistory(value)}
              >
                <ICClose className='text-title-m size-[1rem] shrink-0' />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
