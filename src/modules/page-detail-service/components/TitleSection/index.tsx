import React from 'react'

import { cn } from '@/lib/utils'

interface TitleSectionProps {
  className?: string
  children: React.ReactNode
}

export default function TitleSection({ className, children }: TitleSectionProps) {
  return <h2 className={cn('text-primary xsm:text-[1.25rem] xsm:tracking-normal pc-h2-54-s', className)}>{children}</h2>
}
