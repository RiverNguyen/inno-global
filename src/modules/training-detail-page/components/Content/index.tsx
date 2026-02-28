'use client'

import { useMemo } from 'react'

import './styles.css'
import Toc from '@/components/shared/Toc'
import { useWpVideoPlayer } from '@/hooks/useWpVideoPlayer'
import { ITraining } from '@/interfaces/training.inteface'
import { buildTocFromHtml } from '@/utils/buildTocFromHtml'

import ShareSection from '../ShareSection'

interface ContentProps {
  training: ITraining
}

export default function Content({ training }: ContentProps) {
  const { html, tocs } = useMemo(() => {
    const initialHtml = training?.content || ''
    return buildTocFromHtml(initialHtml)
  }, [training?.content])

  useWpVideoPlayer('training_content', html)

  return (
    <section className='xsm:px-[0.83333rem]'>
      <Toc
        tocs={tocs}
        classNameContentSummary='text-[1.45833rem]'
      />

      <article
        id='training_content'
        className='training_content'
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <ShareSection />
    </section>
  )
}
