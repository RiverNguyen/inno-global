'use client'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'nextjs-toploader/app'

import { cn } from '@/lib/utils'

export default function BackButton({ className }: { className?: string }) {
  const router = useRouter()
  return (
    <ChevronLeft
      className={cn('mr-[0.42rem] size-4 lg:hidden', className)}
      onClick={() => router.back()}
    />
  )
}
