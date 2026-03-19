import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'

const FooterBusinessData = () => {
  const t = useTranslations()
  return (
    <section className='xsm:h-auto h-[8.59375rem] bg-[#F0F0F0] overflow-hidden'>
      <div className='xsm:py-[3.33333rem] xsm:px-[0.83333rem] flex items-center justify-between max-w-[75rem] py-[2.96875rem] mx-auto'>
        <Link href={t('BusinessDataPage.prevPage.url')}>
          <div className='xsm:max-w-[5.5rem] flex items-center'>
            <svg
              className='xsm:size-[0.72917rem] mr-[0.31rem] size-[0.83333rem]'
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
            >
              <path
                d='M6.37999 3.95337L2.33333 8.00004L6.37999 12.0467'
                stroke='#D32F2F'
                strokeWidth='1.5'
                strokeMiterlimit='10'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <span className='xsm:text-[0.625rem] line-clamp-2 text-left pc-button-16-r text-[#D32F2F]'>
              {t('BusinessDataPage.prevPage.title')}
              {/* Trang B */}
            </span>
          </div>
        </Link>
        <Link
          className='mx-[1rem]'
          href={t('BusinessDataPage.aboutUsUrl.url')}
        >
          <div className='flex items-center'>
            <div className='border-b-1 border-[#D32F2F] py-[0.42rem]'>
              <span className='xsm:text-[0.625rem] line-clamp-2 text-center text-[#D32F2F] text-[0.83333rem] font-semibold font-open-sans leading-[1.3] tracking-[-0.00833rem]'>
                {t('BusinessDataPage.aboutUsUrl.title')}
              </span>
            </div>
          </div>
        </Link>
        <Link href={t('BusinessDataPage.nextPage.url')}>
          <div className='xsm:max-w-[5.5rem] flex items-center'>
            <span className='xsm:text-[0.625rem] line-clamp-2 text-right pc-button-16-r text-[#D32F2F]'>
              {t('BusinessDataPage.nextPage.title')}
              {/* Trang A */}
            </span>
            <svg
              className='xsm:size-[0.72917rem] ml-[0.31rem] size-[0.83333rem]'
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
            >
              <path
                d='M9.62 3.95337L13.6667 8.00004L9.62 12.0467'
                stroke='#D32F2F'
                strokeWidth='1.5'
                strokeMiterlimit='10'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </Link>
      </div>
    </section>
  )
}

export default FooterBusinessData
