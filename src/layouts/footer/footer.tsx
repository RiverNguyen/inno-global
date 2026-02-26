'use client'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

import { IAcfImage, IAcfLink } from '@/interfaces/acf-wp.interface'
import { cn } from '@/lib/utils'
interface IFooterContact {
  icon?: IAcfImage
  label?: string
  link?: IAcfLink
}
interface IFooterMenuColumn {
  title?: string
  items?: {
    link?: IAcfLink
  }[]
}
interface IFooterSocial {
  title?: string
  items?: {
    icon?: IAcfImage
    link?: IAcfLink
  }[]
}

export interface IFooter {
  logo?: IAcfImage
  contact?: IFooterContact[]
  menu_column_1?: IFooterMenuColumn
  menu_column_2?: IFooterMenuColumn
  socials?: IFooterSocial
  copyright?: string
  menu_column_3?: IFooterMenuColumn
}

export interface IFooterProps {
  data?: IFooter
}

export default function Footer({ data }: IFooterProps) {
  const [isMobile, setIsMobile] = useState(false)
  const menuColumn1Ref = useRef<HTMLDivElement | null>(null)
  const menuColumn2Ref = useRef<HTMLDivElement | null>(null)
  const menuColumn1SvgRef = useRef<SVGSVGElement | null>(null)
  const pathname = usePathname()
  const { logo, contact, menu_column_1, menu_column_2, socials, copyright, menu_column_3 } = data || {}

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()

    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  useEffect(() => {
    const index = 0
    const item1 = menuColumn1Ref.current
    const item2 = menuColumn2Ref.current
    const svg = menuColumn1SvgRef.current

    if (index === 0 && item1 && item2 && svg) {
      const height = item1.querySelector('.client-height')?.clientHeight
      if (height) {
        if (item1.style.maxHeight) {
          item1.style.maxHeight = ''
        } else {
          item1.style.maxHeight = `${height}px`
          svg.style.transform = 'rotate(180deg)'
        }
      }
      item2.style.maxHeight = ''
    }
  }, [])

  const handleAccordionClick = (e: React.MouseEvent<HTMLParagraphElement>, index: number) => {
    if (!isMobile) return
    const svg = (e.target as HTMLElement).querySelector('svg')
    const item1 = menuColumn1Ref.current
    const item2 = menuColumn2Ref.current
    if (index === 0 && item1 && item2 && svg) {
      const height = item1.querySelector('.client-height')?.clientHeight
      if (height) {
        if (item1.style.maxHeight) {
          item1.style.maxHeight = ''
          svg.style.transform = 'rotate(0deg)'
        } else {
          item1.style.maxHeight = `${height}px`
          svg.style.transform = 'rotate(180deg)'
        }
      }
      item2.style.maxHeight = ''
    } else if (index === 1 && item2 && item1 && svg) {
      const height = item2.querySelector('.client-height')?.clientHeight

      if (height) {
        if (item2.style.maxHeight) {
          item2.style.maxHeight = ''
          svg.style.transform = 'rotate(0deg)'
        } else {
          item2.style.maxHeight = `${height}px`
          svg.style.transform = 'rotate(180deg)'
        }
      }
      item1.style.maxHeight = ''
    }
  }
  if (!data) return null

  const isSocialResponsibilityPage =
    pathname?.includes('/about-us/social-responsibility') || pathname?.includes('/ve-chung-toi/trach-nhiem-xa-hoi')
  const footerBgClass = isSocialResponsibilityPage ? 'bg-white' : 'bg-[#F0F0F0]'

  return (
    <footer className={`${footerBgClass} p-[2.08333rem_0_1.66667rem_0] xsm:p-[2.5rem_0_0.62rem]`}>
      <div className='max-w-[75rem] mx-auto flex xsm:flex-col xsm:max-w-full xsm:px-[0.83333rem]'>
        <div className='max-w-[17.7rem] xsm:max-w-full xsm:pb-[0.83rem]'>
          <Link href='/'>
            <Image
              src={logo?.url || ''}
              alt={logo?.alt || ''}
              width={160}
              height={74.5}
              className='w-[8.33333rem] xsm:w-[4.89583rem] h-auto'
            />
          </Link>
          <div className='mt-[1rem] space-y-[0.73rem]'>
            {Array.isArray(contact) &&
              contact?.map((item, index) => (
                <div
                  className='flex flex-col space-y-[0.41rem]'
                  key={index}
                >
                  <div className='flex items-center space-x-[0.31rem]'>
                    <Image
                      src={item?.icon?.url || ''}
                      alt={item?.icon?.alt || ''}
                      width={40}
                      height={40}
                      className='size-[0.83333rem] object-contain'
                    />
                    {item?.label ? (
                      <span className='text-[#090909] text-[0.625rem] font-semibold leading-[1.4] tracking-[-0.00625rem]'>
                        {item?.label}
                      </span>
                    ) : (
                      <Link
                        href={item?.link?.url || ''}
                        target={item?.link?.target || '_self'}
                        className='text-[#090909] text-[0.625rem] leading-[1.4] tracking-[-0.00625rem]'
                      >
                        {item?.link?.title}
                      </Link>
                    )}
                  </div>
                  {item?.label && (
                    <Link
                      href={item?.link?.url || ''}
                      target={item?.link?.target || '_self'}
                      className='text-[#090909] text-[0.625rem] leading-[1.4] tracking-[-0.00625rem]'
                    >
                      {item?.link?.title}
                    </Link>
                  )}
                </div>
              ))}
          </div>
        </div>
        <hr className='sm:hidden border-t border-[#090909]/10 my-[0.83rem]' />
        <div className='ml-auto w-[31.09375rem] flex flex-col justify-between xsm:w-full'>
          <div className='flex justify-between xsm:flex-col'>
            <div className='space-y-[0.52rem]'>
              <p
                onClick={(e: React.MouseEvent<HTMLParagraphElement>) => handleAccordionClick(e, 0)}
                className='text-[#090909] text-[0.83333rem] font-semibold leading-[1.4] tracking-[-0.00625rem] mb-[0.71rem] xsm:flex xsm:justify-between xsm:items-center xsm:text-[0.625rem]'
              >
                {menu_column_1?.title}{' '}
                <ChevronDown
                  ref={menuColumn1SvgRef}
                  className='size-[0.83333rem] sm:hidden shrink-0 pointer-events-none text-[#D32F2F]'
                />
              </p>
              <div
                ref={menuColumn1Ref}
                className='xsm:max-h-0 xsm:overflow-hidden xsm:transition-all xsm:duration-300 xsm:ease-in-out'
              >
                <div className='client-height xsm:grid-cols-2 xsm:grid sm:space-y-[0.52rem] xsm:gap-[0.52rem] xsm:pb-[0.83rem]'>
                  {Array.isArray(menu_column_1?.items) &&
                    menu_column_1?.items?.map((item, index) => (
                      <p
                        className={cn(
                          'text-[#090909]/80 text-[0.625rem] leading-[1.4] tracking-[-0.00625rem]',
                          index === 0 && 'xsm:order-1',
                          index === 1 && 'xsm:order-3',
                          index === 2 && 'xsm:order-5',
                          index === 3 && 'xsm:order-2',
                          index === 4 && 'xsm:order-4',
                          index === 5 && 'xsm:order-6',
                        )}
                        key={index}
                      >
                        <Link
                          href={item?.link?.url || ''}
                          target={item?.link?.target || '_self'}
                          className="relative inline-block pb-[0.1rem] after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[0.10417rem] after:w-full after:bg-[#E00000] after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 focus-visible:after:scale-x-100"
                        >
                          {item?.link?.title}
                        </Link>
                      </p>
                    ))}
                </div>
              </div>
            </div>
            <hr className='sm:hidden border-t border-[#090909]/10 mb-[0.83rem]' />
            <div className='space-y-[0.52rem]'>
              <p
                onClick={(e: React.MouseEvent<HTMLParagraphElement>) => handleAccordionClick(e, 1)}
                className='text-[#090909] text-[0.83333rem] font-semibold leading-[1.4] tracking-[-0.00625rem] mb-[0.71rem] xsm:flex xsm:justify-between xsm:items-center xsm:text-[0.625rem]'
              >
                {menu_column_2?.title}{' '}
                <ChevronDown className='size-[0.83333rem] sm:hidden shrink-0 pointer-events-none text-[#D32F2F]' />
              </p>
              <div
                ref={menuColumn2Ref}
                className='xsm:max-h-0 xsm:overflow-hidden xsm:transition-all xsm:duration-300 xsm:ease-in-out'
              >
                <div className='client-height xsm:grid-cols-2 space-y-[0.52rem] xsm:pb-[0.83rem]'>
                  {Array.isArray(menu_column_2?.items) &&
                    menu_column_2?.items?.map((item, index) => (
                      <p
                        className='text-[#090909]/80 text-[0.625rem] leading-[1.4] tracking-[-0.00625rem]'
                        key={index}
                      >
                        <Link
                          href={item?.link?.url || ''}
                          target={item?.link?.target || '_self'}
                          className="relative inline-block pb-[0.1rem] after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[0.10417rem] after:w-full after:bg-[#E00000] after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 focus-visible:after:scale-x-100"
                        >
                          {item?.link?.title}
                        </Link>
                      </p>
                    ))}
                </div>
              </div>
            </div>
            <hr className='sm:hidden border-t border-[#0 mb-[0.83rem]' />
            <div className='space-y-[0.94rem]'>
              <p className='xsm:hidden text-[#090909] text-[0.83333rem] font-semibold leading-[1.4] tracking-[-0.00625rem] mb-[0.71rem]'>
                {socials?.title}
              </p>
              <div>
                <div className='flex space-x-[0.89rem] xsm:space-x-[0.62rem]'>
                  {Array.isArray(socials?.items) &&
                    socials?.items?.map((item, index) => (
                      <Link
                        href={item?.link?.url || ''}
                        target={item?.link?.target || '_self'}
                        key={index}
                      >
                        <Image
                          src={item?.icon?.url || ''}
                          alt={item?.icon?.alt || ''}
                          width={40}
                          height={40}
                          className='size-[1.75rem] xsm:size-[1rem] object-contain'
                        />
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className='mt-auto xsm:mt-[1.46rem] xsm:flex xsm:flex-col-reverse'>
            <p className='sm:text-right text-[#090909]/60 text-[0.625rem] leading-[1.4] tracking-[-0.00625rem] xsm:mt-[0.62rem]'>
              {copyright}
            </p>
            <div className='flex items-center sm:justify-end space-x-[0.83rem] mt-[0.68rem] text-[#090909] text-[0.625rem] leading-[1.4] tracking-[-0.00625rem] xsm:justify-between'>
              {Array.isArray(menu_column_3?.items) &&
                menu_column_3?.items?.map((item, index) => (
                  <React.Fragment key={index}>
                    <Link
                      href={item?.link?.url || ''}
                      target={item?.link?.target || '_self'}
                      key={index}
                      className="relative inline-block pb-[0.1rem] after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[0.10417rem] after:w-full after:bg-[#E00000] after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 focus-visible:after:scale-x-100"
                    >
                      {item?.link?.title}
                    </Link>
                    {index < (menu_column_3?.items?.length || 0) - 1 && (
                      <span className='inline-block w-[0.05208rem] h-[0.57292rem] bg-[#090909]'></span>
                    )}
                  </React.Fragment>
                ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// interface IFooterColumnAccordionProps {
//   menu_column_1?: IFooterMenuColumn
//   menu_column_2?: IFooterMenuColumn
// }
// function FooterColumnAccordion({ menu_column_1, menu_column_2 }: IFooterColumnAccordionProps) {
//   return (
//     <Accordion
//       type='single'
//       collapsible
//       defaultValue='item-1'
//       className='max-w-lg sm:hidden'
//     >
//       <AccordionItem
//         key={menu_column_1?.title}
//         value={menu_column_1?.title || ''}
//       >
//         <AccordionTrigger>{menu_column_1?.title}</AccordionTrigger>
//         <AccordionContent>
//           {menu_column_1?.items?.map((item) => (
//             <Link
//               href={item?.link?.url || ''}
//               target={item?.link?.target || '_self'}
//               key={item?.link?.url || ''}
//             >
//               {item?.link?.title}
//             </Link>
//           ))}
//         </AccordionContent>
//       </AccordionItem>
//       <AccordionItem
//         key={menu_column_2?.title}
//         value={menu_column_2?.title || ''}
//       >
//         <AccordionTrigger>{menu_column_2?.title}</AccordionTrigger>
//         <AccordionContent>
//           {menu_column_2?.items?.map((item) => (
//             <Link
//               href={item?.link?.url || ''}
//               target={item?.link?.target || '_self'}
//               key={item?.link?.url || ''}
//             >
//               {item?.link?.title}
//             </Link>
//           ))}
//         </AccordionContent>
//       </AccordionItem>
//     </Accordion>
//   )
// }
