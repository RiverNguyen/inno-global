'use client'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import SectionPagination from '@/components/shared/SectionPagination'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

type ContentProps = {
  contents: Array<{
    title?: string
    description?: string
    image?: string
  }>
  aboutUsHref: string
  locale: string
}

export default function Content({ contents, aboutUsHref, locale }: ContentProps) {
  const t = useTranslations()
  const [activeIndex, setActiveIndex] = useState(0)
  const fallbackImage = '/social-responsibility/responsibility-1.webp'
  const leftImage = contents?.[activeIndex]?.image || contents?.[0]?.image || fallbackImage

  const leadershipPath = locale === 'en' ? '/leadership' : '/ban-lanh-dao-cong-ty'
  const leadershipHref = `${aboutUsHref}${leadershipPath}`

  return (
    <>
      <div className='xsm:pt-0 xsm:pb-[3.33333rem] xsm:px-[0.83333rem] mx-auto flex max-w-[75rem] gap-[3.33333rem] pt-[6.25rem] pb-[5.20833rem]'>
        <Image
          key={leftImage}
          src={leftImage}
          alt='Content'
          width={714}
          height={690}
          className='xsm:hidden animate-in fade-in zoom-in-95 slide-in-from-left-2 h-[35.9375rem] w-[37.1875rem] object-cover duration-500 ease-out motion-reduce:animate-none'
        />

        <Accordion
          type='single'
          collapsible
          defaultValue='item-0'
          onValueChange={(value: string) => {
            const match = value?.match(/item-(\d+)/)
            if (match) setActiveIndex(Number(match[1]))
          }}
          className='flex flex-1 flex-col'
        >
          {contents.map((responsibility, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className={cn(
                'border-b-[0.05208rem] border-[rgba(28,32,28,0.10)]',
                index === 0 && 'xsm:pb-[1.25rem] pt-0 pb-[1.875rem]',
                index > 0 && index < contents.length - 1 && 'xsm:py-[1.25rem] py-[1.875rem]',
                index === contents.length - 1 && 'xsm:pt-[1.25rem] pt-[1.875rem] pb-0',
                index === contents.length - 1 && 'border-b-0',
              )}
            >
              <AccordionTrigger className='text-primary font-open-sans xsm:text-[0.9375rem] xsm:leading-[120%] xsm:tracking-[-0.01406rem] xsm:[&>svg]:size-[1.04167rem] xsm:hover:no-underline xsm:[&[data-state=open]]:text-[0.9375rem] xsm:[&[data-state=open]]:leading-[120%] xsm:[&[data-state=open]]:tracking-[-0.01406rem] cursor-pointer p-0 text-[1.25rem] leading-[140%] font-semibold tracking-[-0.0125rem] capitalize transition-all duration-300 ease-out hover:no-underline [&>svg]:size-[1.45833rem] [&>svg]:text-[#090909] [&[data-state=open]]:text-[1.77083rem] [&[data-state=open]]:leading-[120%] [&[data-state=open]]:tracking-[-0.01771rem] [&[data-state=open]]:text-[#D32F2F] [&[data-state=open]>svg]:scale-y-[-1] [&[data-state=open]>svg]:rotate-0 [&[data-state=open]>svg]:text-[#D32F2F]'>
                <span className='xsm:w-[14.32292rem] whitespace-pre-line'>{responsibility.title}</span>
              </AccordionTrigger>
              <AccordionContent className='font-open-sans xsm:text-[0.72917rem] xsm:[text-box-trim:trim-both] xsm:[text-box-edge:cap_alphabetic] pt-[0.83333rem] pb-0 text-[0.9375rem] leading-[150%] text-[rgba(9,9,9,0.60)]'>
                {responsibility.description}
                <Image
                  src={responsibility.image || leftImage}
                  alt={responsibility.title || 'Content'}
                  width={343}
                  height={331}
                  className='xsm:mt-[0.72917rem] h-[17.25719rem] w-full object-cover sm:hidden'
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <SectionPagination
        className='bg-[#F0F0F0] py-[6.25rem]'
        prev={{ label: t('Breadcrumb.historyPage'), href: '/history' }}
        center={{ label: t('Breadcrumb.aboutUsPage'), href: aboutUsHref }}
        next={{ label: t('FounderPage.ceoMessage'), href: leadershipHref }}
      />
    </>
  )
}
