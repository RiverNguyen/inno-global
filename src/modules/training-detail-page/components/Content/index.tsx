'use client'

import { useEffect, useMemo } from 'react'

import './styles.css'
import { ITraining } from '@/interfaces/training.inteface'
import Summary from '@/modules/blog-detail-page/_components/Content/toc'
import ShareSection from '../ShareSection'

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
  training: ITraining
}

export default function Content({ training }: ContentProps) {
  const { html, tocs } = useMemo(() => {
    const initialHtml = training?.content || ''
    if (!initialHtml) {
      return { html: '', tocs: [] as TocItem[] }
    }

    const parser = new DOMParser()
    const doc = parser.parseFromString(initialHtml, 'text/html')

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
  }, [training?.content])

  // Handle video playback (blog detail page)
  useEffect(() => {
    const container = document.getElementById('blog_content')
    if (!container) return

    const wrappers = container.querySelectorAll<HTMLDivElement>('.wp-video')
    const cleanups: (() => void)[] = []

    wrappers.forEach((wrapper) => {
      const video = wrapper.querySelector('video')
      if (!video) return

      const handleClick = (e: MouseEvent) => {
        // Chỉ play khi đang paused
        if (video.paused && !wrapper.classList.contains('is-fullscreen')) {
          video.play()
        }
      }

      const onPlay = () => {
        wrapper.classList.add('is-playing')
        video.controls = true
        wrapper.removeEventListener('click', handleClick)
      }

      const onPause = () => {
        wrapper.classList.remove('is-playing')
        video.controls = false
        wrapper.addEventListener('click', handleClick)
      }

      const onFullscreenChange = () => {
        const isFullscreen = document.fullscreenElement === video || document.fullscreenElement === wrapper

        if (isFullscreen) {
          wrapper.classList.add('is-fullscreen')
        } else {
          wrapper.classList.remove('is-fullscreen')
        }
      }

      // Initial state
      video.controls = false
      wrapper.addEventListener('click', handleClick)

      video.addEventListener('play', onPlay)
      video.addEventListener('pause', onPause)
      video.addEventListener('ended', onPause)
      document.addEventListener('fullscreenchange', onFullscreenChange)

      cleanups.push(() => {
        video.removeEventListener('play', onPlay)
        video.removeEventListener('pause', onPause)
        video.removeEventListener('ended', onPause)
        document.removeEventListener('fullscreenchange', onFullscreenChange)
        wrapper.removeEventListener('click', handleClick)
      })
    })

    return () => cleanups.forEach((fn) => fn())
  }, [html])

  return (
    <section className='xsm:px-[0.83333rem]'>
      <Summary tocs={tocs} />

      <article
        id='training_content'
        className='training_content'
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <ShareSection />
    </section>
  )
}
