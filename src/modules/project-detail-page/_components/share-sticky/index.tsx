'use client'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

function IconCopy(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='50'
      height='50'
      viewBox='0 0 50 50'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <rect
        x='0.78125'
        y='0.78125'
        width='48.4375'
        height='48.4375'
        rx='24.2188'
        stroke='#D32F2F'
        strokeWidth='1.5625'
      />
      <g clipPath='url(#clip0_1029_31505)'>
        <path
          d='M37.1911 15.351C36.6913 14.8503 36.0976 14.4532 35.444 14.1825C34.7904 13.9118 34.0898 13.7728 33.3824 13.7735C32.6755 13.7719 31.9753 13.9104 31.3222 14.1809C30.6691 14.4515 30.0761 14.8487 29.5774 15.3497L22.6261 22.301C21.9507 22.9776 21.4674 23.8216 21.2258 24.7466C20.9841 25.6716 20.9929 26.6442 21.2511 27.5647C21.325 27.8268 21.5 28.0487 21.7376 28.1818C21.9752 28.3148 22.2559 28.348 22.518 28.2741C22.7801 28.2001 23.002 28.0251 23.1351 27.7876C23.2681 27.55 23.3013 27.2693 23.2274 27.0072C23.0674 26.4374 23.0618 25.8354 23.2112 25.2628C23.3605 24.6901 23.6595 24.1675 24.0774 23.7485L31.0286 16.7985C31.6563 16.1917 32.4972 15.8559 33.3701 15.8632C34.2431 15.8705 35.0782 16.2205 35.6956 16.8377C36.313 17.4549 36.6632 18.29 36.6707 19.1629C36.6783 20.0359 36.3427 20.8769 35.7361 21.5047L28.7849 28.4559C28.3293 28.9122 27.7508 29.2258 27.1199 29.3584C26.8527 29.4158 26.6192 29.577 26.4708 29.8065C26.3224 30.0359 26.2713 30.315 26.3286 30.5822C26.386 30.8494 26.5471 31.0829 26.7766 31.2313C27.0061 31.3797 27.2852 31.4308 27.5524 31.3735C28.5718 31.1583 29.5065 30.651 30.2424 29.9135L37.1936 22.9635C37.6942 22.464 38.0914 21.8706 38.3622 21.2174C38.6331 20.5641 38.7725 19.8639 38.7722 19.1567C38.772 18.4495 38.6322 17.7493 38.3609 17.0963C38.0896 16.4432 37.6921 15.8501 37.1911 15.351Z'
          fill='#D32F2F'
          stroke='#D32F2F'
          strokeWidth='0.3125'
        />
        <path
          d='M27.5363 23.627C27.4997 23.4972 27.4379 23.3759 27.3544 23.2701C27.2709 23.1642 27.1674 23.0758 27.0498 23.0099C26.9321 22.9441 26.8027 22.902 26.6688 22.8862C26.5349 22.8703 26.3992 22.881 26.2694 22.9176C26.1397 22.9542 26.0184 23.016 25.9125 23.0995C25.8066 23.183 25.7182 23.2865 25.6523 23.4041C25.5865 23.5218 25.5444 23.6512 25.5286 23.7851C25.5127 23.919 25.5234 24.0547 25.56 24.1845C25.7182 24.7531 25.7227 25.3535 25.5732 25.9244C25.4236 26.4953 25.1254 27.0164 24.7088 27.4345L17.7575 34.3882C17.1286 34.9882 16.2899 35.3183 15.4207 35.308C14.5515 35.2978 13.7209 34.9479 13.1062 34.3333C12.4916 33.7187 12.1418 32.888 12.1315 32.0188C12.1212 31.1497 12.4513 30.311 13.0513 29.682L20.0013 22.7295C20.4559 22.2735 21.0337 21.9598 21.6638 21.827C21.928 21.7709 22.1594 21.6129 22.3078 21.3873C22.4563 21.1617 22.5099 20.8867 22.4569 20.6219C22.4039 20.357 22.2487 20.1238 22.0249 19.9726C21.8011 19.8215 21.5267 19.7647 21.2613 19.8145H21.2413C20.2217 20.0312 19.287 20.5398 18.5513 21.2782L11.5988 28.2295C10.621 29.2451 10.0807 30.6037 10.094 32.0135C10.1073 33.4232 10.6732 34.7714 11.6699 35.7684C12.6667 36.7653 14.0149 37.3314 15.4246 37.3449C16.8343 37.3585 18.193 36.8184 19.2088 35.8407L26.16 28.8882C26.8352 28.212 27.3185 27.3684 27.5603 26.4439C27.8022 25.5194 27.7939 24.5472 27.5363 23.627Z'
          fill='#D32F2F'
          stroke='#D32F2F'
          strokeWidth='0.3125'
        />
      </g>
      <defs>
        <clipPath id='clip0_1029_31505'>
          <rect
            width='50'
            height='50'
            fill='white'
          />
        </clipPath>
      </defs>
    </svg>
  )
}

