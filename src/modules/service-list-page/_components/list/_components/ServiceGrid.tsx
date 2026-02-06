'use client'

import { forwardRef } from 'react'

interface ServiceGridProps {
  children: React.ReactNode
}

const ServiceGrid = forwardRef<HTMLDivElement, ServiceGridProps>(function ServiceGrid({ children }, ref) {
  return (
    <div
      ref={ref}
      className='xsm:gap-[0.3125rem] grid grid-cols-2 gap-[1.66667rem]'
    >
      {children}
    </div>
  )
})

export default ServiceGrid
