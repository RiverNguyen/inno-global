import Image from 'next/image'

import { IAcfImage } from '@/interfaces/acf-wp.interface'
import { cn } from '@/lib/utils'

interface CardVisionMissionProps {
  alignContent?: 'left' | 'right'
  title?: string
  content?: string
  thumbnail?: IAcfImage
  classNameCard?: string
  classNameTitle?: string
  classNameContent?: string
  classNameThumbnail?: string
}

export default function CardVisionMission({
  alignContent = 'left',
  title,
  content,
  thumbnail,
  classNameCard,
  classNameTitle,
  classNameContent,
  classNameThumbnail,
}: CardVisionMissionProps) {
  return (
    <div
      className={cn(
        'xsm:grid-cols-1 xsm:shadow-card-about-us-mb xsm:h-auto xsm:bg-white relative grid h-[23.73917rem] grid-cols-2',
        classNameCard,
      )}
    >
      <div
        className={cn(
          'relative col-span-1 flex items-center justify-center',
          alignContent === 'right' ? 'order-2' : 'order-1',
        )}
      >
        <div className='xsm:space-y-[0.41667rem] xsm:pt-[0.9375rem] xsm:pb-[1.25rem] xsm:px-[1.04167rem] relative z-1 space-y-[1.04167rem] p-[3.125rem]'>
          <h2
            className={cn(
              'text-primary sm:text-trim-both sm:text-edge-[cap_alphabetic] xsm:text-[1.25rem] xsm:tracking-normal text-[1.66667rem] leading-[1.2] font-semibold tracking-[-0.01667rem]',
              classNameTitle,
            )}
          >
            {title}
          </h2>
          <div
            dangerouslySetInnerHTML={{ __html: content || '' }}
            className={cn(
              'text-primary xsm:text-[0.83333rem] xsm:tracking-[-0.01667rem] text-[1.25rem] leading-[1.5] tracking-[-0.025rem] [&_li]:ml-[1.5rem] [&_ol]:list-decimal [&_strong]:font-bold [&_ul]:list-disc',
              classNameContent,
            )}
          ></div>
        </div>
      </div>
      <div
        className={cn(
          'xsm:h-[11.31422rem] xsm:row-start-1 col-span-1',
          alignContent === 'right' ? 'order-1' : 'order-2',
          classNameThumbnail,
        )}
      >
        {thumbnail && thumbnail?.url && (
          <Image
            alt={thumbnail?.alt || ''}
            width={720}
            height={460}
            src={thumbnail?.url}
            className='size-full object-cover'
          />
        )}
      </div>
    </div>
  )
}