function IconFacebook(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='50'
      height='50'
      viewBox='0 0 50 50'
      fill='none'
      {...props}
    >
      <rect
        x='0.833333'
        y='0.833333'
        width='48.3333'
        height='48.3333'
        rx='24.1667'
        stroke='#D32F2F'
        strokeWidth='1.66667'
      />
      <path
        d='M22.4262 36.25V25.625H18.75V22.0833H22.4262V20.1815C22.4262 16.5805 24.2468 15 27.3532 15C28.8411 15 29.6278 15.1062 30 15.1549V18.5417H27.8816C26.5628 18.5417 26.1023 19.2119 26.1023 20.5702V22.0833H29.9669L29.4421 25.625H26.1023V36.25H22.4262Z'
        fill='#D32F2F'
      />
    </svg>
  )
}

function IconLinkedIn(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='50'
      height='50'
      viewBox='0 0 50 50'
      fill='none'
      {...props}
    >
      <rect
        x='0.833333'
        y='0.833333'
        width='48.3333'
        height='48.3333'
        rx='24.1667'
        stroke='#D32F2F'
        strokeWidth='1.66667'
      />
      <path
        d='M34.0485 14.4453H15.9485C15.1192 14.4453 14.4453 15.1286 14.4453 15.9674V34.0344C14.4453 34.8731 15.1192 35.5564 15.9485 35.5564H34.0485C34.8779 35.5564 35.5564 34.8731 35.5564 34.0344V15.9674C35.5564 15.1286 34.8779 14.4453 34.0485 14.4453ZM20.8258 32.5406H17.6968V22.4656H20.8305V32.5406H20.8258ZM19.2613 21.0897C18.2576 21.0897 17.447 20.2744 17.447 19.2754C17.447 18.2764 18.2576 17.4612 19.2613 17.4612C20.2603 17.4612 21.0755 18.2764 21.0755 19.2754C21.0755 20.2791 20.265 21.0897 19.2613 21.0897ZM32.5547 32.5406H29.4257V27.6398C29.4257 26.4711 29.4022 24.9679 27.8 24.9679C26.1695 24.9679 25.9198 26.2402 25.9198 27.5549V32.5406H22.7908V22.4656H25.7925V23.8416H25.8349C26.2543 23.05 27.2769 22.2159 28.799 22.2159C31.9657 22.2159 32.5547 24.3034 32.5547 27.0177V32.5406Z'
        fill='#D32F2F'
      />
    </svg>
  )
}

function IconX(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='50'
      height='50'
      viewBox='0 0 50 50'
      fill='none'
      {...props}
    >
      <rect
        x='0.833333'
        y='0.833333'
        width='48.3333'
        height='48.3333'
        rx='24.1667'
        stroke='#D32F2F'
        strokeWidth='1.66667'
      />
      <path
        d='M26.7961 23.5528L33.828 15.5547H32.1616L26.0559 22.4994L21.1793 15.5547H15.5547L22.9291 26.0563L15.5547 34.4436H17.2211L23.6689 27.1098L28.819 34.4436H34.4436L26.7957 23.5528H26.7961ZM24.5138 26.1488L23.7666 25.1031L17.8215 16.7822H20.381L25.1788 23.4974L25.9259 24.5431L32.1624 33.2719H29.6029L24.5138 26.1492V26.1488Z'
        fill='#D32F2F'
      />
    </svg>
  )
}

function ShareSticky() {
  const t = useTranslations('DetailProjectPage')
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
    <aside className='sticky top-[30.25rem] flex flex-col'>
      <span className='text-[0.83rem] leading-[1.3] font-semibold tracking-[-0.0083rem] whitespace-nowrap text-[#090909]/80'>
        {t('share')}
      </span>
      <hr className='mt-[0.43rem] mb-[0.83rem] border-[#090909]/8' />
      <div className='flex flex-col space-y-[0.625rem]'>
        <button
          type='button'
          className='size-[2.60417rem] cursor-pointer'
          onClick={handleCopyLink}
          aria-label='Copy link'
        >
          <IconCopy className='size-full' />
        </button>

        <a
          href={facebookShare}
          target='_blank'
          rel='noopener noreferrer'
          className='size-[2.60417rem]'
          aria-label='Chia sẻ lên Facebook'
        >
          <IconFacebook className='size-full' />
        </a>

        <a
          href={linkedInShare}
          target='_blank'
          rel='noopener noreferrer'
          className='size-[2.60417rem]'
          aria-label='Chia sẻ lên LinkedIn'
        >
          <IconLinkedIn className='size-full' />
        </a>

        <a
          href={xShare}
          target='_blank'
          rel='noopener noreferrer'
          className='size-[2.60417rem]'
          aria-label='Chia sẻ lên X (Twitter)'
        >
          <IconX className='size-full' />
        </a>
      </div>
    </aside>
  )
}

export default ShareSticky
