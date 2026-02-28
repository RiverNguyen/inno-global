'use client'

import Image from 'next/image'

import { ITimelineItem } from '@/interfaces/history.interface'
import { cn } from '@/lib/utils'

const START_MARKER_ICON = '/history/marker.svg'

export default function TimelineMobile({ timeline }: { timeline: ITimelineItem[] }) {
  return (
    <section className="relative p-[3.33rem_0_4.84rem_0]">
      <Image
        src="/history/patternTop.webp"
        alt="Background"
        width={375}
        height={336}
        className="absolute top-0 left-0 w-full h-auto"
      />
      <Image
        src="/history/patternBottom.webp"
        alt="Background"
        width={375}
        height={336}
        className="absolute bottom-[1.98rem] left-0 w-full h-auto"
      />

      <div className="relative w-full px-[0.83333rem]">

        {/* Center line */}
        <div className="absolute left-1/2 top-[2.604165rem] h-[calc(100%-3rem)] w-[0.10417rem] -translate-x-1/2 bg-[rgba(9,9,9,0.15)]" />

        {timeline.map((item: ITimelineItem, index: number) => {
          const isLeftContent = index % 2 === 0
          const isToBeContinued = item.year === 'To be continued...'
          const hasUl = item.description?.includes('<ul')
          const shouldHavePx = !isLeftContent || hasUl
          const isFirstItem = index === 0

          return (
            <div
              key={`${item.year}-${index}`}
              className="relative mb-[1.6rem] last:mb-0 flex w-full"
            >
              {/* Marker + driver + image */}
              <div className={cn('absolute top-0 left-0 w-full h-[5.20833rem]',
                isToBeContinued && 'top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-auto',
              )}>
                <div className='absolute-center w-full'>
                  {/* driver line (hide for "To be continued") */}
                  {!isToBeContinued && (
                    <div className={cn('absolute-y-center w-[6.35417rem] h-[0.15625rem] bg-[#D32F2F]', isLeftContent ? 'left-1/2' : 'right-1/2')}></div>
                  )}

                  {/* main marker at center line */}
                  {isFirstItem ? (
                    <div className='absolute-center'>
                      <div className='relative size-[2.67854rem]'>
                        <Image
                          src={START_MARKER_ICON}
                          alt='Start marker'
                          fill
                          className='object-contain'
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* outer marker */}
                      <div className='absolute-center size-[1.5rem] rounded-full bg-[#D32F2F] opacity-20'></div>
                      {/* inner marker */}
                      <div className='absolute-center size-[1rem] rounded-full bg-[#ef3b3b]'></div>
                    </>
                  )}

                  {/* item image (hide for "To be continued") */}
                  {!isToBeContinued && (
                    <div className={cn('absolute-y-center flex-center size-[5.20833rem] rounded-full bg-[linear-gradient(180deg,#FFB2B2_23.97%,#D32F2F_81.78%)]', !isLeftContent ? 'left-0' : 'right-0')}>
                      <div className="relative size-[4.75229rem]">
                        <Image
                          src={item?.image?.url || '/default.webp'}
                          alt={item?.image?.alt || 'Inno Global'}
                          fill
                          className="object-cover rounded-full"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>


              {/* Content wrapper */}
              <div className={cn('w-full flex justify-between', !isLeftContent && 'flex-row-reverse')}>


                {/* Year and Description */}
                <div className={cn('pt-[2.1rem] flex flex-col gap-[0.52083rem]',
                  isToBeContinued && 'pt-0',
                  isLeftContent ? 'w-[8.02083rem]' : 'w-[8.59375rem]',
                )}>
                  {/* Year */}
                  <div
                    className={cn(
                      'text-[#090909] font-open-sans text-[0.9375rem] font-semibold leading-[120%] tracking-[-0.01406rem]',
                      isToBeContinued && 'w-full px-0 text-right',
                      shouldHavePx && !isToBeContinued && 'pl-[0.9375rem]',
                    )}
                  >
                    {item.year}
                  </div>
                  {item.description && (
                    <div
                      className={cn('text-text-80 font-open-sans text-[0.625rem] leading-[150%] [&_p]:m-0 [&_ul]:m-0 [&_ul]:list-disc',
                        shouldHavePx && 'pl-[0.9375rem]',
                      )}
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  )}
                </div>
              </div>
            </div>
          )
        })}

      </div>
    </section>
  )
}