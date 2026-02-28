'use client'

import useIsMobile from '@/hooks/useIsMobile'
import { ITimelineItem } from '@/interfaces/history.interface'

import Timeline from './Timeline'
import TimelineMobile from './TimelineMobile'

export default function IndexTimeline({ timeline }: { timeline: ITimelineItem[] }) {
  const { isMobile, isLoading } = useIsMobile()

  return <div>{isMobile && !isLoading ? <TimelineMobile timeline={timeline} /> : <Timeline timeline={timeline} />}</div>
}
