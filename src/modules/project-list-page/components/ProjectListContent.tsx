'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

import ProjectCard from '@/components/shared/ProjectCard'
import { IProject } from '@/interfaces/project.interface'

import ProjectListSkeleton from './ProjectListSkeleton'

const FADE_Y = 24
const FADE_DURATION = 0.45
const FADE_DELAY = 0.08
const FADE_STAGGER = 0.09
const FADE_SCALE_FROM = 0.98

interface ProjectListContentProps {
  projects: IProject[]
  isInitialLoading: boolean
  t: (key: string) => string
}

export default function ProjectListContent({
  projects,
  isInitialLoading,
  t,
}: ProjectListContentProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useGSAP(
    () => {
      const container = containerRef.current
      if (!container) return

      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches

      const items = Array.from(container.querySelectorAll<HTMLElement>('[data-project-item]'))

      // Ensure stable order info for staggering
      for (let i = 0; i < items.length; i++) {
        items[i].dataset.fadeOrder = String(i)
      }

      // Cleanup previous observer (re-create when list changes)
      observerRef.current?.disconnect()

      // Initialize hidden state for items that haven't animated yet
      for (const el of items) {
        if (el.dataset.gsapAnimated === '1') continue
        if (prefersReducedMotion) {
          el.dataset.gsapAnimated = '1'
          gsap.set(el, { autoAlpha: 1, y: 0, clearProps: 'opacity,transform' })
          continue
        }
        gsap.set(el, { autoAlpha: 0, y: FADE_Y, scale: FADE_SCALE_FROM })
      }

      if (prefersReducedMotion) return

      observerRef.current = new IntersectionObserver(
        (entries) => {
          const newlyVisible = entries
            .filter((e) => e.isIntersecting)
            .map((e) => e.target as HTMLElement)
            .filter((el) => el.dataset.gsapAnimated !== '1')

          if (newlyVisible.length === 0) return

          newlyVisible.sort((a, b) => {
            const ai = Number(a.dataset.fadeOrder ?? 0)
            const bi = Number(b.dataset.fadeOrder ?? 0)
            return ai - bi
          })

          newlyVisible.forEach((el) => {
            el.dataset.gsapAnimated = '1'
            observerRef.current?.unobserve(el)
          })

          gsap.to(newlyVisible, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: FADE_DURATION,
            delay: FADE_DELAY,
            ease: 'power2.out',
            stagger: FADE_STAGGER,
            clearProps: 'opacity,transform',
            overwrite: 'auto',
          })
        },
        {
          root: null,
          rootMargin: '0px 0px -10% 0px',
          threshold: 0.1,
        },
      )

      for (const el of items) {
        if (el.dataset.gsapAnimated === '1') continue
        observerRef.current.observe(el)
      }
    },
    { dependencies: [projects.length], scope: containerRef },
  )

  if (isInitialLoading) {
    return <ProjectListSkeleton />
  }

  if (Array.isArray(projects) && projects.length > 0) {
    return (
      <div ref={containerRef} className='contents'>
        {projects.map((project: IProject, i: number) => (
          <div key={project.id || i} data-project-item>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className='col-span-3 flex items-center justify-center py-12'>
      <span className='text-[#090909]'>{t('noProjects') || 'No projects found'}</span>
    </div>
  )
}
