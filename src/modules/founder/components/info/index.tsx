'use client'

import Image from 'next/image'

import { ILeadership } from '@/interface/leadership.interface'

const FounderImage = ({
  wrapperClassName,
  imageUrl,
}: {
  wrapperClassName?: string
  imageUrl?: string
}) => (
  <div className={wrapperClassName ?? ''}>
    <div className='relative w-[24.79167rem] h-[29.53125rem] shrink-0 xsm:w-full xsm:h-[21.2799rem]'>
      <Image
        src='/leadership/overlay.webp'
        alt="overlay"
        width={476}
        height={567}
        className="object-cover absolute inset-0 w-full h-full"
      />
      <Image
        src={imageUrl || '/leadership/d-leadership-1.webp'}
        alt="Founder"
        width={397}
        height={567}
        className="h-full w-auto object-cover relative mx-auto"
      />
    </div>
  </div>
)

export default function Info({ leader }: { leader: ILeadership }) {
  const leaderShow = leader?.acf?.show ?? 'false'
  const leaderImage = leader?.featured_image?.url ?? ''

  return (
    <div className="relative py-[4.16667rem] min-h-[44.47917rem] xsm:min-h-auto xsm:px-[0.83333rem] xsm:py-[2.29167rem]">
      <Image
        src='/leadership/bg-founder-mb.webp'
        alt="bg-founder"
        width={375}
        height={1220}
        className="hidden xsm:block absolute bottom-0 left-0 w-full h-full object-cover pointer-events-none"
      />

      <div className='max-w-[75rem] mx-auto relative flex gap-[3.75rem] xsm:flex-col'>
        <FounderImage wrapperClassName="xsm:hidden" imageUrl={leaderImage} />

        <div className="w-full flex flex-col">
          {leaderShow && (
            <>
              <h2 className='text-[#090909] font-open-sans text-[1.875rem] font-semibold leading-[1.35417rem] mb-[0.72917rem] xsm:text-[1.04167rem] xsm:leading-[150%] xsm:mb-[0.3125rem]'>
                {leader?.title ?? ''}
              </h2>
              <p className='text-[rgba(9,9,9,0.80)] font-open-sans text-[0.9375rem] leading-[150%] xsm:text-[0.83333rem]'>
                {leader?.acf?.position ?? ''}
              </p>
            </>
          )}

          <FounderImage wrapperClassName="hidden xsm:block xsm:my-[1.45833rem]" imageUrl={leaderImage} />

          <div className='text-[rgba(9,9,9,0.80)] text-justify font-open-sans text-[0.9375rem] leading-[150%] mt-[1.66667rem] mb-[2.60417rem] whitespace-pre-line xsm:mt-0 xsm:mb-[1.19792rem] xsm:text-[0.72917rem] xsm:[text-trim:trim-both] xsm:[text-box-edge:cap_alphabetic]'>
            <div dangerouslySetInnerHTML={{ __html: leader?.content ?? '' }} />
          </div>

          {leaderShow && (
            <div className='flex flex-col gap-[0.72917rem] items-end'>
              <p className='text-[#000] font-open-sans text-[1.04167rem] font-semibold [text-box-trim:trim-both] [text-box-edge:cap_alphabetic] xsm:text-[0.83333rem]'>
                {leader?.title ?? ''}
              </p>
              <p className='text-[rgba(9,9,9,0.80)] font-open-sans text-[0.9375rem] leading-[150%] xsm:text-[0.83333rem]'>
                {leader?.acf?.position ?? ''}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
