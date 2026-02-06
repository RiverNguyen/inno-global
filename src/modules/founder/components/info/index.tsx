'use client'

import Image from 'next/image'

import { ILeadership } from '@/interfaces/leadership.interface'

const FounderImage = ({ wrapperClassName, imageUrl }: { wrapperClassName?: string; imageUrl?: string }) => (
  <div className={wrapperClassName ?? ''}>
    <div className='xsm:w-full xsm:h-[21.2799rem] relative h-[29.53125rem] w-[24.79167rem] shrink-0'>
      <Image
        src='/leadership/overlay.webp'
        alt='overlay'
        width={476}
        height={567}
        className='absolute inset-0 h-full w-full object-cover'
      />
      <Image
        src={imageUrl || '/leadership/d-leadership-1.webp'}
        alt='Founder'
        width={397}
        height={567}
        className='relative mx-auto h-full w-auto object-cover'
      />
    </div>
  </div>
)

export default function Info({ leader }: { leader: ILeadership }) {
  const leaderShow = leader?.acf?.show ?? 'false'
  const leaderImage = leader?.featured_image?.url ?? ''

  return (
    <div className='xsm:min-h-auto xsm:px-[0.83333rem] xsm:py-[2.29167rem] relative min-h-[44.47917rem] py-[4.16667rem]'>
      <Image
        src='/leadership/bg-founder-mb.webp'
        alt='bg-founder'
        width={375}
        height={1220}
        className='xsm:block pointer-events-none absolute bottom-0 left-0 hidden h-full w-full object-cover'
      />

      <div className='xsm:flex-col relative mx-auto flex max-w-[75rem] gap-[3.75rem]'>
        <FounderImage
          wrapperClassName='xsm:hidden'
          imageUrl={leaderImage}
        />

        <div className='flex w-full flex-col'>
          {leaderShow && (
            <>
              <h2 className='font-open-sans xsm:text-[1.04167rem] xsm:leading-[150%] xsm:mb-[0.3125rem] mb-[0.72917rem] text-[1.875rem] leading-[1.35417rem] font-semibold text-[#090909]'>
                {leader?.title ?? ''}
              </h2>
              <p className='font-open-sans xsm:text-[0.83333rem] text-[0.9375rem] leading-[150%] text-[rgba(9,9,9,0.80)]'>
                {leader?.acf?.position ?? ''}
              </p>
            </>
          )}

          <FounderImage
            wrapperClassName='hidden xsm:block xsm:my-[1.45833rem]'
            imageUrl={leaderImage}
          />

          <div className='font-open-sans xsm:mt-0 xsm:mb-[1.19792rem] xsm:text-[0.72917rem] xsm:[text-trim:trim-both] xsm:[text-box-edge:cap_alphabetic] mt-[1.66667rem] mb-[2.60417rem] text-justify text-[0.9375rem] leading-[150%] whitespace-pre-line text-[rgba(9,9,9,0.80)]'>
            <div dangerouslySetInnerHTML={{ __html: leader?.content ?? '' }} />
          </div>

          {leaderShow && (
            <div className='flex flex-col items-end gap-[0.72917rem]'>
              <p className='font-open-sans xsm:text-[0.83333rem] text-[1.04167rem] font-semibold text-[#000] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>
                {leader?.title ?? ''}
              </p>
              <p className='font-open-sans xsm:text-[0.83333rem] text-[0.9375rem] leading-[150%] text-[rgba(9,9,9,0.80)]'>
                {leader?.acf?.position ?? ''}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
