'use client'

import Image from 'next/image'
import { type SVGProps } from 'react'

import { Link } from '@/i18n/navigation'

interface ServiceCardProps {
  href: string
  title: string
  description: string
  imageSrc: string
}

export default function ServiceCard({ href, title, description, imageSrc }: ServiceCardProps) {
  return (
    <div data-service-item>
      <Link
        href={href}
        className='group xsm:rounded-[0.20833rem] xsm:h-[5.29167rem] relative flex h-[23.69792rem] flex-col overflow-hidden'
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={title || 'service'}
            width={704}
            height={363}
            className='xsm:h-full absolute top-0 left-0 h-[18.9rem] w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.41,0.01,0,1)] group-hover:translate-y-[-3.125rem]'
          />
        ) : (
          <div className='xsm:h-full absolute top-0 left-0 h-[18.9rem] w-full bg-[#E9E9E9]' />
        )}

        <div className='absolute inset-0 bg-[linear-gradient(180deg,#000_47.12%,rgba(29,29,29,0.72)_71.63%,rgba(102,102,102,0.00)_100%)] opacity-[0.46] sm:hidden'></div>

        <div className='xsm:absolute-y-center xsm:bg-transparent xsm:py-[0.20833rem] xsm:px-[0.41667rem] xsm:justify-start xsm:gap-[0.41667rem] absolute top-full left-0 flex w-full translate-y-[-4.8rem] flex-col justify-center gap-[0.52083rem] bg-[#F0F0F0] p-[1.45833rem] transition-transform duration-500 ease-[cubic-bezier(0.41,0.01,0,1)] group-hover:translate-y-[-100%]'>
          <div className='flex items-center justify-between'>
            <h3 className='group-hover:text-primary-red-100 text-en font-open-sans xsm:line-clamp-2 xsm:text-white xsm:text-[0.72917rem] xsm:flex-1 line-clamp-1 text-[1.25rem] leading-[150%] font-semibold transition-colors duration-500 ease-[cubic-bezier(0.41,0.01,0,1)]'>
              {title}
            </h3>
            <div className='flex-center xsm:hidden rounded-full bg-[rgba(9,9,9,0.10)] p-[0.46875rem] backdrop-blur-[20px]'>
              <IconChevronRight className='size-[0.83333rem]' />
            </div>
            <IconArrowRight className='xsm:block hidden size-[0.72917rem]' />
          </div>

          <p className='text-en-60 font-open-sans xsm:hidden line-clamp-5 text-justify text-[0.83333rem] leading-[150%] tracking-[-0.01667rem] opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.41,0.01,0,1)] group-hover:opacity-90'>
            {description || 'INNO cung cấp giải pháp kiến trúc toàn diện, kết hợp hài hòa giữa công năng, thẩm mỹ và sự phù hợp với bối cảnh. Mỗi dự án được nghiên cứu kỹ lưỡng từ ý tưởng, không gian, vật liệu đến trải nghiệm sử dụng. Chúng tôi hướng tới những thiết kế bền vững, tinh gọn và mang dấu ấn riêng của chủ đầu tư. Mục tiêu cuối cùng là tạo nên không gian sống và làm việc thực sự hiệu quả và truyền cảm hứng.'}
          </p>
        </div>
      </Link>
    </div>
  )
}

const IconChevronRight = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      {...props}
    >
      <path
        d='M6 13L11.0002 7.88114L6 3'
        stroke='#090909'
        strokeWidth='1.2'
      />
    </svg>
  )
}

const IconArrowRight = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='14'
      height='14'
      viewBox='0 0 14 14'
      fill='none'
      {...props}
    >
      <path
        d='M9.72134 7.58901L2.62093 7.58902L2.62093 6.42253L9.72093 6.42211L6.59228 3.29346L7.41723 2.4685L11.9545 7.00577L7.41723 11.543L6.59227 10.7181L9.72134 7.58901Z'
        fill='white'
      />
    </svg>
  )
}
