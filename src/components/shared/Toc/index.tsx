'use client'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronUp, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { Drawer, DrawerClose, DrawerContent } from '@/components/ui/drawer'
import useIsMobile from '@/hooks/useIsMobile'
import { cn, convertRemToPx } from '@/lib/utils'
import { scrollToSection } from '@/utils/scrollToSection'

gsap.registerPlugin(ScrollTrigger)

interface TocItem {
  id: string
  text: string
  level: number // h1 -> 1, h2 -> 2...
}

export default function Toc({ tocs }: { tocs: TocItem[] }) {
  const t = useTranslations('DetailBlogPage')
  const [open, setOpen] = useState(false)
  const [expand, setExpand] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(() => (tocs && tocs.length > 0 ? tocs[0].id : null))
  const { isLoading, isMobile } = useIsMobile()

  const scrollToHeading = (id: string) => {
    const offsetRem = window.innerWidth <= 639 ? 5.25 : 5.75
    scrollToSection(id, 1, offsetRem)
  }

  useEffect(() => {
    if (!tocs || tocs.length === 0) return
    const offsetRem = window.innerWidth <= 639 ? 5.25 : 5.75

    const headings = tocs.map((toc) => document.getElementById(toc.id)).filter(Boolean) as HTMLElement[]

    if (headings.length === 0) return

    const ctx = gsap.context(() => {
      headings.forEach((heading, i) => {
        ScrollTrigger.create({
          trigger: heading,
          start: `top top+=${convertRemToPx(offsetRem)}px`,
          end: 'bottom bottom',
          onEnter: () => setActiveId(heading.id),
          onEnterBack: () => {
            const prevHeading = headings[i - 1]
            if (prevHeading) {
              setActiveId(prevHeading.id)
            }
          },
        })
      })
    })

    return () => ctx.revert()
  }, [tocs])

  if (tocs.length < 1) return null

  return (
    <>
      <aside className='xsm:p-[0.72917rem] xsm:mt-[1.04167rem] xsm:mb-[2.08333rem] my-[2.08333rem] flex flex-col rounded-[0.20833rem] bg-[#F0F0F0] p-[1.5625rem]'>
        <h4 className='font-open-sans xsm:text-[0.72917rem] xsm:mb-[0.72917rem] mb-[0.83333rem] text-[1.25rem] leading-[150%] font-semibold text-[#090909]'>
          {t('contentSummary')}
        </h4>
        <ul className='xsm:gap-[0.52083rem] flex flex-col items-start gap-[0.625rem]'>
          {tocs.slice(0, expand ? tocs.length : 4).map((toc, i) => (
            <li
              key={i}
              className={cn(
                'font-open-sans xsm:text-[0.72917rem] xsm:tracking-[-0.00729rem] text-[0.9375rem] leading-[150%] text-[rgba(9,9,9,0.80)] transition-all duration-200',
                activeId === toc.id && 'text-[rgba(9,9,9,1)]',
              )}
            >
              <button
                type='button'
                onClick={() => scrollToHeading(toc.id)}
              >
                {toc.text}
              </button>
            </li>
          ))}
          {tocs.length > 4 && (
            <button
              type='button'
              onClick={() => setExpand((prev) => !prev)}
              className='font-open-sans xsm:text-[0.72917rem] xsm:tracking-[-0.00729rem] text-[0.9375rem] leading-[150%] text-[#000DFF]'
            >
              {expand ? t('seeLess') : t('seeMore')}
            </button>
          )}
        </ul>
      </aside>

      {!isLoading && isMobile && (
        <>
          <button
            type='button'
            onClick={() => setOpen(true)}
            className={cn(
              'fixed right-0 bottom-0 left-0 z-120 flex h-[2.76042rem] w-full shrink-0 items-center justify-between bg-white p-[0.83333rem] shadow-[0_-4px_12px_0_rgba(0,0,0,0.10)]',
            )}
          >
            <span className='font-open-sans text-[0.72917rem] leading-[150%] font-semibold text-[#2E2E2E]'>
              {t('contentSummary')}
            </span>
            <ChevronUp className='size-[0.9375rem] shrink-0' />
          </button>
          <Drawer
            open={open}
            onOpenChange={setOpen}
          >
            <DrawerContent
              hiddenDrag
              className='z-120 rounded-t-[1.25rem]'
            >
              <div className='flex items-center justify-between border-b-[0.8px] border-[rgba(9,9,9,0.08)] p-[0.83333rem]'>
                <h2 className='font-open-sans text-[0.83333rem] leading-[150%] font-semibold text-[#090909] capitalize'>
                  {t('contentSummary')}
                </h2>
                <DrawerClose asChild>
                  <button
                    type='button'
                    className='flex-center size-[1.25rem] rounded-full bg-[rgba(9,9,9,0.10)] backdrop-blur-[14.117646217346191px]'
                  >
                    <X className='size-[0.72917rem]' />
                  </button>
                </DrawerClose>
              </div>
              <ul className='flex flex-col items-start gap-[0.52083rem] p-[0.83333rem_0_1.66667rem_0.83333rem]'>
                {tocs.slice(0, expand ? tocs.length : 4).map((toc, i) => (
                  <li
                    key={i}
                    className={cn(
                      'font-open-sans text-[0.72917rem] leading-[150%] tracking-[-0.00729rem] text-[rgba(9,9,9,0.80)] transition-all duration-200',
                      activeId === toc.id && 'text-[rgba(9,9,9,1)]',
                    )}
                  >
                    <button
                      type='button'
                      onClick={() => {
                        scrollToHeading(toc.id)
                        setOpen(false)
                      }}
                    >
                      {toc.text}
                    </button>
                  </li>
                ))}
                {tocs.length > 4 && (
                  <button
                    onClick={() => setExpand((prev) => !prev)}
                    type='button'
                    className='font-open-sans text-[0.72917rem] leading-[150%] tracking-[-0.00729rem] text-[#000DFF]'
                  >
                    {expand ? t('seeLess') : t('seeMore')}
                  </button>
                )}
              </ul>
            </DrawerContent>
          </Drawer>
        </>
      )}
    </>
  )
}
