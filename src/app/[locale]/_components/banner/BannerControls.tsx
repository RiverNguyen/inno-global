'use client'

import type { SVGProps } from 'react'

type BannerControlsProps = {
  activeIndex: number
  total: number
  isPlaying?: boolean
  onTogglePlay?: () => void
  onPrev: () => void
  onNext: () => void
  onSelect: (index: number) => void
}

export default function BannerControls({ activeIndex, total, onPrev, onNext, onSelect }: BannerControlsProps) {
  return (
    <div className='xsm:w-full xsm:mx-auto xsm:py-[0.6875rem] xsm:px-[1.02rem] xsm:right-0 xsm:left-0 xsm:bottom-0 xsm:bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_0%,rgba(0,0,0,0.70)_100%)] absolute right-[12.5rem] bottom-[8.07rem] left-[12.5rem] z-10 flex items-end justify-between'>
      <div></div>
      {/* Slide counter */}
      {total > 1 && (
        <div className='xsm:justify-between xsm:w-full flex items-center space-x-[0.4375rem] text-white'>
          <div className='flex-y-center xsm:hidden space-x-[0.4275rem]'>
            {/* <button
            type='button'
            aria-label={isPlaying ? 'Pause autoplay' : 'Play autoplay'}
            aria-pressed={!isPlaying}
            className='flex-center relative w-[1.04rem] shrink-0'
            onClick={onTogglePlay}
          >
            <Image
              src='/home/ic_pause.svg'
              alt=''
              width={40}
              height={40}
              unoptimized
              className={`h-auto w-full object-contain ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
            />
            <Image
              src='/home/ic_play.svg'
              alt=''
              width={40}
              height={40}
              unoptimized
              className={`absolute-center size-[1rem] scale-150 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
            />
          </button> */}

            {/* Progress bar segments */}
            <div className='flex items-center space-x-[0.1875rem]'>
              {Array.from({ length: total }).map((_, index) => (
                <button
                  key={index}
                  type='button'
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-[0.15625rem] min-w-0 shrink-0 cursor-pointer transition-[width,background-color] duration-300 ease-out ${index === activeIndex ? 'xsm:w-[2.1875rem] w-[3.2rem] bg-white' : 'xsm:w-[0.67rem] w-[1.19792rem] bg-white/30'}`}
                  onClick={() => onSelect(index)}
                />
              ))}
            </div>
          </div>

          {/* Navigation arrows - icons absolute để tránh layout shift khi hover (hover vùng không bị thu nhỏ) */}
          <div className='xsm:hidden flex items-center space-x-[0.2rem]'>
            <button
              type='button'
              aria-label='Previous slide'
              className='group xsm:hidden relative size-[1.25rem] -scale-x-100 transition-opacity'
              onClick={onPrev}
            >
              <NavigationArrows className='absolute inset-0 size-full transition-opacity group-hover:opacity-0' />
              <NavigationArrowsHover className='absolute inset-0 size-full opacity-0 transition-opacity group-hover:opacity-100' />
            </button>
            <button
              type='button'
              aria-label='Next slide'
              className='group relative size-[1.25rem] transition-opacity'
              onClick={onNext}
            >
              <NavigationArrows className='absolute inset-0 size-full transition-opacity group-hover:opacity-0' />
              <NavigationArrowsHover className='absolute inset-0 size-full opacity-0 transition-opacity group-hover:opacity-100' />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const NavigationArrows = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    {...props}
  >
    <path
      d='M8.37302 20.1653C8.14132 20.1666 7.91447 20.099 7.72138 19.9709C7.5283 19.8428 7.37773 19.6601 7.28888 19.4461C7.20003 19.2321 7.17692 18.9965 7.2225 18.7693C7.26807 18.5422 7.38027 18.3337 7.54479 18.1705L13.7274 11.9996L7.54479 5.82863C7.35368 5.60547 7.25382 5.31842 7.26516 5.02483C7.2765 4.73124 7.3982 4.45274 7.60595 4.24499C7.81371 4.03724 8.0922 3.91553 8.38579 3.90419C8.67938 3.89285 8.96644 3.99271 9.18959 4.18382L16.1888 11.183C16.4061 11.4016 16.528 11.6972 16.528 12.0054C16.528 12.3136 16.4061 12.6093 16.1888 12.8278L9.18959 19.827C8.97232 20.0425 8.67905 20.164 8.37302 20.1653Z'
      fill='white'
    />
  </svg>
)

const NavigationArrowsHover = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    {...props}
  >
    <path
      d='M8.37302 20.1653C8.14132 20.1666 7.91447 20.099 7.72138 19.9709C7.5283 19.8428 7.37773 19.6601 7.28888 19.4461C7.20003 19.2321 7.17692 18.9965 7.2225 18.7693C7.26807 18.5422 7.38027 18.3337 7.54479 18.1705L13.7274 11.9996L7.54479 5.82863C7.35368 5.60547 7.25382 5.31842 7.26516 5.02483C7.2765 4.73124 7.3982 4.45274 7.60595 4.24499C7.81371 4.03724 8.0922 3.91553 8.38579 3.90419C8.67938 3.89285 8.96644 3.99271 9.18959 4.18382L16.1888 11.183C16.4061 11.4016 16.528 11.6972 16.528 12.0054C16.528 12.3136 16.4061 12.6093 16.1888 12.8278L9.18959 19.827C8.97232 20.0425 8.67905 20.164 8.37302 20.1653Z'
      fill='url(#paint0_linear_448_10154)'
    />
    <defs>
      <linearGradient
        id='paint0_linear_448_10154'
        x1='11.8639'
        y1='3.90332'
        x2='11.8639'
        y2='20.1653'
        gradientUnits='userSpaceOnUse'
      >
        <stop
          offset='0.239749'
          stopColor='#FFB2B2'
        />
        <stop
          offset='0.817788'
          stopColor='#D32F2F'
        />
      </linearGradient>
    </defs>
  </svg>
)
