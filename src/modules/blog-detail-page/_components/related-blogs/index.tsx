'use client'

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import CardBlog from '@/components/shared/CardBlog'
import ROUTES from '@/configs/routes'
import useIsMobile from '@/hooks/useIsMobile'
import { Link } from '@/i18n/navigation'
import { IBlog } from '@/interfaces/blog.interface'
import { convertRemToPx } from '@/lib/utils'
import 'swiper/css'
import 'swiper/css/navigation'

const RelatedBlogs = ({ data }: { data: IBlog[] }) => {
  const t = useTranslations('DetailBlogPage')
  const params = useParams<{ slug: string }>()
  const locale = useLocale()
  const { isMobile, isLoading } = useIsMobile()

  const viewAllUrl = locale === 'vi' ? ROUTES.blogsVi : ROUTES.blogsEn

  return (
    <section
      id='related'
      className='xsm:pb-[2.29rem] xsm:pt-[1.04167rem] pb-[6.25rem]'
    >
      <div className='flex-y-center mx-auto max-w-[75rem] justify-between'>
        <h2 className='xsm:px-[0.8275rem] pc-h2-54-s xsm:mb-h2-24-sm text-[#090909]'>{t('related')}</h2>
        <Link
          href={viewAllUrl}
          className='flex-center group xsm:hidden relative h-[2.6rem] w-fit overflow-hidden rounded-[5.20833rem] px-[1.15rem] text-[0.73rem] leading-[1.5] text-[#090909]/60 outline outline-[#090909]/60 transition-all duration-300 hover:text-white hover:outline-none'
        >
          <span className='absolute inset-0 rounded-[inherit] bg-[radial-gradient(298.39%_130.99%_at_6.62%_16.15%,_#CA2A2A_15.19%,_#D32F2F_53.77%,_#FF6E6E_100%)] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100' />
          <span className='flex-center relative z-10'>
            {t('viewAll')}
            <ChevronRightIcon className='ml-1.25 size-[0.83333rem] translate-y-[0.0375rem] text-[#090909]/60 transition-all duration-300 group-hover:translate-x-[0.5rem] group-hover:text-white' />
          </span>
        </Link>
      </div>
      <div className='xsm:hidden relative'>
        {!isMobile && !isLoading && (
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: '.related-blogs-next',
              prevEl: '.related-blogs-prev',
              disabledClass: 'opacity-0 pointer-events-none',
            }}
            grabCursor={true}
            className='mt-[1.67rem] w-[75rem]!'
            slidesPerView={3}
            speed={600}
            spaceBetween={convertRemToPx(1.5625) || 25}
          >
            {Array.isArray(data) &&
              data
                .filter((blog) => blog.slug !== params.slug)
                .map((blog, index) => (
                  <SwiperSlide
                    key={index}
                    className='h-full w-full'
                  >
                    <Link href={locale === 'vi' ? `/tin-tuc/${blog.slug}` : `/blogs/${blog.slug}`}>
                      <CardBlog
                        title={blog.title || ''}
                        category={blog.taxonomies?.category?.[0]?.name || ''}
                        date={blog.date || ''}
                        thumbnail={blog.featured_image || { url: '', alt: '' }}
                        classNameTitle='text-[0.83333rem]'
                        classNameMetaWrapper='space-y-[0.41667rem]'
                        classNameCategory='text-[0.52083rem]'
                        classNameDate='text-[0.52083rem]'
                        classNameMetaRow='space-x-[0.41667rem]'
                      />
                    </Link>
                  </SwiperSlide>
                ))}
          </Swiper>
        )}

        <div className='pointer-events-none absolute top-[6.4375rem] left-1/2 flex w-[83.33333rem] -translate-x-1/2 justify-between'>
          <button
            type='button'
            className='related-blogs-prev flex-center group pointer-events-auto relative size-[2.083rem] cursor-pointer overflow-hidden rounded-full bg-[#F0F0F0] transition-all duration-300'
          >
            <span className='absolute inset-0 rounded-full bg-[radial-gradient(298.39%_130.99%_at_6.62%_16.15%,_#CA2A2A_15.19%,_#D32F2F_53.77%,_#FF6E6E_100%)] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100' />

            <ChevronLeftIcon className='relative z-10 size-[1.25rem] text-[#090909]/60 transition-all duration-300 group-hover:text-white' />
          </button>

          <button
            type='button'
            className='related-blogs-next flex-center group pointer-events-auto relative size-[2.083rem] cursor-pointer overflow-hidden rounded-full bg-[#F0F0F0] transition-all duration-300'
          >
            <span className='absolute inset-0 rounded-full bg-[radial-gradient(298.39%_130.99%_at_6.62%_16.15%,_#CA2A2A_15.19%,_#D32F2F_53.77%,_#FF6E6E_100%)] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100' />

            <ChevronRightIcon className='relative z-10 size-[1.25rem] text-[#090909]/60 transition-all duration-300 group-hover:text-white' />
          </button>
        </div>
      </div>

      {isMobile && !isLoading && (
        <div className='hidden_scroll mt-[0.72917rem] flex space-x-[0.83333rem] overflow-x-auto sm:hidden'>
          {Array.isArray(data) &&
            data
              .filter((blog) => blog.slug !== params.slug)
              .map((blog, index) => (
                <Link
                  key={index}
                  href={locale === 'vi' ? `/tin-tuc/${blog.slug}` : `/blogs/${blog.slug}`}
                  className='xsm:first:ml-[0.83333rem] xsm:last:mr-[0.83333rem] inline-block w-[15.625rem] shrink-0'
                >
                  <CardBlog
                    title={blog.title || ''}
                    category={blog.taxonomies?.category?.[0]?.name || ''}
                    date={blog.date || ''}
                    thumbnail={blog.featured_image || { url: '', alt: '' }}
                    classNameCard='xsm:w-full xsm:flex-col xsm:gap-[1.04167rem] xsm:space-x-0'
                    classNameThumbnail='xsm:h-[9.89583rem] xsm:w-full'
                    classNameTitle='xsm:text-[0.83333rem] xsm:font-semibold'
                    classNameCategory='xsm:text-[0.52083rem] xsm:tracking-normal'
                    classNameDate='xsm:text-[0.52083rem] xsm:tracking-normal'
                    classNameMetaWrapper='xsm:space-y-[0.5rem]'
                    classNameMetaRow='xsm:space-x-[0.5rem]'
                  />
                </Link>
              ))}
        </div>
      )}

      <div className='sm:hidden'>
        <Link
          href={viewAllUrl}
          className='flex-center mx-auto mt-[1.56rem] h-[2.6rem] w-[6.97917rem] rounded-[5.2rem] border border-[#090909]/60'
        >
          <span className='flex-center text-[0.72917rem] leading-[150%] text-[#090909]/60'>
            {t('viewAll')}
            <ChevronRightIcon className='ml-[0.26rem] size-[0.83333rem] text-[#090909]/60' />
          </span>
        </Link>
      </div>
    </section>
  )
}

export default RelatedBlogs
