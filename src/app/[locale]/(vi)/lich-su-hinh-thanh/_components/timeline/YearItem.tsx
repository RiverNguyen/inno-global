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

const positionRow1 = [
  [7.08, 9.95],
  [24.84, 12.4],
  [43.59, 8.8],
  [62.86, 8.7],
]
const positionRow2 = [
  [13.28, 9.95],
  [31.15, 10.6],
  [48.54, 8.8],
  [68.49, 8.7],
]

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
