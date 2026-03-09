'use client'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import IconFacebook from '@/components/icons/ICFacebook'
import IconLinkedin from '@/components/icons/ICInstagram'
import IconShareLink from '@/components/icons/ICShareLink'
import IconTwitter from '@/components/icons/ICTwitter'

export default function ShareSection() {
  const t = useTranslations('DetailTrainingPage')
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const encodedUrl = encodeURIComponent(shareUrl)
  const title = typeof document !== 'undefined' ? document.title : ''

  const handleCopyLink = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ url: encodedUrl, title })
        return
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        return
      }
      try {
        await navigator.clipboard.writeText(encodedUrl)
        toast.success(t('shareLinkCopied'))
      } catch (clipboardError) {
        console.error('Clipboard error:', clipboardError)
      }
    }
  }

  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
  const linkedInShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
  const xShare = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent(title)}`

  return (
    <div className='xsm:flex-col-reverse xsm:items-start xsm:justify-start xsm:gap-[1.04167rem] xsm:p-[0.83333rem_0_2.08333rem_0] xsm:pt-0 xsm:mt-[1.66667rem] mt-[2.08333rem] flex items-center justify-between pt-[0.9375rem]'>
      <div className='flex items-center gap-[0.52083rem]'>
        <span className='xsm:text-[#090909] font-open-sans xsm:leading-[120%] xsm:text-[0.83333rem] xsm:font-semibold text-[0.9375rem] leading-[150%] text-[rgba(9,9,9,0.80)]'>
          {t('share')}
        </span>
        <div className='flex items-center gap-[0.625rem]'>
          <button
            onClick={handleCopyLink}
            className='size-[2.08333rem]'
            aria-label='Sao chép liên kết'
          >
            <IconShareLink className='h-auto w-full' />
          </button>
          <a
            href={facebookShare}
            target='_blank'
            rel='noopener noreferrer'
            className='size-[2.08333rem]'
            aria-label='Chia sẻ lên Facebook'
          >
            <IconFacebook className='h-auto w-full' />
          </a>
          <a
            href={linkedInShare}
            target='_blank'
            rel='noopener noreferrer'
            className='size-[2.08333rem]'
            aria-label='Chia sẻ lên LinkedIn'
          >
            <IconLinkedin className='h-auto w-full' />
          </a>
          <a
            href={xShare}
            target='_blank'
            rel='noopener noreferrer'
            className='size-[2.08333rem]'
            aria-label='Chia sẻ lên X'
          >
            <IconTwitter className='h-auto w-full' />
          </a>
        </div>
      </div>
    </div>
  )
}
