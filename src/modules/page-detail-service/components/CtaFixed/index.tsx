'use client'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'
import { lockInfiniteScroll, shouldUnlockInfiniteScroll, unlockInfiniteScroll } from '@/utils/infiniteScrollLock'
import { scrollToSection } from '@/utils/scrollToSection'

export default function CtaFixed() {
  const t = useTranslations('DetailServicePage')
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null)

  const ctaItems = [
    { label: t('sectionRelatedProjects.title'), targetId: 'related-projects' },
    { label: t('sectionRelatedBlogs.title'), targetId: 'related-blogs' },
  ]

  useEffect(() => {
    if (activeSectionId) return
    const firstSectionId = ctaItems[0]?.targetId
    if (!firstSectionId) return
    setActiveSectionId(firstSectionId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSectionId])

  /**
   * Flag để phân biệt:
   * - scroll do user kéo tay
   * - scroll do click CTA (programmatic scroll)
   * Khi đang scroll bằng CTA → tạm khóa scroll-spy
   */
  const isProgrammaticScrollRef = useRef<boolean>(false)

  /**
   * Handle click CTA:
   * - Set active ngay để UX phản hồi tức thì
   * - Scroll mượt tới section
   * - Sau khi scroll xong thì mở lại scroll-spy
   */
  const getScrollOffsetRem = () => {
    // Trừ chiều cao header fixed để section không bị che
    const headerEl = document.querySelector('header')
    const headerOffsetPx = headerEl instanceof HTMLElement ? headerEl.offsetHeight : 0

    // Buffer nhỏ để section "thoáng" hơn sau khi scroll
    const extraBufferPx = 12

    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
    return (headerOffsetPx + extraBufferPx) / rootFontSize
  }

  const handleCtaClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const targetSectionId = e.currentTarget.dataset.sectionTrigger
    if (!targetSectionId) return

    // Khóa observer trong lúc scroll bằng code
    isProgrammaticScrollRef.current = true

    // Khóa infinite scroll của section đang active (nếu có) khi chuyển sang section khác
    if (activeSectionId && activeSectionId !== targetSectionId) {
      lockInfiniteScroll(activeSectionId)
    }

    // Active CTA ngay khi click
    setActiveSectionId(targetSectionId)

    // Scroll mượt tới section
    scrollToSection(targetSectionId, 1, getScrollOffsetRem())

    // Mở lại observer sau khi animation scroll kết thúc
    window.setTimeout(() => {
      isProgrammaticScrollRef.current = false
    }, 1100) // duration (1s) + buffer nhỏ
  }

  useEffect(() => {
    /**
     * Lấy toàn bộ DOM section cần theo dõi
     */
    const sectionElements = ctaItems
      .map((item) => document.getElementById(item.targetId))
      .filter(Boolean) as HTMLElement[]

    if (!sectionElements.length) return

    let rafId = 0

    /**
     * Xác định section active dựa trên vị trí scroll hiện tại
     *
     * Quy tắc:
     * - Lấy 1 "focus line" trong viewport (≈ 35% từ trên xuống)
     * - Section nào có top <= focus line và gần nhất → active
     * - Hoạt động ổn định với section rất dài
     */
    const updateActiveSectionByScroll = () => {
      // Nếu đang scroll bằng CTA thì bỏ qua
      if (isProgrammaticScrollRef.current) return

      const viewportFocusY = window.scrollY + window.innerHeight * 0.35

      let currentActiveSection: HTMLElement | null = null

      for (const section of sectionElements) {
        const sectionTop = section.offsetTop
        if (sectionTop <= viewportFocusY) {
          currentActiveSection = section
        }
      }

      if (currentActiveSection && currentActiveSection.id !== activeSectionId) {
        setActiveSectionId(currentActiveSection.id)

        if (shouldUnlockInfiniteScroll(currentActiveSection.id)) {
          unlockInfiniteScroll()
        }
      }
    }

    /**
     * Throttle scroll bằng requestAnimationFrame
     * để tránh setState quá nhiều
     */
    const handleScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(updateActiveSectionByScroll)
    }

    const handleResize = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(updateActiveSectionByScroll)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    // Set active lần đầu khi mount
    updateActiveSectionByScroll()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSectionId])

  return (
    <div className='xsm:block sticky top-0 z-[100] hidden bg-white px-[0.83333rem] pt-[1.875rem] shadow-[0_4px_30px_0_rgba(0,0,0,0.08)]'>
      <ul className='flex items-center space-x-[0.20833rem]'>
        {ctaItems.map((item, index) => (
          <li
            key={index}
            onClick={handleCtaClick}
            data-section-trigger={item.targetId}
            className={cn(
              'after:border-primary-red relative px-[0.52083rem] pt-[0.72917rem] pb-[0.625rem] after:absolute after:right-full after:bottom-0 after:left-0 after:border-b-[2px] after:border-solid after:transition-all after:duration-300 after:ease-out',
              item.targetId === activeSectionId && 'after:right-0',
            )}
          >
            <p className='text-edge-[cap_alphabetic] text-trim-both text-primary text-[0.72917rem] leading-[1.5]'>
              {item.label}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
