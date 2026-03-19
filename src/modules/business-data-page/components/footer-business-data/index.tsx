import { useLocale, useTranslations } from 'next-intl'

import SectionPagination from '@/components/shared/SectionPagination'

const FooterBusinessData = () => {
  const locale = useLocale()
  const t = useTranslations()
  return (
    // <section className='h-[8.59375rem] bg-[#F0F0F0] overflow-hidden'>
    //   <div className='xsm:py-[3.33333rem] xsm:px-[0.83333rem] flex items-center justify-between max-w-[75rem] py-[2.96875rem] mx-auto'>
    //     <Link href={t('BusinessDataPage.prevPage.url')}>
    //       <div className='flex items-center'>
    //         <svg
    //           className='size-[0.83333rem]'
    //           xmlns='http://www.w3.org/2000/svg'
    //           width='16'
    //           height='16'
    //           viewBox='0 0 16 16'
    //           fill='none'
    //         >
    //           <path
    //             d='M6.37999 3.95337L2.33333 8.00004L6.37999 12.0467'
    //             stroke='#D32F2F'
    //             strokeWidth='1.5'
    //             strokeMiterlimit='10'
    //             strokeLinecap='round'
    //             strokeLinejoin='round'
    //           />
    //         </svg>
    //         <p className='xsm:text-[0.625rem] pc-button-16-r text-[#D32F2F] xsm:line-clamp-1 xsm:max-w-[5rem]'>
    //           {t('BusinessDataPage.prevPage.title')}
    //         </p>
    //       </div>
    //     </Link>
    //     <div className='flex items-center'>
    //       <div className='border-b-1 border-[#D32F2F] py-[0.42rem]'>
    //         <p className='xsm:text-[0.625rem] text-[#D32F2F] text-[0.83333rem] font-semibold font-open-sans leading-[1.3] tracking-[-0.00833rem] text-left'>
    //           {t('Breadcrumb.aboutUsPage')}
    //         </p>
    //       </div>
    //     </div>
    //     <Link href={t('BusinessDataPage.nextPage.url')}>
    //       <div className='flex items-center'>
    //         <p className='xsm:text-[0.625rem] pc-button-16-r text-[#D32F2F] xsm:line-clamp-1 xsm:max-w-[5rem] xsm:text-right xsm:pr-2'>
    //           {t('BusinessDataPage.nextPage.title')}
    //         </p>
    //         <svg
    //           className='size-[0.83333rem]'
    //           xmlns='http://www.w3.org/2000/svg'
    //           width='16'
    //           height='16'
    //           viewBox='0 0 16 16'
    //           fill='none'
    //         >
    //           <path
    //             d='M9.62 3.95337L13.6667 8.00004L9.62 12.0467'
    //             stroke='#D32F2F'
    //             strokeWidth='1.5'
    //             strokeMiterlimit='10'
    //             strokeLinecap='round'
    //             strokeLinejoin='round'
    //           />
    //         </svg>
    //       </div>
    //     </Link>
    //   </div>
    // </section>
    <SectionPagination
      className='bg-[#F0F0F0]'
      prev={{
        label: t('BusinessDataPage.prevPage.title'),
        href: `${locale === 'vi' ? '/ve-chung-toi' : '/en/about-us/corporate-culture'}`,
      }}
      center={{
        label: t('Breadcrumb.aboutUsPage'),
        href: locale === 'vi' ? '/ve-chung-toi' : '/en/about-us',
      }}
      next={{
        label: t('BusinessDataPage.nextPage.title'),
        href: `${locale === 'vi' ? '/ve-chung-toi/lich-su-hinh-thanh' : '/en/about-us/formation-history'}`,
      }}
    />
  )
}

export default FooterBusinessData
