import { ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import React from 'react'

import NewsFeatured from '@/app/[locale]/_components/news/_components/news-featured'
import NewsItem from '@/app/[locale]/_components/news/_components/news-item'
import ROUTES from '@/configs/routes'
import { IBlog } from '@/interfaces/blog.interface'

interface NewsProps {
  data: IBlog[]
}

export default function News({ data }: NewsProps) {
  const t = useTranslations('HomePage')
  const locale = useLocale()

  return (
    <div className='w-full sm:h-[56.25rem] lg:h-fit p-[3.22rem_0_4.24rem] xsm:p-[2.5rem_0.83rem]'>
      <div className='max-w-[85.42rem] mx-auto flex h-full xsm:flex-col xsm:max-w-full'>
        <h2 className='sm:hidden text-[1.25rem] font-semibold leading-[120%] tracking-[-0.03125rem] text-[#090909] mb-[1.25rem]'>
          {t('blogs')}
        </h2>
        <NewsFeatured data={data[0]} />
        <div className='flex flex-col flex-1 sm:ml-[2.5rem] xsm:mt-[1.25rem]'>
          <h2 className='xsm:hidden text-[2.08333rem] font-semibold leading-[120%] tracking-[-0.03125rem] text-[#090909] mb-[2.08rem]'>
            {t('blogs')}
          </h2>
          <hr className='xsm:hidden border-t border-gray-200 mb-[1.46rem]' />
          {Array.isArray(data) &&
            data.slice(1).map((item) => (
              <React.Fragment key={item.id}>
                <NewsItem data={item} />
                <hr className='border-t border-gray-200 my-[1.46rem] xsm:my-[0.83rem]' />
              </React.Fragment>
            ))}
          <Link
            href={locale === 'vi' ? ROUTES.blogsVi : ROUTES.blogsEn}
            className='group relative w-[6.97917rem] rounded-[5.20833rem] self-end flex-center text-[0.72917rem] leading-[1.5] border border-[#090909]/60 text-[#090909]/60 py-[0.88542rem] hover:text-white hover:border-transparent transition-all duration-300 ease-in-out xsm:w-full xsm:py-[0.625rem]'
          >
            <span
              style={{
                backdropFilter: 'blur(6px)',
              }}
              className='absolute inset-0 rounded-[inherit] bg-[radial-gradient(298.39%_130.99%_at_6.62%_16.15%,#CA2A2A_15.19%,#D32F2F_53.77%,#FF6E6E_100%)] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'
            />
            <span className='relative z-10 mr-[0.20833rem]'>{t('viewAll')}</span>
            <ChevronRightIcon className='relative z-10 size-[0.833rem] group-hover:translate-x-[0.25rem] transition-all duration-300 ease-in-out' />
          </Link>
        </div>
      </div>
    </div>
  )
}
