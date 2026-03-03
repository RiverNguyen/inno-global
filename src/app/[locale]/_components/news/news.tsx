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
    <div className='xsm:p-[2.5rem_0.83rem] h-screen w-full xsm:h-auto'>
      <div className='flex-center xsm:flex-col xsm:max-w-full mx-auto h-full max-w-[85.42rem] xsm:h-auto'>
        <h2 className='mb-[1.25rem] text-[1.25rem] leading-[120%] font-semibold tracking-[-0.03125rem] text-[#090909] sm:hidden'>
          {t('blogs')}
        </h2>
        <NewsFeatured data={data[0]} />
        <div className='xsm:mt-[1.25rem] flex flex-1 flex-col sm:ml-[2.5rem]'>
          <h2 className='xsm:hidden mb-[1.5rem] text-[2.08333rem] leading-[120%] font-semibold tracking-[-0.03125rem] text-[#090909]'>
            {t('blogs')}
          </h2>
          <hr className='xsm:hidden mb-[1.46rem] border-t border-gray-200' />
          {Array.isArray(data) &&
            data.slice(1).map((item) => (
              <React.Fragment key={item.id}>
                <NewsItem data={item} />
                <hr className='xsm:my-[0.83rem] my-[1.46rem] border-t border-gray-200' />
              </React.Fragment>
            ))}
          <Link
            href={locale === 'vi' ? ROUTES.blogsVi : ROUTES.blogsEn}
            className='group flex-center xsm:w-full h-[2.6rem] xsm:py-[0.625rem] relative w-[6.97917rem] self-end rounded-[5.20833rem] border border-[#090909]/60 py-[0.88542rem] text-[0.72917rem] leading-[1.5] text-[#090909]/60 transition-all duration-300 ease-in-out hover:border-transparent hover:text-white'
          >
            <span
              style={{
                backdropFilter: 'blur(6px)',
              }}
              className='absolute inset-0 rounded-[inherit] bg-[radial-gradient(298.39%_130.99%_at_6.62%_16.15%,#CA2A2A_15.19%,#D32F2F_53.77%,#FF6E6E_100%)] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'
            />
            <span className='relative z-10 mr-[0.20833rem]'>{t('viewAll')}</span>
            <ChevronRightIcon className='relative z-10 size-[0.833rem] transition-all duration-300 ease-in-out group-hover:translate-x-[0.25rem]' />
          </Link>
        </div>
      </div>
    </div>
  )
}
