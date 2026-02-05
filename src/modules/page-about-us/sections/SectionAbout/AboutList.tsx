import { useLocale } from 'next-intl'
import { SVGProps } from 'react'

import { Link } from '@/i18n/navigation'
import { INavItemAcf } from '@/interfaces/about-us.interface'

interface AboutListProps {
  navItems: INavItemAcf[]
}

export default function AboutList({ navItems }: AboutListProps) {
  const locale = useLocale()
  if (!Array.isArray(navItems) || !navItems?.length) return null

  return (
    <ul className='font-open-sans xsm:grid-cols-2 xsm:gap-x-[1.04167rem] xsm:gap-y-[1.04167rem] grid grid-cols-4 gap-x-[1.66667rem] gap-y-[2.5rem]'>
      {navItems?.map((item, index) => (
        <li
          key={index}
          className='border-primary/12 xsm:border-b-0 xsm:border-t-[0.05208rem] xsm:border-t-primary/10 xsm:pb-0 xsm:pt-[0.72917rem] col-span-1 border-b border-solid pb-[0.83333rem]'
        >
          <Link
            locale={locale}
            href={item?.link?.url || '#'}
            target={item?.link?.target || '_self'}
            className='text-primary group xsm:space-x-[0.41667rem] flex space-x-[0.72917rem]'
          >
            <ICArrowRight className='xsm:size-[0.625rem] xsm:mt-[0.125rem] mt-[0.175rem] size-[1.04167rem] shrink-0 text-current' />
            <p className='lg:group-hover:border-primary-red xsm:text-[0.625rem] border-b border-solid border-transparent text-[0.9375rem] leading-[1.5] font-semibold text-current transition-colors duration-300 ease-out'>
              {item?.link?.title || ''}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  )
}

function ICArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={20}
      height={20}
      viewBox='0 0 20 20'
      fill='none'
      {...props}
    >
      <path
        d='M11.8712 9.99976L14.5756 10.0082L11.873 9.99976L6.91524 4.70488L8.09375 3.52637L14.5756 10.0082L8.09374 16.49L6.91523 15.3115L11.8712 9.99976Z'
        fill='currentColor'
      />
    </svg>
  )
}
