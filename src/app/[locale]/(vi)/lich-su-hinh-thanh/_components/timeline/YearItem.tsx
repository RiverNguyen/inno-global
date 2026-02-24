'use client'

import { IAcfImage } from '@/interfaces/acf-wp.interface'
import { cn } from '@/lib/utils'

interface YearItemProps {
  year: string
  description: string
  isFirst: boolean
  image: IAcfImage
  isOdd: boolean
  className?: string
}

export default function YearItem({ year, description, isFirst, image, isOdd, className }: YearItemProps) {
  return (
    <div className={cn('absolute-center', isFirst && '', className)}>
      <div className='flex items-center justify-between'>
        <div className='flex items-center justify-center'>
          <div className='w-10 h-10 rounded-full bg-primary-red-100'></div>
        </div>
      </div>
    </div>
  )
}
