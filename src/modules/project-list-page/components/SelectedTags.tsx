'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Fragment, useRef } from 'react'

import ICClose from '@/components/icons/ICClose'

type FilterItem = { label: string; value: string }

interface SelectedTagItemProps {
  value: string
  label: string
  onRemove: (value: string) => void
}

function SelectedTagItem({ value, label, onRemove }: SelectedTagItemProps) {
  const itemRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (itemRef.current) {
        gsap.fromTo(
          itemRef.current,
          { opacity: 0, scale: 0.85, y: 6 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: 'back.out(1.4)',
          },
        )
      }
    },
    { scope: itemRef },
  )

  const handleRemove = () => {
    if (!itemRef.current) return
    gsap.to(itemRef.current, {
      opacity: 0,
      scale: 0.8,
      x: -8,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => onRemove(value),
    })
  }

  return (
    <div
      ref={itemRef}
      className='font-open-sans flex items-center space-x-[0.36458rem] text-[0.72917rem] leading-[150%] font-normal text-[#090909]'
    >
      <span className='inline-block whitespace-nowrap [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>
        {label}
      </span>
      <button
        type='button'
        className='shrink-0 cursor-pointer transition-opacity hover:opacity-70'
        onClick={handleRemove}
        aria-label={`Remove ${label}`}
      >
        <ICClose className='size-[0.83333rem]' />
      </button>
    </div>
  )
}

interface SelectedTagsProps {
  label: string
  items: FilterItem[]
  selectedValues: string[]
  onRemove: (value: string) => void
}

export default function SelectedTags({ label, items, selectedValues, onRemove }: SelectedTagsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const prevLengthRef = useRef(0)

  useGSAP(
    () => {
      const currLen = selectedValues.length
      const prevLen = prevLengthRef.current
      // Chỉ animate khi chuyển từ 0 -> có tag (lần đầu xuất hiện)
      if (currLen > 0 && prevLen === 0 && containerRef.current) {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0, y: -6 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
        )
      }
      prevLengthRef.current = currLen
    },
    { dependencies: [selectedValues], scope: containerRef },
  )

  if (selectedValues.length === 0) return null

  const getLabel = (value: string) => items.find((i) => i.value === value)?.label ?? value

  return (
    <div
      ref={containerRef}
      className='flex items-center space-x-[0.41667rem]'
    >
      <span className='font-open-sans xsm:text-[0.72917rem] xsm:leading-[150%] text-[0.83333rem] leading-normal font-semibold whitespace-nowrap text-[#090909] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>
        {label}:
      </span>
      <div className='flex sm:flex-wrap items-center gap-x-[1.04167rem] gap-y-[0.36458rem] bg-[#F0F0F0] p-[0.46875rem_0.52083rem]'>
        {selectedValues.map((value, i) => (
          <Fragment key={value}>
            {i > 0 ? <div className='w-[0.0625rem] h-[1rem] bg-[rgba(9,9,9,0.08)] shrink-0' /> : null}
            <SelectedTagItem value={value} label={getLabel(value)} onRemove={onRemove} />
          </Fragment>
        ))}
      </div>
    </div>
  )
}
