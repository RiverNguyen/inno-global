import { Skeleton } from '@/components/ui/skeleton'

function ProjectCardSkeleton() {
  return (
    <div className='group relative overflow-hidden'>
      <Skeleton className='xsm:h-[11.30984rem] xsm:rounded-[0.1576rem] h-[15.15625rem] w-full rounded-[0.20833rem] bg-[#F0F0F0]' />
      <div className='pt-[0.72917rem]'>
        <div className='mb-[0.3125rem] flex items-center justify-between'>
          <Skeleton className='h-[1.40625rem] w-[12rem] bg-[#F0F0F0]' />
          <Skeleton className='h-[1.09375rem] w-[4rem] bg-[#F0F0F0] xsm:hidden' />
        </div>
        <div className='flex flex-col space-y-[0.46875rem]'>
          <div className='flex items-center space-x-[0.3125rem]'>
            <Skeleton className='size-[0.83333rem] rounded bg-[#F0F0F0]' />
            <Skeleton className='h-[1.09375rem] w-[3rem] bg-[#F0F0F0]' />
            <Skeleton className='h-[1.09375rem] w-[8rem] bg-[#F0F0F0]' />
          </div>
          <div className='flex items-center space-x-[0.3125rem]'>
            <Skeleton className='size-[0.83333rem] rounded bg-[#F0F0F0]' />
            <Skeleton className='h-[1.09375rem] w-[3rem] bg-[#F0F0F0]' />
            <Skeleton className='h-[1.09375rem] w-[6rem] bg-[#F0F0F0]' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProjectListSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </>
  )
}
