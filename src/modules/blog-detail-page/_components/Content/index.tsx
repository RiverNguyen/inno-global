'use client'

import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import { toast } from 'sonner'

import IconFacebook from '@/components/icons/ICFacebook'
import IconLinkedin from '@/components/icons/ICInstagram'
import IconShareLink from '@/components/icons/ICShareLink'
import IconTwitter from '@/components/icons/ICTwitter'
import { IBlog } from '@/interfaces/blog.interface'
import { formatDateToDDMMYYYY } from '@/lib/utils'

import './styles.css'
import Toc from './toc'

interface TocItem {
  id: string
  text: string
  level: number // h1 -> 1, h2 -> 2...
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

interface ContentProps {
  blog: IBlog
}

export default function Content({ blog }: ContentProps) {
  const t = useTranslations('DetailBlogPage')
  const { html, tocs } = useMemo(() => {
    const initialHtml = blog?.content || ''
    if (!initialHtml) {
      return { html: '', tocs: [] as TocItem[] }
    }

    // Convert WordPress-style [video] shortcodes to actual <video> elements
    const shortcodeRegex = /\[video([^\]]*)\]\[\/video\]/gi
    const processedHtml = initialHtml.replace(shortcodeRegex, (_match, attrs) => {
      const attrRegex = /(\w+)="([^"]*)"/g
      const attrMap: Record<string, string> = {}

      let attrMatch: RegExpExecArray | null

      while ((attrMatch = attrRegex.exec(attrs)) !== null) {
        const [, key, value] = attrMatch
        attrMap[key] = value
      }

      const mp4Src = attrMap.mp4
      if (!mp4Src) return ''

      const width = attrMap.width || '100%'
      const height = attrMap.height || 'auto'

      return `<video controls width="${width}" height="${height}" style="max-width: 100%; height: auto; display: block; margin: 1.5rem 0;">
      <source src="${mp4Src}" type="video/mp4" />
      Your browser does not support the video tag.
    </video>`
    })

    const parser = new DOMParser()
    // const doc = parser.parseFromString(initialHtml, 'text/html')
    const doc = parser.parseFromString(processedHtml, 'text/html')

    const tables = Array.from(doc.querySelectorAll('table'))

    tables.forEach((table) => {
      if (table.parentElement?.classList.contains('table-wrapper')) return

      const wrapper = doc.createElement('div')
      wrapper.className = 'table-wrapper'

      table.parentNode?.insertBefore(wrapper, table)
      wrapper.appendChild(table)
    })

    const headings = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6'))
    const usedIds = new Set<string>()

    headings.forEach((heading) => {
      if (heading.id) {
        usedIds.add(heading.id)
        return
      }

      const text = heading.textContent?.trim()
      if (!text) return

      const baseId = slugify(text)
      let id = baseId
      let i = 1

      while (usedIds.has(id)) {
        id = `${baseId}-${i++}`
      }

      heading.id = id
      usedIds.add(id)
    })

    const mappedTocs: TocItem[] = headings.map((heading) => ({
      id: heading.id,
      text: heading.textContent?.trim() || '',
      level: Number(heading.tagName.replace('H', '')),
    }))

