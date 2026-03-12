'use client'

import Image from 'next/image'

import { ITimelineItem } from '@/interfaces/history.interface'
import { cn } from '@/lib/utils'

const START_MARKER_ICON = '/history/marker.svg'

export default function TimelineMobile({ timeline }: { timeline: ITimelineItem[] }) {
  const hasVisibleToBeContinuedAtEnd = timeline[timeline.length - 1]?.isToBeContinued === true
  const endPointIndex = timeline.length > 1 && hasVisibleToBeContinuedAtEnd ? timeline.length - 2 : timeline.length - 1

  return (
    <section className='relative p-[3.33rem_0_4.84rem_0]'>
      <Image
        src='/history/patternTop.webp'
        alt='Background'
        width={375}
        height={336}
        className='absolute top-0 left-0 h-auto w-full'
      />
      <Image
        src='/history/patternBottom.webp'
        alt='Background'
        width={375}
        height={336}
        className='absolute bottom-[1.98rem] left-0 h-auto w-full'
      />

      <div className='relative w-full px-[0.83333rem]'>
        {/* Center line */}
        <div className='absolute top-[2.604165rem] left-1/2 h-[calc(100%-3rem)] w-[0.10417rem] -translate-x-1/2 bg-[rgba(9,9,9,0.15)]' />

        {timeline.map((item: ITimelineItem, index: number) => {
          const isLeftContent = index % 2 === 0
          const isToBeContinued = item.isToBeContinued === true
          const hasUl = item.description?.includes('<ul')
          const shouldHavePx = !isLeftContent || hasUl
          const isFirstItem = index === 0
          const isEndPoint = index === endPointIndex && !isToBeContinued
          const shouldUseIconMarker = (isFirstItem || isEndPoint) && !isToBeContinued
          const markerWrapperClass = isToBeContinued
            ? 'absolute top-1/2 left-1/2 h-auto w-full -translate-x-1/2 -translate-y-1/2'
            : 'absolute top-0 left-0 h-[5.20833rem] w-full'

          return (
            <div
              key={`${item.year}-${index}`}
              className='relative mb-[1.6rem] flex w-full last:mb-0'
            >
              {/* Marker + driver + image */}
              <div className={markerWrapperClass}>
                <div className='absolute-center w-full'>
                  {/* driver line (hide for "To be continued") */}
                  {!isToBeContinued && (
                    <div
                      className={cn(
                        'absolute-y-center h-[0.15625rem] w-[6.35417rem] bg-[#D32F2F]',
                        isLeftContent ? 'left-1/2' : 'right-1/2',
                      )}
                    ></div>
                  )}

                  {/* main marker at center line */}
                  {shouldUseIconMarker ? (
                    <div className='absolute-center'>
                      <div className='relative size-[2.67854rem]'>
                        <Image
                          src={START_MARKER_ICON}
                          alt='Timeline marker'
                          fill
                          className='object-contain'
                        />
                        <div className='ripple-marker' />
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* outer marker 2 */}
                      <div className='absolute-center size-[1.1875rem] rounded-full bg-[#D32F2F] opacity-20'></div>

                      {/* inner marker */}
                      <div className='absolute-center size-[0.75rem] rounded-full bg-[#D32F2F]'></div>
                    </>
                  )}

                  {/* item image (hide for "To be continued") */}
                  {!isToBeContinued && (
                    <div
                      className={cn(
                        'absolute-y-center flex-center size-[5.20833rem] rounded-full bg-[linear-gradient(180deg,#FFB2B2_23.97%,#D32F2F_81.78%)]',
                        !isLeftContent ? 'left-0' : 'right-0',
                      )}
                    >
                      <div className='relative size-[4.75229rem]'>
                        <Image
                          src={item?.image?.url || '/default.webp'}
                          alt={item?.image?.alt || 'Inno Global'}
                          fill
                          className='rounded-full object-cover'
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Content wrapper */}
              <div className={cn('flex w-full justify-between', !isLeftContent && 'flex-row-reverse')}>
                {/* Year and Description */}
                <div
                  className={cn(
                    'flex flex-col gap-[0.52083rem] pt-[2.1rem]',
                    isToBeContinued && 'pt-0',
                    isLeftContent ? 'w-[8.02083rem]' : 'w-[8.59375rem]',
                  )}
                >
                  {/* Year */}
                  <div
                    className={cn(
                      'font-open-sans text-[0.9375rem] leading-[120%] font-semibold tracking-[-0.01406rem] text-[#090909]',
                      isToBeContinued && 'px-0 translate-x-8 w-fit',
                      shouldHavePx && !isToBeContinued && 'pl-[0.9375rem]',
                    )}
                  >
                    {item.year}
                  </div>
                  {item.description && (
                    <div
                      className={cn(
                        'text-text-80 font-open-sans text-[0.625rem] leading-[150%] [&_p]:m-0 [&_strong]:font-semibold [&_strong]:text-[#090909] [&_ul]:m-0 [&_ul]:list-disc',
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
