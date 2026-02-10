'use client'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'

import ROUTES from '@/configs/routes'
import { IBlog } from '@/interfaces/blog.interface'

export default function NewsItem({ data }: { data: IBlog }) {
  const t = useTranslations('HomePage')
  const locale = useLocale()
  const category = data?.taxonomies?.category[0]?.taxonomy || ''

  return (
    <div className='flex items-center space-x-[1.04083rem] group xsm:space-x-[0.52083rem]'>
      <Link
        className='w-[9.01042rem] h-[6.35417rem] overflow-hidden rounded-[0.20833rem] xsm:w-[5.10417rem] xsm:h-[3.59375rem]'
        href={locale === 'vi' ? `${ROUTES.blogsVi}/${data?.slug}` : `${ROUTES.blogsEn}/${data?.slug}`}
      >
        <Image
          src={data?.featured_image?.url || '/default.webp'}
          alt={data?.title}
          width={789}
          height={607}
          className='size-full object-cover rounded-[0.20833rem] lg:group-hover:scale-105 transition-all duration-300 ease-in-out'
        />
      </Link>
      <Link
        href={locale === 'vi' ? `${ROUTES.blogsVi}/${data?.slug}` : `${ROUTES.blogsEn}/${data?.slug}`}
        className='flex-1 flex flex-col h-full'
      >
        <p className='text-[0.625rem] opacity-90 mb-[0.25rem] text-[rgba(9,9,9,0.60)] xsm:text-[0.52083rem]'>
          <span className='uppercase mr-[0.62rem] text-[#D32F2F]'>{category}</span>
          <span>{data.date}</span>
        </p>
        <h3 className='text-[0.9375rem] leading-[1.5] line-clamp-2 text-[#090909] xsm:text-[0.72917rem]'>
          {data?.title}
        </h3>
        <span className='lg:group-hover:text-[#D32F2F] self-end flex items-center space-x-[0.20833rem] text-[0.833rem] mt-auto text-[rgba(9,9,9,0.60)] opacity-80 transition-all duration-300 ease-in-out xsm:hidden'>
          {t('viewDetail')}{' '}
          <ChevronRight className='size-[0.833rem] lg:group-hover:translate-x-[0.25rem] transition-all duration-300 ease-in-out' />
        </span>
      </Link>
    </div>
  )
}
