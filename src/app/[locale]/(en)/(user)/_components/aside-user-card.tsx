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
    <div className='xsm:rounded-[0.625rem] bg-white p-[0.83rem]'>
      <p className='text-[0.73rem] leading-[1.5] text-[#202020]'>{t('hello')}</p>
      <hr className='xsm:my-[0.52rem] my-[0.625rem] border-[#ECECEC]/40' />
      <div className='flex-y-center space-x-[0.62rem]'>
        <div className='relative size-[2.5rem] overflow-hidden rounded-full border border-[#D32F2F]'>
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
          <p className='xsm:leading-[1.2] xsm:tracking-normal xsm:font-semibold text-[0.83rem] leading-[1.5] tracking-[-0.0167rem] text-[#090909]'>
            {session?.user?.display_name || '---'}
          </p>
          <p className='text-[0.72917rem] leading-[1.5] text-[#090909]/40'>ID: {session?.user?.user_code}</p>
        </div>
      </div>
    </div>
  )
}
