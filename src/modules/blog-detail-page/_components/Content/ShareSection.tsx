'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import IconFacebook from '@/components/icons/ICFacebook'
import IconLinkedin from '@/components/icons/ICInstagram'
import IconShareLink from '@/components/icons/ICShareLink'
import IconTwitter from '@/components/icons/ICTwitter'
import { IBlog } from '@/interfaces/blog.interface'
import { formatDateToDDMMYYYY } from '@/lib/utils'

interface ShareSectionProps {
  blog: IBlog
}

export default function ShareSection({ blog }: ShareSectionProps) {
  const t = useTranslations('DetailBlogPage')

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
        toast.success('Liên kết đã được sao chép vào bảng tạm')
      } catch (clipboardError) {
        console.error('Clipboard error:', clipboardError)
      }
    }
  }

  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
  const linkedInShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
  const xShare = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent(title)}`

  return (
    <div className='xsm:flex-col-reverse xsm:items-start xsm:justify-start xsm:gap-[1.04167rem] xsm:p-[0.83333rem_0_2.08333rem_0] xsm:mt-[1.66667rem] mt-[2.08333rem] flex items-center justify-between border-t-[0.05208rem] border-t-[rgba(9,9,9,0.08)] pt-[0.9375rem]'>
      <div className='flex items-center gap-[0.52083rem]'>
        <span className='text-[rgba(9,9,9,0.80) font-open-sans xsm:text-[0.625rem] xsm:tracking-[-0.00625rem] text-[0.9375rem] leading-[150%]'>
          Chia sẻ:
        </span>
        <div className='flex items-center gap-[0.625rem]'>
          <button
            onClick={handleCopyLink}
            aria-label='Sao chép liên kết'
          >
            <IconShareLink className='xsm:size-[1.25rem] inline-block size-[2.08333rem]' />
          </button>
          <Link
            href={facebookShare}
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Chia sẻ lên Facebook'
          >
            <IconFacebook className='xsm:size-[1.25rem] inline-block size-[2.08333rem]' />
          </Link>
          <Link
            href={linkedInShare}
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Chia sẻ lên LinkedIn'
          >
            <IconLinkedin className='xsm:size-[1.25rem] inline-block size-[2.08333rem]' />
          </Link>
          <Link
            href={xShare}
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Chia sẻ lên X'
          >
            <IconTwitter className='xsm:size-[1.25rem] inline-block size-[2.08333rem]' />
          </Link>
        </div>
      </div>

      <div className='xsm:flex-col xsm:items-start xsm:gap-[0.625rem] flex items-center gap-[1.71875rem]'>
        <div className='font-open-sans xsm:gap-[0.26042rem] xsm:text-[0.625rem] flex items-center gap-[0.52083rem] text-[0.9375rem] leading-[150%]'>
          <span className='xsm:text-[rgba(46,46,46,0.75)] xsm:tracking-[-0.00625rem] text-[rgba(9,9,9,0.80)]'>
            {t('writtenBy')}:
          </span>
          <span className='xsm:capitalize font-semibold text-[#090909]'>{blog?.author}</span>
        </div>

        <div className='font-open-sans xsm:gap-[0.26042rem] xsm:text-[0.625rem] flex items-center gap-[0.52083rem] text-[0.9375rem] leading-[150%]'>
          <span className='xsm:text-[rgba(46,46,46,0.75)] xsm:tracking-[-0.00625rem] text-[rgba(9,9,9,0.80)]'>
            {t('publishedDate')}:
          </span>
          <span className='xsm:capitalize font-semibold text-[#090909]'>{formatDateToDDMMYYYY(blog?.date)}</span>
        </div>

        <div className='font-open-sans xsm:gap-[0.26042rem] xsm:text-[0.625rem] flex items-center gap-[0.52083rem] text-[0.9375rem] leading-[150%]'>
          <span className='xsm:text-[rgba(46,46,46,0.75)] xsm:tracking-[-0.00625rem] text-[rgba(9,9,9,0.80)]'>
            {t('tag')}:
          </span>
          <div className='flex items-center gap-[0.26042rem]'>
            {blog?.taxonomies?.post_tag?.map((tag) => (
              <span
                key={tag.id}
                className='flex-center font-open-sans xsm:text-[0.625rem] text-primary-red xsm:h-[1.3021rem] h-[1.3542rem] bg-[rgba(211,47,47,0.06)] px-[0.52083rem] text-[0.72917rem] leading-[150%] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
