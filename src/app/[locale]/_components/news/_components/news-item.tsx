'use client'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'

import ROUTES from '@/configs/routes'
import { IBlog } from '@/interfaces/blog.interface'
import { formatDateDDMMYYYY } from '@/lib/utils'

export default function NewsItem({ data }: { data: IBlog }) {
  const t = useTranslations('HomePage')
  const locale = useLocale()
  const category = data?.taxonomies?.category[0]?.name || ''

  return (
    <div className='group xsm:space-x-[0.52083rem] flex items-center space-x-[1.04083rem]'>
      <Link
        className='xsm:w-[5.10417rem] xsm:h-[3.59375rem] h-[6.35417rem] w-[9.01042rem] overflow-hidden rounded-[0.20833rem]'
        href={locale === 'vi' ? `${ROUTES.blogsVi}/${data?.slug}` : `${ROUTES.blogsEn}/${data?.slug}`}
      >
        <Image
          src={data?.featured_image?.url || '/default.webp'}
          alt={data?.title}
          width={789}
          height={607}
          className='size-full rounded-[0.20833rem] object-cover transition-all duration-300 ease-in-out lg:group-hover:scale-105'
        />
      </Link>
      <Link
        href={locale === 'vi' ? `${ROUTES.blogsVi}/${data?.slug}` : `${ROUTES.blogsEn}/${data?.slug}`}
        className='flex h-full flex-1 flex-col'
      >
        <p className='xsm:text-[0.52083rem] mb-[0.25rem] text-[0.625rem] text-[rgba(9,9,9,0.60)] opacity-90'>
          <span className='mr-[0.62rem] text-[#D32F2F] uppercase'>{category}</span>
          <span>{formatDateDDMMYYYY(data.date)}</span>
        </p>
        <h3 className='xsm:text-[0.72917rem] line-clamp-2 text-[0.9375rem] leading-[1.5] text-[#090909]'>
          {data?.title}
        </h3>
        <span className='xsm:hidden mt-auto flex items-center space-x-[0.20833rem] self-end text-[0.833rem] text-[rgba(9,9,9,0.60)] opacity-80 transition-all duration-300 ease-in-out lg:group-hover:text-[#D32F2F]'>
          {t('viewDetail')}{' '}
          <ChevronRight className='size-[0.833rem] transition-all duration-300 ease-in-out lg:group-hover:translate-x-[0.25rem]' />
        </span>
      </Link>
    </div>
  )
}
