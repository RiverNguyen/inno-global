'use client'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'nextjs-toploader/app'

export default function BackButton() {
  const router = useRouter()
  return <ChevronLeft className='size-4 mr-[0.42rem] lg:hidden' onClick={() => router.back()} />
}
