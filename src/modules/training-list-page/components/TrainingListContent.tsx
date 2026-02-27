'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMemo, useRef } from 'react'

import TrainingCard from '@/components/shared/TrainingCard'
import { ITraining } from '@/interfaces/training.inteface'
import ProjectListSkeleton from '@/modules/project-list-page/components/ProjectListSkeleton'

const FADE_Y = 24
const FADE_DURATION = 0.45
const FADE_DELAY = 0.08
const FADE_STAGGER = 0.09
const FADE_SCALE_FROM = 0.98

interface TrainingListContentProps {
  trainings: ITraining[]
  isInitialLoading: boolean
  isFiltering?: boolean
  t: (key: string) => string
}

export default function TrainingListContent({
  trainings,
  isInitialLoading,
  isFiltering = false,
  t,
}: TrainingListContentProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const didHydrateRef = useRef(false)
  const prevIdsRef = useRef<string[]>([])
  const trainingsKey = useMemo(() => trainings.map((p) => String(p.id)).join('|'), [trainings])

  useGSAP(
    () => {
      const container = containerRef.current
      if (!container) return

      const prefersReducedMotion =
        typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches

      const items = Array.from(container.querySelectorAll<HTMLElement>('[data-project-item]'))
      const currIds = trainings.map((p) => String(p.id))
      const prevIds = prevIdsRef.current

      // Only animate when items are appended (infinite load).
      // For filtering (list replace/reset), keep items visible (no animation).
      const isAppend =
        prevIds.length > 0 && currIds.length > prevIds.length && prevIds.every((id, idx) => currIds[idx] === id)

      // On first client run (SSR -> hydrate), keep initial list visible (no re-animation).
      // We still want animations for items appended later (infinite scroll).
      if (!didHydrateRef.current) {
        didHydrateRef.current = true
        for (const el of items) {
          el.dataset.gsapAnimated = '1'
          gsap.set(el, { autoAlpha: 1, y: 0, scale: 1, clearProps: 'opacity,transform' })
        }
        prevIdsRef.current = currIds
        return
      }

      // If we're filtering or list is replaced (not appended), skip animations entirely.
      if (isFiltering || !isAppend) {
        observerRef.current?.disconnect()
        for (const el of items) {
          el.dataset.gsapAnimated = '1'
          gsap.set(el, { autoAlpha: 1, y: 0, scale: 1, clearProps: 'opacity,transform' })
        }
        prevIdsRef.current = currIds
        return
      }

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

      prevIdsRef.current = currIds
    },
    { dependencies: [trainingsKey], scope: containerRef },
  )

  if (isInitialLoading || isFiltering) {
    return <ProjectListSkeleton />
  }

  if (Array.isArray(trainings) && trainings.length > 0) {
    return (
      <div
        ref={containerRef}
        className='contents'
      >
        {trainings.map((training: ITraining, i: number) => (
          <div
            key={training.id || i}
            data-project-item
          >
            <TrainingCard training={training} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className='col-span-full flex items-center justify-center py-20'>
      <span className='text-[#090909]'>{t('noTrainings') || 'No projects found'}</span>
    </div>
  )
}
