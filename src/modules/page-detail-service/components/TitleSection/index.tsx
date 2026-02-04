import React from 'react'

import { cn } from '@/lib/utils'

interface TitleSectionProps {
  className?: string
  children: React.ReactNode
}

export default function TitleSection({ className, children }: TitleSectionProps) {
  return (
    <h2
      className={cn(
        'text-primary xsm:text-[1.25rem] xsm:tracking-normal text-[2.8125rem] leading-[1.2] font-semibold tracking-[-0.02813rem]',
        className,
      )}
    >
      {children}
    </h2>
  )
}
