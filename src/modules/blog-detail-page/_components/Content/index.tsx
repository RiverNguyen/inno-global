'use client'

import { useMemo } from 'react'

import Toc from '@/components/shared/Toc'
import { useWpVideoPlayer } from '@/hooks/useWpVideoPlayer'
import { IBlog } from '@/interfaces/blog.interface'
import { buildTocFromHtml } from '@/utils/buildTocFromHtml'

import './styles.css'
import ShareSection from './ShareSection'

interface ContentProps {
  blog: IBlog
}

export default function Content({ blog }: ContentProps) {
  const { html, tocs } = useMemo(() => {
    const initialHtml = blog?.content || ''
    return buildTocFromHtml(initialHtml)
  }, [blog?.content])

  useWpVideoPlayer('blog_content', html)

  return (
    <section className='xsm:px-[0.83333rem]'>
      <h2 className='font-open-sans xsm:mb-h2-24-sm pc-h2-54-s text-[#090909]'>{blog?.title}</h2>

      <Toc tocs={tocs} />

      <article
        id='blog_content'
        className='blog_content'
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <ShareSection blog={blog} />
    </section>
  )
}
