'use client'

import { useIntersectionObserver } from '@uidotdev/usehooks'
import { useParams } from 'next/navigation'
import { useLocale } from 'next-intl'
import { useEffect, useState } from 'react'

import CardBlog from '@/components/shared/CardBlog'
import { Link } from '@/i18n/navigation'
import { IRelatedBlogItemData, IRelatedBlogsDataRes } from '@/interfaces/detail-service.interface'
import serviceApi from '@/services/service'

interface RelatedBlogsProps {
  totalPages: number
  initRelatedBlogs: IRelatedBlogItemData[]
}

export default function RelatedBlogs({ totalPages, initRelatedBlogs }: RelatedBlogsProps) {
  const locale = useLocale()
  const { slug } = useParams<{ slug: string }>()

  const [relatedBlogs, setRelatedBlogs] = useState<IRelatedBlogItemData[]>(initRelatedBlogs)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: totalPages,
  })

  const [infiniteLoadingRef, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: '0px',
  })

  useEffect(() => {
    ;(async () => {
      if (entry?.isIntersecting && pagination.currentPage < pagination.totalPages) {
        const relatedBlogsRes: IRelatedBlogsDataRes = await serviceApi.getRelatedBlogs({
          slug: slug,
          limit: 6,
          lang: locale,
          paged: pagination.currentPage + 1,
        })
        setRelatedBlogs((prevData) => [...prevData, ...relatedBlogsRes.data])
        setPagination((prevData) => ({ ...prevData, currentPage: relatedBlogsRes.page }))
      }
    })()
  }, [entry?.isIntersecting, locale, pagination.currentPage, pagination.totalPages, slug])

  return (
    <>
      <div className='xsm:grid-cols-1 xsm:gap-[1.04167rem] grid grid-cols-3 gap-[2.08333rem]'>
        {Array.isArray(relatedBlogs) &&
          relatedBlogs.map((item, index) => (
            <Link
              locale={locale}
              href={'/'}
              key={index}
              className='col-span-1'
            >
              <CardBlog
                title={item?.title}
                category={item?.taxonomies?.category?.[0]?.name || ''}
                date={item?.date}
                thumbnail={item?.featured_image}
              />
            </Link>
          ))}
      </div>
      <div ref={infiniteLoadingRef}></div>
    </>
  )
}
