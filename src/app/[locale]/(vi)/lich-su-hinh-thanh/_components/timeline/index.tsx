'use client'

import useIsMobile from '@/hooks/useIsMobile'

import Timeline from './Timeline'
import TimelineMobile from './TimelineMobile'

export default function IndexTimeline() {
  const { isMobile, isLoading } = useIsMobile()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {isMobile ? <TimelineMobile /> : <Timeline />}
    </div>
  )
}