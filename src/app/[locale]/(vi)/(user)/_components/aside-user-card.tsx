import type { Session } from 'next-auth'
import { getTranslations } from 'next-intl/server'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'

type AsideUserCardProps = {
  session: Session | null
}

export default async function AsideUserCard({ session }: AsideUserCardProps) {
  const t = await getTranslations('UserPage')

  return (
    <div className='p-[0.83rem] bg-white xsm:rounded-[0.625rem]'>
      <p className='text-[#202020] text-[0.73rem] leading-[1.5]'>{t('hello')}</p>
      <hr className='my-[0.625rem] border-[#ECECEC]/40 xsm:my-[0.52rem]' />
      <div className='flex-y-center space-x-[0.62rem]'>
        <div className='size-[2.5rem] rounded-full border border-[#D32F2F] relative overflow-hidden'>
          <Avatar className='size-full object-cover'>
            <AvatarImage
              src={session?.user?.avatar_512 || ''}
              className='object-cover'
            />
            <AvatarFallback>
              <Skeleton className='size-full rounded-full' />
            </AvatarFallback>
          </Avatar>
        </div>
        <div className=''>
          <p className='text-[#090909] text-[0.83rem] leading-[1.5] tracking-[-0.0167rem] xsm:leading-[1.2] xsm:tracking-normal xsm:font-semibold'>
            {session?.user?.display_name || '---'}
          </p>
          <p className='text-[#090909]/40 text-[0.72917rem] leading-[1.5]'>ID: {session?.user?.user_code}</p>
        </div>
      </div>
    </div>
  )
}
