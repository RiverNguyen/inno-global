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
      className={cn(
        'group block relative overflow-hidden xsm:pb-[1.25rem] xsm:border-b xsm:border-b-[rgba(9,9,9,0.08)] xsm:last:border-b-0 xsm:last:pb-[1.04rem]',
        wrapperClassname,
      )}
    >
      <div
        className={cn(
          'xsm:h-[10.88542rem] relative flex h-[15.15625rem] w-full items-center justify-center overflow-hidden',
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
        <div className='mb-[0.3125rem] flex items-center justify-between space-x-4 xsm:mb-[0.52083rem]'>
          <h3
            className={cn(
              'font-open-sans line-clamp-1 max-w-[16rem] text-[0.9375rem] leading-[150%] font-semibold text-[#090909] xsm:text-[0.72917rem] xsm:max-w-full',
              classNameTitle,
            )}
          >
            {training?.title}
          </h3>
        </div>
        <div className='flex flex-col space-y-[0.46875rem] xsm:space-y-[0.3125rem]'>
          <div className='font-open-sans flex items-center space-x-[0.72917rem] xsm:space-x-[0.72917rem] text-[0.72917rem] leading-[150%] text-[#090909] xsm:tracking-[-0.01458rem]'>
            <span className='whitespace-nowrap'>{t('format')}:</span>
            <span className='line-clamp-1 max-w-full'>{training?.taxonomies?.training_format?.[0]?.name || '-'}</span>
          </div>
          <div className='font-open-sans flex items-center space-x-[0.72917rem] xsm:space-x-[0.72917rem] text-[0.72917rem] leading-[150%] text-[#090909] xsm:tracking-[-0.01458rem]'>
            <span>{t('lecturer')}:</span>
            <span>{training?.taxonomies?.lecturer?.[0]?.name || '-'}</span>
          </div>
          <div className='font-open-sans flex items-center space-x-[0.72917rem] xsm:space-x-[0.72917rem] text-[0.72917rem] leading-[150%] text-[#090909] xsm:tracking-[-0.01458rem]'>
            <span>{t('participant')}:</span>
            <span>{training?.taxonomies?.participant?.[0]?.name || '-'}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
