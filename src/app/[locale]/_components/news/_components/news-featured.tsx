import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { HTMLAttributes } from 'react'

import { INewsItem } from '@/app/[locale]/_components/news/_components/news-item'
import { cn } from '@/lib/utils'

interface NewsFeaturedProps extends HTMLAttributes<HTMLDivElement> {
  data: INewsItem
}

export default function NewsFeatured({ data, ...props }: NewsFeaturedProps) {
  return (
    <div
      {...props}
      className={cn(
        'flex flex-col w-[41.09375rem] h-[45.52083rem] rounded-[0.20833rem] overflow-hidden xsm:w-full xsm:h-[21rem]',
        props.className,
      )}
    >
      <Link href={data.slug}>
        <Image
          src={data.image}
          alt={data.title}
          width={789}
          height={607}
          className='object-cover w-full h-[31.6rem] xsm:h-[13.74375rem]'
        />
      </Link>
      <Link
        href={data.slug}
        className='text-white flex-1 flex flex-col space-y-[0.25rem] p-[2.08333rem_3.125rem_1rem_3.125rem] bg-[rgba(28,28,28,0.80)] group xsm:p-[1.25rem_0.83333rem] xsm:space-y-[0.62rem]'
      >
        <p className='text-[0.625rem] opacity-90 xsm:text-[0.52083rem]'>
          <span className='uppercase mr-[0.62rem]'>{data.category}</span>
          <span>{data.date}</span>
        </p>
        <h3 className='text-[1.25rem] font-semibold leading-normal tracking-[-0.05rem] line-clamp-1 xsm:text-[0.83333rem]'>
          {data.title}
        </h3>
        <p className='text-[0.9375rem] font-normal leading-[150%] tracking-[-0.025rem] line-clamp-3 opacity-80 xsm:hidden'>
          {data.description}
        </p>
        <span className='sm:self-end flex items-center space-x-[0.20833rem] text-[0.833rem] xsm:text-[0.67708rem] xsm:mt-auto'>
          Xem chi tiết{' '}
          <ChevronRight className='size-[0.833rem] xsm:size-[0.72917rem] group-hover:translate-x-[0.25rem] transition-all duration-300 ease-in-out' />
        </span>
      </Link>
    </div>
  )
}
