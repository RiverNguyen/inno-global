'use client'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'nextjs-toploader/app'

export default function BackButton() {
  const router = useRouter()
  return (
    <ChevronLeft
      className='mr-[0.42rem] size-4 lg:hidden'
      onClick={() => router.back()}
    />
  )
}
