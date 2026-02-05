import { useLocale } from 'next-intl'
import { SVGProps } from 'react'

import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

interface BreadcrumbProps {
  navItems: { label: string; href: string }[]
  lastItem: { label: string }
  classNameNavItems?: string
  classNameLastItem?: string
  classNameContainer?: string
  classNameItemsContainer?: string
  classNameIcon?: string
}

export default function Breadcrumb({
  navItems,
  lastItem,
  classNameNavItems,
  classNameLastItem,
  classNameContainer,
  classNameItemsContainer,
  classNameIcon,
}: BreadcrumbProps) {
  const locale = useLocale()

  return (
    <nav className={cn('relative', classNameContainer)}>
      <ul
        className={cn(
          'font-open-sans flex items-center space-x-[0.52083rem]',
          classNameItemsContainer,
        )}
      >
        {navItems?.map((item, index) => (
          <li
            key={index}
            className='flex shrink-0 items-center space-x-[0.52083rem]'
          >
            <Link
              locale={locale}
              href={item?.href || '#'}
              className={cn(
                'text-primary/40 pc-body-14-r shrink-0 cursor-pointer',
                classNameNavItems,
              )}
            >
              <p className='text-edge-[cap_alphabetic] text-trim-both'>{item?.label}</p>
            </Link>
            <ICArrowRight className={cn('text-primary size-[0.83333rem]', classNameIcon)} />
          </li>
        ))}

        <li className={cn('text-primary/60 pc-body-14-sm shrink-0', classNameLastItem)}>
          <p className='text-edge-[cap_alphabetic] text-trim-both'>{lastItem?.label}</p>
        </li>
      </ul>
    </nav>
  )
}

function ICArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={16}
      height={16}
      viewBox='0 0 16 16'
      fill='none'
      {...props}
    >
      <path
        d='M5.93945 13.2797L10.2861 8.93306C10.7995 8.41973 10.7995 7.57973 10.2861 7.06639L5.93945 2.71973'
        stroke='currentColor'
        strokeOpacity='0.4'
        strokeWidth='1.5'
        strokeMiterlimit={10}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
