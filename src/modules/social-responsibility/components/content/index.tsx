'use client'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import SectionPagination from '@/components/shared/SectionPagination'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import useIsMobile from '@/hooks/useIsMobile'
import { cn } from '@/lib/utils'

type ContentProps = {
  contents: Array<{
    title?: string
    description?: string
    image?: string
  }>
  locale: string
}

export default function Content({ contents, locale }: ContentProps) {
  const t = useTranslations()
  const isMobile = useIsMobile()
  const [activeIndex, setActiveIndex] = useState(0)
  const fallbackImage = '/social-responsibility/responsibility-1.webp'
  const leftImage = contents?.[activeIndex]?.image || contents?.[0]?.image || fallbackImage

  return (
    <>
      <div className="flex gap-[3.33333rem] pt-[6.25rem] pb-[5.20833rem] max-w-[75rem] mx-auto xsm:pt-0 xsm:pb-[3.33333rem] xsm:px-[0.83333rem]">
        <Image
          key={leftImage}
          src={leftImage}
          alt="Content"
          width={714}
          height={690}
          className="w-[37.1875rem] h-[35.9375rem] object-cover xsm:hidden animate-in fade-in duration-300 ease-out"
        />

        <Accordion
          type={isMobile ? 'multiple' : 'single'}
          collapsible
          onValueChange={(value: string | string[]) => {
            const last = Array.isArray(value) ? value[value.length - 1] : value
            const match = last?.match(/item-(\d+)/)
            if (match) setActiveIndex(Number(match[1]))
          }}
          className="flex flex-col flex-1"
        >
          {contents.map((responsibility, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className={cn(
                'border-b-[0.05208rem] border-[rgba(28,32,28,0.10)]',
                index === 0 && 'pt-0 pb-[1.875rem] xsm:pb-[1.25rem]',
                index > 0 && index < contents.length - 1 && 'py-[1.875rem] xsm:py-[1.25rem]',
                index === contents.length - 1 && 'pt-[1.875rem] pb-0 xsm:pt-[1.25rem]',
                index === contents.length - 1 && 'border-b-0',
              )}
            >
              <AccordionTrigger className="text-primary text-[1.25rem] leading-[140%] tracking-[-0.0125rem] font-open-sans font-semibold capitalize p-0 hover:no-underline [&>svg]:text-[#090909] [&>svg]:size-[1.45833rem] [&[data-state=open]>svg]:text-[#D32F2F] [&[data-state=open]>svg]:scale-y-[-1] [&[data-state=open]>svg]:rotate-0 [&[data-state=open]]:text-[#D32F2F] [&[data-state=open]]:text-[1.77083rem] [&[data-state=open]]:leading-[120%] [&[data-state=open]]:tracking-[-0.01771rem] transition-all duration-300 ease-out xsm:text-[0.9375rem] xsm:leading-[120%] xsm:tracking-[-0.01406rem] xsm:[&>svg]:size-[1.04167rem] xsm:hover:no-underline xsm:[&[data-state=open]]:text-[0.9375rem] xsm:[&[data-state=open]]:leading-[120%] xsm:[&[data-state=open]]:tracking-[-0.01406rem]">
                <span className='xsm:w-[14.32292rem] whitespace-pre-line'>
                  {responsibility.title}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pt-[0.83333rem] pb-0 text-[rgba(9,9,9,0.60)] font-open-sans text-[0.9375rem] leading-[150%] xsm:text-[0.72917rem] xsm:[text-box-trim:trim-both] xsm:[text-box-edge:cap_alphabetic]">
                {responsibility.description}
                <Image
                  src={responsibility.image || leftImage}
                  alt={responsibility.title || 'Content'}
                  width={343}
                  height={331}
                  className="w-full h-[17.25719rem] object-cover sm:hidden xsm:mt-[0.72917rem]"
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <SectionPagination
        className='py-[6.25rem] bg-[#F0F0F0]'
        prev={{ label: t('Breadcrumb.historyPage'), href: '/history' }}
        center={{ label: t('Breadcrumb.aboutUsPage'), href: locale === 'en' ? '/about-us' : '/ve-chung-toi' }}
      />
    </>
  )
}