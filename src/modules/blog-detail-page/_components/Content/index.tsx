'use client'

import { useEffect, useMemo } from 'react'

import { IBlog } from '@/interfaces/blog.interface'

import './styles.css'
import ShareSection from './ShareSection'
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
  const { html, tocs } = useMemo(() => {
    const initialHtml = blog?.content || ''
    if (!initialHtml) {
      return { html: '', tocs: [] as TocItem[] }
    }

    // Convert WordPress-style [video] shortcodes to actual <video> elements
    // const shortcodeRegex = /\[video([^\]]*)\]\[\/video\]/gi
    // const processedHtml = initialHtml.replace(shortcodeRegex, (_match, attrs) => {
    //   const attrRegex = /(\w+)="([^"]*)"/g
    //   const attrMap: Record<string, string> = {}

    //   let attrMatch: RegExpExecArray | null

    //   while ((attrMatch = attrRegex.exec(attrs)) !== null) {
    //     const [, key, value] = attrMatch
    //     attrMap[key] = value
    //   }

    //   const mp4Src = attrMap.mp4
    //   if (!mp4Src) return ''

    //   const width = attrMap.width || '100%'
    //   const height = attrMap.height || 'auto'

    //   return `<video controls width="${width}" height="${height}" style="max-width: 100%; height: auto; display: block; margin: 1.5rem 0;">
    //   <source src="${mp4Src}" type="video/mp4" />
    //   Your browser does not support the video tag.
    // </video>`
    // })

    const parser = new DOMParser()
    const doc = parser.parseFromString(initialHtml, 'text/html')
    // const doc = parser.parseFromString(processedHtml, 'text/html')

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

  // Handle video playback (blog detail page)
  useEffect(() => {
    const container = document.getElementById('blog_content')
    if (!container) return

    const wrappers = container.querySelectorAll<HTMLDivElement>('.wp-video')
    const cleanups: (() => void)[] = []

    wrappers.forEach((wrapper) => {
      const video = wrapper.querySelector('video')
      if (!video) return

      let isPlaying = false

      const enableOverlayClick = () => {
        wrapper.addEventListener('click', handleClick)
      }

      const disableOverlayClick = () => {
        wrapper.removeEventListener('click', handleClick)
      }

      const handleClick = () => {
        if (!isPlaying) {
          video.play()
        }
      }

      const onPlay = () => {
        isPlaying = true
        wrapper.classList.add('is-playing')
        video.controls = true
        disableOverlayClick()
      }

      const onPause = () => {
        isPlaying = false
        wrapper.classList.remove('is-playing')
        video.controls = false
        enableOverlayClick()
      }

      // initial state
      video.controls = false
      enableOverlayClick()

      video.addEventListener('play', onPlay)
      video.addEventListener('pause', onPause)
      video.addEventListener('ended', onPause)

      cleanups.push(() => {
        video.removeEventListener('play', onPlay)
        video.removeEventListener('pause', onPause)
        video.removeEventListener('ended', onPause)
        disableOverlayClick()
      })
    })

    return () => cleanups.forEach((fn) => fn())
  }, [html])

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
      <ShareSection blog={blog} />
    </section>
  )
}