'use client'

import ROUTES from '@/configs/routes'
import { ITraining } from '@/interfaces/training.inteface'
import { cn } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

interface TrainingCardProps {
  training: ITraining
  wrapperClassname?: string
  classNameThumbnail?: string
  classNameTitle?: string
}

export default function TrainingCard({
  training,
  wrapperClassname,
  classNameThumbnail,
  classNameTitle,
}: TrainingCardProps) {
  const t = useTranslations('TrainingListPage')
  const locale = useLocale()

  return (
    <Link
      href={locale === 'vi' ? `${ROUTES.trainingsVi}/${training?.slug}` : `${ROUTES.trainingsEn}/${training?.slug}`}
      className={cn('group relative overflow-hidden', wrapperClassname)}
    >
      <div
        className={cn(
          'xsm:h-[11.30984rem] xsm:rounded-[0.1576rem] relative flex h-[15.15625rem] w-full items-center justify-center overflow-hidden rounded-[0.20833rem]',
          classNameThumbnail,
        )}
      >
        <Image
          src={training?.featured_image?.url || '/default.webp'}
          alt={training?.title}
          width={460}
          height={291}
          className='z-1 size-full object-cover transition-all duration-500 ease-[cubic-bezier(0.44,0,0,0.99)] lg:group-hover:scale-120'
        />
      </div>
      <div className='pt-[0.72917rem]'>
        <div className='mb-[0.3125rem] flex items-center justify-between space-x-4'>
          <h3
            className={cn(
              'font-open-sans line-clamp-1 max-w-[16rem] text-[0.9375rem] leading-[150%] font-semibold text-[#090909]',
              classNameTitle,
            )}
          >
            {training?.title}
          </h3>
        </div>
        <div className='flex flex-col space-y-[0.46875rem]'>
          <div className='font-open-sans flex items-center space-x-[0.3125rem] text-[0.72917rem] leading-[150%] text-[rgba(9,9,9,0.6)]'>
            <span className='whitespace-nowrap [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>
              {t('format')}:
            </span>
            <span className='line-clamp-1 max-w-full'>{training?.taxonomies?.training_format?.[0]?.name || '-'}</span>
          </div>
          <div className='font-open-sans flex items-center space-x-[0.3125rem] text-[0.72917rem] leading-[150%] text-[rgba(9,9,9,0.6)]'>
            <span className='[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] xsm:pb-[0.125rem]'>
              {t('lecturer')}:
            </span>
            <span className='[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] xsm:pb-[0.125rem]'>
              {training?.taxonomies?.lecturer?.[0]?.name || '-'}
            </span>
          </div>
          <div className='font-open-sans flex items-center space-x-[0.3125rem] text-[0.72917rem] leading-[150%] text-[rgba(9,9,9,0.6)]'>
            <span className='[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] xsm:pb-[0.125rem]'>
              {t('participant')}:
            </span>
            <span className='[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] xsm:pb-[0.125rem]'>
              {training?.taxonomies?.participant?.[0]?.name || '-'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