    return {
      html: doc.body.innerHTML,
      tocs: mappedTocs,
    }
  }, [blog?.content])

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const encodedUrl = encodeURIComponent(shareUrl)
  const title = typeof document !== 'undefined' ? document.title : ''

  const handleCopyLink = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ url: encodedUrl, title })
        return
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        return
      }
      try {
        await navigator.clipboard.writeText(encodedUrl)
        toast.success('Liên kết đã được sao chép vào bảng tạm')
      } catch (clipboardError) {
        console.error('Clipboard error:', clipboardError)
      }
    }
  }

  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
  const linkedInShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
  const xShare = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent(title)}`

  return (
    <section className='xsm:px-[0.83333rem]'>
      <h2 className='text-[#090909] font-open-sans text-[2.08333rem] font-semibold leading-[120%] tracking-[-0.03125rem] xsm:text-[1.35417rem] xsm:tracking-normal'>
        {blog?.title}
      </h2>

      <Toc tocs={tocs} />

      <article
        id='blog_content'
        className='blog_content'
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <div className='flex justify-between items-center pt-[0.9375rem] border-t-[0.05208rem] border-t-[rgba(9,9,9,0.08)] mt-[2.08333rem] xsm:flex-col-reverse xsm:items-start xsm:justify-start xsm:gap-[1.04167rem] xsm:p-[0.83333rem_0_2.08333rem_0] xsm:mt-[1.66667rem]'>
        <div className='flex items-center gap-[0.52083rem]'>
          <span className='text-[rgba(9,9,9,0.80) font-open-sans text-[0.9375rem] leading-[150%] xsm:text-[0.625rem] xsm:tracking-[-0.00625rem]'>
            Chia sẻ:
          </span>
          <div className='flex items-center gap-[0.625rem]'>
            <button
              onClick={handleCopyLink}
              className='size-[2.08333rem] xsm:size-[1.25rem]'
              aria-label='Sao chép liên kết'
            >
              <IconShareLink className='w-full h-auto' />
            </button>
            <a
              href={facebookShare}
              target='_blank'
              rel='noopener noreferrer'
              className='size-[2.08333rem] xsm:size-[1.25rem]'
              aria-label='Chia sẻ lên Facebook'
            >
              <IconFacebook className='w-full h-auto' />
            </a>
            <a
              href={linkedInShare}
              target='_blank'
              rel='noopener noreferrer'
              className='size-[2.08333rem] xsm:size-[1.25rem]'
              aria-label='Chia sẻ lên LinkedIn'
            >
              <IconLinkedin className='w-full h-auto' />
            </a>
            <a
              href={xShare}
              target='_blank'
              rel='noopener noreferrer'
              className='size-[2.08333rem] xsm:size-[1.25rem]'
              aria-label='Chia sẻ lên X'
            >
              <IconTwitter className='w-full h-auto' />
            </a>
          </div>
        </div>

        <div className='flex items-center gap-[1.71875rem] xsm:flex-col xsm:items-start xsm:gap-[0.625rem]'>
          <div className='flex items-center gap-[0.52083rem] font-open-sans text-[0.9375rem] leading-[150%] xsm:gap-[0.26042rem] xsm:text-[0.625rem]'>
            <span className='text-[rgba(9,9,9,0.80)] xsm:text-[rgba(46,46,46,0.75)] xsm:tracking-[-0.00625rem]'>
              {t('writtenBy')}:
            </span>
            <span className='text-[#090909] font-semibold xsm:capitalize'>
              {blog?.author}
            </span>
          </div>

          <div className='flex items-center gap-[0.52083rem] font-open-sans text-[0.9375rem] leading-[150%] xsm:gap-[0.26042rem] xsm:text-[0.625rem]'>
            <span className='text-[rgba(9,9,9,0.80)] xsm:text-[rgba(46,46,46,0.75)] xsm:tracking-[-0.00625rem]'>
              {t('publishedDate')}:
            </span>
            <span className='text-[#090909] font-semibold xsm:capitalize'>
              {formatDateToDDMMYYYY(blog?.date)}
            </span>
          </div>

          <div className='flex items-center gap-[0.52083rem] font-open-sans text-[0.9375rem] leading-[150%] xsm:gap-[0.26042rem] xsm:text-[0.625rem]'>
            <span className='text-[rgba(9,9,9,0.80)] xsm:text-[rgba(46,46,46,0.75)] xsm:tracking-[-0.00625rem]'>
              {t('tag')}:
            </span>
            <div className='flex items-center gap-[0.26042rem]'>
              {blog?.taxonomies?.post_tag?.map((tag) => (
                <span
                  key={tag.id}
                  className='flex-center py-[0.41667rem] px-[0.52083rem] bg-[rgba(211,47,47,0.06)] text-[#D32F2F] font-open-sans text-[0.72917rem] leading-[150%] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] xsm:text-[0.625rem]'
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}