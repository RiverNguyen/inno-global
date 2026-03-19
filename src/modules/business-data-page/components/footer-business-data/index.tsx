import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'

const FooterBusinessData = () => {
  const t = useTranslations()
  return (
    <section className='h-[8.59375rem] bg-[#F0F0F0] overflow-hidden'>
      <div className='xsm:py-[3.33333rem] xsm:px-[0.83333rem] flex items-center justify-between max-w-[75rem] py-[2.96875rem] mx-auto'>
        <Link href={t('BusinessDataPage.prevPage.url')}>
          <div className='flex items-center'>
            <svg
              className='size-[0.83333rem]'
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
            <p className='xsm:text-[0.625rem] pc-button-16-r text-[#D32F2F]'>{t('BusinessDataPage.prevPage.title')}</p>
          </div>
        </Link>
        <div className='flex items-center'>
          <div className='border-b-1 border-[#D32F2F] py-[0.42rem]'>
            <p className='xsm:text-[0.625rem] text-[#D32F2F] text-[0.83333rem] font-semibold font-open-sans leading-[1.3] tracking-[-0.00833rem] text-left'>
              {t('BusinessDataPage.title')}
            </p>
          </div>
        </div>
        <Link href={t('BusinessDataPage.nextPage.url')}>
          <div className='flex items-center'>
            <p className='xsm:text-[0.625rem] pc-button-16-r text-[#D32F2F]'>{t('BusinessDataPage.nextPage.title')}</p>
            <svg
              className='size-[0.83333rem]'
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
