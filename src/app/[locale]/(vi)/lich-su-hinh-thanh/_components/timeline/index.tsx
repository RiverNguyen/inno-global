'use client'

import useIsMobile from '@/hooks/useIsMobile'
import { ITimelineItem } from '@/interfaces/history.interface'

import Timeline from './Timeline'
import TimelineMobile from './TimelineMobile'

export default function IndexTimeline({ timeline }: { timeline: ITimelineItem[] }) {
  const { isMobile, isLoading } = useIsMobile()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <div>{isMobile ? <TimelineMobile timeline={timeline} /> : <Timeline timeline={timeline} />}</div>
}
