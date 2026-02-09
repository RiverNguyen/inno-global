import { ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'

import { IProject } from '@/app/[locale]/_components/projects/projects'
import { cn } from '@/lib/utils'

interface IProjectInfoProps {
  data: IProject[]
  activeIndex: number
}

export default function ProjectInfo({ data, activeIndex }: IProjectInfoProps) {
  return (
    <div className='absolute bottom-0 left-0 w-[41.51042rem] p-[0.52083rem_5.20833rem_0_7.29167rem] z-10 xsm:w-auto xsm:left-[0.52rem] xsm:right-[0.52rem]  xsm:p-0'>
      <div className='relative w-full h-[12.5rem] rounded-[0.20833rem] shadow-[0_239px_67px_0_rgba(181,181,181,0.00),0_153px_61px_0_rgba(181,181,181,0.01),0_86px_52px_0_rgba(181,181,181,0.05),0_38px_38px_0_rgba(181,181,181,0.09),0_10px_21px_0_rgba(181,181,181,0.10)] xsm:overflow-hidden xsm:bg-white'>
        {data.map((item, index) => (
          <div
            className={cn(
              'absolute bottom-[1.333rem] left-0 w-full flex flex-col opacity-0 invisible sm:translate-y-full transition-all duration-300 ease-in-out  xsm:top-[1.25rem] xsm:right-[0.83333rem] xsm:bottom-[0.3167rem] xsm:left-[0.83333rem] xsm:w-auto',
              activeIndex === index && 'opacity-100 visible sm:translate-y-0',
            )}
            key={item.id}
          >
            <h3 className='text-white flex items-center justify-between space-x-[1rem] group xsm:text-[#090909]'>
              <Link
                className='text-[1.25rem] font-semibold leading-normal tracking-[-0.02813rem] xsm:text-[0.72917rem] line-clamp-1'
                href={`/projects/${item.link}`}
              >
                {item.title}
              </Link>
              <Link
                className='shrink-0 flex items-center space-x-[0.20833rem] text-[0.83rem] leading-normal tracking-[-0.01667rem] opacity-80 xsm:text-[0.625rem] xsm:text-[#D32F2F]'
                href={`/projects/${item.link}`}
              >
                Chi tiết{' '}
                <ChevronRightIcon className='xsm:size-[0.625rem] size-[0.83rem] group-hover:translate-x-[0.5rem] transition-all duration-300 ease-in-out' />
              </Link>
            </h3>
            <p className='text-[0.9375rem] text-white/80 mt-0.5 line-clamp-3 xsm:text-[0.72917rem] xsm:leading-[1.5] xsm:text-[#090909]/80 xsm:line-clamp-4 xsm:mt-[0.73rem]'>
              {item.content}
            </p>
            <div className='grid grid-cols-2 mt-[1.46rem] gap-x-[1rem] xsm:mt-auto'>
              <div className='flex border-t border-white/20 pt-[0.52rem] pb-[0.73rem] xsm:pb-[0.52rem] xsm:border-[#090909]/10'>
                <p className='text-[0.83333rem] text-white/90 tracking-[-0.01667rem] mr-[0.52rem] xsm:text-[0.625rem] xsm:text-[#090909]'>
                  Đầu tư
                </p>
                <p className='text-[0.83333rem] font-semibold text-white tracking-[-0.01667rem] xsm:text-[0.625rem] xsm:text-[#090909]/90'>
                  {item.investor}
                </p>
              </div>
              <div className='flex border-t border-white/20 pt-[0.52rem] pb-[0.73rem] xsm:pt-[0.52rem] xsm:pb-[0.73rem] xsm:border-[#090909]/10'>
                <p className='text-[0.83333rem] text-white/90 tracking-[-0.01667rem] mr-[0.52rem] xsm:text-[0.625rem] xsm:text-[#090909]'>
                  Địa điểm
                </p>
                <p className='text-[0.83333rem] font-semibold text-white tracking-[-0.01667rem] xsm:text-[0.625rem] xsm:text-[#090909]/90'>
                  {item.location}
                </p>
              </div>
              <div className='flex border-t border-white/20 pt-[0.52rem] pb-[0.73rem] xsm:pb-[0.52rem] xsm:border-[#090909]/10'>
                <p className='text-[0.83333rem] text-white/90 tracking-[-0.01667rem] mr-[0.52rem] xsm:text-[0.625rem] xsm:text-[#090909]'>
                  Quy mô
                </p>
                <p className='text-[0.83333rem] font-semibold text-white tracking-[-0.01667rem] xsm:text-[0.625rem] xsm:text-[#090909]/90'>
                  {item.area}
                </p>
              </div>
              <div className='flex border-t border-white/20 pt-[0.52rem] pb-[0.73rem] xsm:pb-[0.52rem] xsm:border-[#090909]/10'>
                <p className='text-[0.83333rem] text-white/90 tracking-[-0.01667rem] mr-[0.52rem] xsm:text-[0.625rem] xsm:text-[#090909]'>
                  Năm
                </p>
                <p className='text-[0.83333rem] font-semibold text-white tracking-[-0.01667rem] xsm:text-[0.625rem] xsm:text-[#090909]/90'>
                  {item.year}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
