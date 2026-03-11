'use client'

import { Skeleton } from '@/components/ui/skeleton'

function ServiceCardSkeleton() {
  return (
    <div className='group xsm:rounded-[0.20833rem] xsm:h-[5.29167rem] relative flex h-[20.83rem] flex-col overflow-hidden'>
      <Skeleton className='xsm:h-full absolute top-0 left-0 h-[18.9rem] w-full rounded-none bg-[#F0F0F0]' />

      <div className='xsm:absolute-y-center xsm:bg-transparent xsm:py-[0.20833rem] xsm:px-[0.41667rem] xsm:justify-start xsm:gap-[0.41667rem] absolute top-full left-0 flex w-full translate-y-[-4.8rem] flex-col justify-center gap-[0.52083rem] bg-[#F0F0F0] p-[1.45833rem]'>
        <div className='flex items-center justify-between gap-3'>
          <Skeleton className='h-[1.25rem] w-[70%] bg-[#E5E5E5]' />
          <Skeleton className='xsm:hidden size-[1.77083rem] rounded-full bg-[#E5E5E5]' />
          <Skeleton className='xsm:block hidden size-[0.72917rem] bg-[#E5E5E5]' />
        </div>
        <div className='xsm:hidden flex flex-col gap-[0.46875rem]'>
          <Skeleton className='h-[0.83333rem] w-full bg-[#E5E5E5]' />
          <Skeleton className='h-[0.83333rem] w-[92%] bg-[#E5E5E5]' />
          <Skeleton className='h-[0.83333rem] w-[78%] bg-[#E5E5E5]' />
        </div>
      </div>
    </div>
  )
}

export default function ServiceListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <ServiceCardSkeleton key={i} />
      ))}
    </>
  )
}
