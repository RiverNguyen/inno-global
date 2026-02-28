'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useRef, useState } from 'react'
import { toast } from 'sonner'

import { updateAvatar } from '@/actions/updateAvatar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { Spinner } from '@/components/ui/spinner'

const ICEditAvatar = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='16'
    height='16'
    viewBox='0 0 16 16'
    fill='none'
    {...props}
  >
    <path
      d='M8.83958 2.4008L3.36624 8.19413C3.15958 8.41413 2.95958 8.84746 2.91958 9.14746L2.67291 11.3075C2.58624 12.0875 3.14624 12.6208 3.91958 12.4875L6.06624 12.1208C6.36624 12.0675 6.78624 11.8475 6.99291 11.6208L12.4662 5.82746C13.4129 4.82746 13.8396 3.68746 12.3662 2.29413C10.8996 0.914129 9.78624 1.4008 8.83958 2.4008Z'
      stroke='white'
      strokeMiterlimit='10'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M7.92578 3.36719C8.21245 5.20719 9.70578 6.61385 11.5591 6.80052'
      stroke='white'
      strokeMiterlimit='10'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M2 14.666H14'
      stroke='white'
      strokeMiterlimit='10'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

interface AvatarEditProps {
  avatarUrl?: string
}

export default function AvatarEdit({ avatarUrl }: AvatarEditProps) {
  const t = useTranslations('UserPage')
  const inputRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const { data: session, update } = useSession()
  const router = useRouter()

  const displayAvatar = previewUrl ?? session?.user?.avatar_512 ?? avatarUrl ?? ''

  const handleClick = () => {
    if (isLoading) return
    inputRef.current?.click()
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)

    const formData = new FormData()
    formData.append('avatar', file)

    const clearPreview = () => {
      URL.revokeObjectURL(objectUrl)
      setPreviewUrl(null)
    }

    setIsLoading(true)
    try {
      const result = await updateAvatar(formData)
      if (result?.success) {
        await update({ _action: 'updateInfo' })
        setIsLoading(false)
        toast.success(t('avatarUpdateSuccess'))
        clearPreview()
        router.refresh()
      } else {
        setIsLoading(false)
        clearPreview()
        toast.error(t('avatarUpdateFailed'))
      }
    } catch {
      setIsLoading(false)
      clearPreview()
      toast.error(t('avatarUpdateFailed'))
    } finally {
      e.target.value = ''
    }
  }

  return (
    <div className='group xsm:size-[5.2rem] xsm:mx-auto relative size-[12.44792rem] cursor-pointer overflow-hidden rounded-full'>
      {isLoading && (
        <div className='flex-center absolute inset-0 z-[2] size-full bg-black/50'>
          <Spinner className='size-10 text-white' />
        </div>
      )}
      <div className='flex-center xsm:top-auto xsm:bottom-0 xsm:h-[1.67rem] xsm:w-full xsm:opacity-100 xsm:border-none xsm:rounded-none xsm:bg-white/20 xsm:backdrop-blur-[4.8px] absolute top-0 left-0 z-[1] size-full bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
        <button
          type='button'
          onClick={handleClick}
          disabled={isLoading}
          className='flex-center xsm:border-none xsm:rounded-none h-[2.083rem] rounded-[5.2rem] border border-white px-[0.83rem] disabled:opacity-60'
        >
          {isLoading ? (
            <span className='text-[0.73rem] leading-[1.5] text-white'>{t('avatarLoading')}</span>
          ) : (
            <>
              <ICEditAvatar className='xsm:size-[0.67rem] xsm:mr-[0.25rem] mr-[0.3125rem] size-[0.83rem]' />
              <p className='xsm:text-[0.583rem] text-[0.73rem] leading-[1.5] text-white'>{t('changeAvatar')}</p>
            </>
          )}
        </button>
      </div>
      <input
        ref={inputRef}
        type='file'
        accept='image/*'
        className='hidden'
        onChange={handleChange}
      />
      <Avatar className='size-full'>
        <AvatarImage
          src={displayAvatar}
          key={displayAvatar}
          className='object-cover'
        />
        <AvatarFallback>
          <Skeleton className='size-full rounded-full' />
        </AvatarFallback>
      </Avatar>
    </div>
  )
}
