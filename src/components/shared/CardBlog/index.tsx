import Image from 'next/image'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const formatDateDDMMYYYY = (value?: string) => {
  if (!value) return ''

  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (!match) return value

  const [, y, m, d] = match
  return `${d}.${m}.${y}`
}

interface CardBlogProps {
  title: string
  category: string
  date: string
  thumbnail: { alt?: string; url: string }
  classNameTitle?: string
  classNameThumbnail?: string
  classNameCategory?: string
  classNameDate?: string
  classNameCard?: string
  classNameMetaWrapper?: string
  classNameMetaRow?: string
  tags?: string[]
}

export default function CardBlog({
  title,
  category,
  date,
  thumbnail,
  classNameTitle,
  classNameCategory,
  classNameDate,
  classNameThumbnail,
  classNameCard,
  classNameMetaWrapper,
  classNameMetaRow,
  tags,
}: CardBlogProps) {
  const formattedDate = formatDateDDMMYYYY(date)
  return (
    <article
      className={cn(
        'xsm:space-y-0 group xsm:space-x-[0.52083rem] xsm:flex xsm:items-center relative w-full space-y-[0.72917rem]',
        classNameCard,
      )}
    >
      <div
        className={cn(
          'xsm:shrink-0 xsm:w-[5.10417rem] xsm:h-[3.60172rem] xsm:rounded-[0.11802rem] h-[14.94688rem] w-full overflow-hidden rounded-[0.20833rem]',
          classNameThumbnail,
        )}
      >
        {tags && tags.length > 0 && (
          <div className='absolute top-4 left-4 z-10'>
            {tags?.map((tag) => (
              <Badge
                className='bg-[#D32F2F] rounded-full text-white pc-body-16-r'
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <Image
          alt=''
          width={455}
          height={290}
          src={thumbnail.url || '/default.webp'}
          className='size-full rounded-[inherit] object-cover group-hover:scale-105 transition-all duration-300'
        />
      </div>
      <div className={cn('xsm:space-y-[0.5rem] space-y-[0.3125rem]', classNameMetaWrapper)}>
        <div className={cn('flex items-center space-x-[0.625rem] uppercase', classNameMetaRow)}>
          <p className={cn('text-primary-red/90 pc-sub-12-r xsm:tracking-normal', classNameCategory)}>
            {category || ''}
          </p>
          <p className={cn('text-en-60 pc-sub-12-r xsm:tracking-normal opacity-[0.9]', classNameDate)}>
            {formattedDate}
          </p>
        </div>
        <h3
          className={cn(
            'pc-body-18-m-primary group-hover:text-primary-red/90 transition-all duration-300 xsm:font-normal xsm:text-[0.72917rem] text-primary line-clamp-2',
            classNameTitle,
          )}
        >
          {title || ''}
        </h3>
      </div>
    </article>
  )
}
