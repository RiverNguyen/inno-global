import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { HTMLAttributes } from 'react'

import ROUTES from '@/configs/routes'
import { Link } from '@/i18n/navigation'
import { IBlog } from '@/interfaces/blog.interface'
import { cn, formatDateDDMMYYYY } from '@/lib/utils'

interface NewsFeaturedProps extends HTMLAttributes<HTMLDivElement> {
  data: IBlog
}

export default function NewsFeatured({ data, ...props }: NewsFeaturedProps) {
  const t = useTranslations('HomePage')
  const locale = useLocale()

  const category = data?.taxonomies?.category[0]?.name || ''

  return (
    <div
      {...props}
      className={cn(
        'xsm:w-full xsm:h-[21rem] flex h-[45.52083rem] w-[41.09375rem] flex-col overflow-hidden rounded-[0.20833rem]',
        props.className,
      )}
    >
      <Link href={locale === 'vi' ? `${ROUTES.blogsVi}/${data?.slug}` : `${ROUTES.blogsEn}/${data?.slug}`}>
        <Image
          src={data?.featured_image?.url || '/default.webp'}
          alt={data?.title}
          width={789}
          height={607}
          className='xsm:h-[13.74375rem] h-[31.6rem] w-full object-cover'
        />
      </Link>
      <Link
        href={locale === 'vi' ? `${ROUTES.blogsVi}/${data?.slug}` : `${ROUTES.blogsEn}/${data?.slug}`}
        className='group xsm:p-[1.25rem_0.83333rem] xsm:space-y-[0.62rem] flex flex-1 flex-col space-y-[0.25rem] bg-[rgba(28,28,28,0.80)] p-[2.08333rem_3.125rem_1rem_3.125rem] text-white'
      >
        <p className='xsm:text-[0.52083rem] text-[0.625rem] opacity-90'>
          <span className='mr-[0.62rem] uppercase'>{category || '-'}</span>
          <span>{formatDateDDMMYYYY(data?.date || '')}</span>
        </p>
        <h3 className='xsm:text-[0.83333rem] line-clamp-2 text-[1.25rem] leading-normal font-semibold tracking-[-0.05rem]'>
          {data?.title}
        </h3>
        <p className='xsm:hidden line-clamp-3 text-[0.9375rem] leading-[150%] font-normal tracking-[-0.025rem] opacity-80'>
          {data?.acf?.short_desc || '-'}
        </p>
        <span className='xsm:text-[0.67708rem] xsm:mt-auto flex items-center space-x-[0.20833rem] text-[0.833rem] sm:self-end'>
          {t('viewDetail')}{' '}
          <ChevronRight className='xsm:size-[0.72917rem] size-[0.833rem] transition-all duration-300 ease-in-out group-hover:translate-x-[0.25rem]' />
        </span>
      </Link>
    </div>
  )
}
