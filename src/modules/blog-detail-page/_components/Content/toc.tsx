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

export default function Summary({ tocs }: { tocs: TocItem[] }) {
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
      <aside className='flex p-[1.5625rem] flex-col rounded-[0.20833rem] bg-[#F0F0F0] my-[2.08333rem] xsm:p-[0.72917rem] xsm:my-[2.08333rem]'>
        <h4 className='text-[#090909] font-open-sans text-[1.25rem] font-semibold leading-[150%] mb-[0.83333rem] xsm:text-[0.72917rem] xsm:mb-[0.72917rem]'>
          {t('contentSummary')}
        </h4>
        <ul className='flex flex-col gap-[0.625rem] items-start xsm:gap-[0.52083rem]'>
          {tocs.slice(0, expand ? tocs.length : 4).map((toc, i) => (
            <li key={i}>
              <button
                type='button'
                onClick={() => scrollToHeading(toc.id)}
                className={cn(
                  'text-[rgba(9,9,9,0.80)] font-open-sans text-[0.9375rem] leading-[150%] transition-all duration-200 xsm:text-[0.72917rem] xsm:tracking-[-0.00729rem]',
                  activeId === toc.id && 'text-[rgba(9,9,9,1)]',
                )}
              >
                {toc.text}
              </button>
            </li>
          ))}
          {tocs.length > 4 && (
            <button
              type='button'
              onClick={() => setExpand((prev) => !prev)}
              className='text-[#000DFF] font-open-sans text-[0.9375rem] leading-[150%] xsm:text-[0.72917rem] xsm:tracking-[-0.00729rem]'
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
              'fixed bottom-0 left-0 right-0 z-120 w-full flex h-[2.76042rem] p-[0.83333rem] justify-between items-center shrink-0 bg-white shadow-[0_-4px_12px_0_rgba(0,0,0,0.10)] ',
            )}
          >
            <span className='text-[#2E2E2E] font-open-sans text-[0.72917rem] font-semibold leading-[150%]'>
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
              <div className='flex items-center justify-between p-[0.83333rem] border-b-[0.8px] border-[rgba(9,9,9,0.08)]'>
                <h2 className='text-[#090909] font-open-sans text-[0.83333rem] font-semibold leading-[150%] capitalize'>
                  {t('contentSummary')}
                </h2>
                <DrawerClose asChild>
                  <button
                    type='button'
                    className='size-[1.25rem] flex-center rounded-full bg-[rgba(9,9,9,0.10)] backdrop-blur-[14.117646217346191px]'
                  >
                    <X className='size-[0.72917rem]' />
                  </button>
                </DrawerClose>
              </div>
              <ul className='flex flex-col gap-[0.52083rem] items-start p-[0.83333rem_0_1.66667rem_0.83333rem]'>
                {tocs.slice(0, expand ? tocs.length : 4).map((toc, i) => (
                  <li key={i}>
                    <button
                      type='button'
                      onClick={() => scrollToHeading(toc.id)}
                      className={cn(
                        'text-[rgba(9,9,9,0.80)] font-open-sans text-[0.72917rem] leading-[150%] tracking-[-0.00729rem] transition-all duration-200',
                        activeId === toc.id && 'text-[rgba(9,9,9,1)]',
                      )}
                    >
                      {toc.text}
                    </button>
                  </li>
                ))}
                {tocs.length > 4 && (
                  <button
                    onClick={() => setExpand((prev) => !prev)}
                    type='button'
                    className='text-[#000DFF] font-open-sans text-[0.72917rem] leading-[150%] tracking-[-0.00729rem]'
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

// 'use client'
// import ICChevronDown from '@/components/icons/ICChevronDown'
// import ICClose from '@/components/icons/ICClose'
// import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
// import useIsMobile from '@/hooks/useIsMobile'

// export default function Toc() {
//   const { isLoading, isMobile } = useIsMobile()

//   return (
//     <>
//       <div className='flex p-[1.5625rem] flex-col rounded-[0.20833rem] bg-[#F0F0F0] my-[2.08333rem] xsm:hidden'>
//         <h3 className='text-[#090909] font-open-sans text-[1.25rem] font-semibold leading-[150%] mb-[0.83333rem]'>
//           Tóm tắt nội dung
//         </h3>
//         <ul className='flex flex-col gap-[0.625rem] items-start'>
//           <li className='text-[rgba(9,9,9,0.80)] font-open-sans text-[0.9375rem] leading-[150%]'>
//             1. Tổng quan
//           </li>
//           <li className='text-[rgba(9,9,9,0.80)] font-open-sans text-[0.9375rem] leading-[150%]'>
//             2. Giá trị cốt lõi của công ty
//           </li>
//           <li className='text-[rgba(9,9,9,0.80)] font-open-sans text-[0.9375rem] leading-[150%]'>
//             3. Về 8 giá trị văn hóa cốt lõi của INNO
//           </li>
//           <li className='text-[rgba(9,9,9,0.80)] font-open-sans text-[0.9375rem] leading-[150%]'>
//             4. Lời kết
//           </li>
//           <button className='text-[#000DFF] font-open-sans text-[0.9375rem] leading-[150%]'>
//             Xem thêm
//           </button>
//         </ul>
//       </div>

//       {!isLoading && isMobile && (
//         <Drawer
//         >
//           <DrawerTrigger asChild>
//             <button className="fixed bottom-0 left-0 right-0 z-12 w-full flex h-[2.76042rem] p-[0.83333rem] justify-between items-center shrink-0 bg-white shadow-[0_-4px_12px_0_rgba(0,0,0,0.10)]">
//               <span className='text-[#2E2E2E] font-open-sans text-[0.72917rem] font-semibold leading-[150%]'>
//                 Tóm tắt nội dung
//               </span>
//               <ICChevronDown className='size-[0.9375rem] shrink-0' />
//             </button>
//           </DrawerTrigger>
//           <DrawerContent>
//             <DrawerHeader>
//               <DrawerTitle>Tóm tắt nội dung</DrawerTitle>
//               <DrawerClose asChild>
//                 <button
//                   type='button'
//                   className='flex-center size-[1.25rem] cursor-pointer rounded-full bg-[rgba(9,9,9,0.10)] backdrop-blur-[14.117646217346191px]'
//                 >
//                   <ICClose className='size-[0.72917rem]' />
//                 </button>
//               </DrawerClose>
//             </DrawerHeader>
//             <ul className='flex flex-col gap-[0.52083rem] items-start'>
//               <li className='text-[rgba(9,9,9,0.80)] font-open-sans text-[0.72917rem] leading-[150%] tracking-[-0.00729rem]'>
//                 1. Tổng quan
//               </li>
//               <li className='text-[rgba(9,9,9,0.80)] font-open-sans text-[0.72917rem] leading-[150%] tracking-[-0.00729rem]'>
//                 2. Giá trị cốt lõi của công ty
//               </li>
//               <li className='text-[rgba(9,9,9,0.80)] font-open-sans text-[0.72917rem] leading-[150%] tracking-[-0.00729rem]'>
//                 3. Về 8 giá trị văn hóa cốt lõi của INNO
//               </li>
//               <li className='text-[rgba(9,9,9,0.80)] font-open-sans text-[0.72917rem] leading-[150%] tracking-[-0.00729rem]'>
//                 4. Lời kết
//               </li>
//               <button className='text-[#000DFF] font-open-sans text-[0.72917rem] leading-[150%] tracking-[-0.00729rem]'>
//                 Xem thêm
//               </button>
//             </ul>
//           </DrawerContent>
//         </Drawer>
//       )}
//     </>
//   )
// }
