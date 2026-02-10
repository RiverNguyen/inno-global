'use client'
import { useId } from 'react'

const ICNavigationArrowsHover = (props: React.SVGProps<SVGSVGElement>) => {
  const id = useId()

  const linearGradientId = `linear-gradient-${id}`

  return (
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
        fill={`url(#${linearGradientId})`}
      />
      <defs>
        <linearGradient
          id={linearGradientId}
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
}

export default ICNavigationArrowsHover
