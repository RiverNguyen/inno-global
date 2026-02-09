'use client'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'

import ICChevronDown from '@/components/icons/ICChevronDown'
import Breadcrumb from '@/components/shared/Breadcrumb'
import ROUTES from '@/configs/routes'
import { Link } from '@/i18n/navigation'
import { ICompany, ISubCompanyRes } from '@/interfaces/subcompany.interface'

import CompanyCard from './components/CompanyCard'

export default function SubCompanyDetail({ res, companys }: { res: ISubCompanyRes; companys: ICompany[] }) {
  const t = useTranslations()
  const locale = useLocale()
  const title = res?.acf?.company_banner?.title

  const companyName = res?.acf?.company_detail?.name
  const companyDesc = res?.acf?.company_detail?.description
  const companyImage = res?.acf?.company_detail?.image
  const companyItems = res?.acf?.company_detail?.items

  return (
    <>
      <div className='xsm:pt-[1.66667rem] xsm:pb-[1.04167rem] bg-white py-[2.08333rem]'>
        <div className='xsm:max-w-full xsm:px-[0.83333rem] mx-auto max-w-[75rem]'>
          <Breadcrumb
            navItems={[
              {
                label: t('Breadcrumb.homePage'),
                href: '/',
              },
              {
                label: t('Breadcrumb.aboutUsPage'),
                href: '/about-us',
              },
            ]}
            lastItem={{
              label: title,
            }}
            classNameContainer='mb-[1.25rem] xsm:hidden'
          />
          <h1 className='xsm:text-[1.35417rem] xsm:text-[#090909] font-open-sans text-[2.8125rem] leading-[120%] font-semibold tracking-[-0.02813rem] text-[rgba(9,9,9,0.80)]'>
            {title}
          </h1>
        </div>
      </div>
      <div className='xsm:max-w-full mx-auto max-w-[75rem] pt-[2.5rem]'>
        <div className='xsm:px-[0.83333rem]'>
          <h2 className='xsm:text-[1.25rem] font-open-sans xsm:mb-[0.9375rem] mb-[1.04167rem] text-[2.08333rem] leading-[120%] font-semibold tracking-[-0.03125rem] text-[#090909]'>
            {companyName}
          </h2>
          <p className='font-open-sans xsm:text-[0.72917rem] xsm:[text-box-edge:cap_alphabetic] xsm:[text-box-trim:trim-both] text-[0.9375rem] leading-[150%] text-[#090909]'>
            {companyDesc}
          </p>
        </div>

        <div className='xsm:h-auto xsm:pt-[3.33333rem] relative flex h-[47.39583rem] flex-col items-center justify-center'>
          <Image
            src={companyImage?.url}
            alt={companyImage?.alt}
            width={732}
            height={525}
            className='xsm:h-[15.41667rem] xsm:w-[15.81932rem] xsm:mb-[1.66667rem] mx-auto h-[27.35146rem] w-[38.12854rem] object-cover'
          />
          <div className='xsm:gap-x-[0.78125rem] xsm:px-[0.83333rem] xsm:gap-y-[1.04167rem] z-1 grid grid-cols-2 sm:absolute sm:top-0 sm:left-0 sm:size-full'>
            <div className='col-span-2 h-[0.05208rem] w-full bg-[rgba(9,9,9,0.08)]'></div>
            <div className='xsm:relative xsm:inset-auto xsm:translate-none absolute top-[3.44rem] left-1/2 -translate-x-1/2 space-y-[0.52083rem]'>
              <h3 className='font-open-sans xsm:text-[1.25rem] xsm:text-left mb-[0.52083rem] text-center text-[2.08333rem] leading-[120%] font-semibold tracking-[-0.03125rem] text-[#D98345]'>
                {companyItems[0]?.label}
              </h3>
              <p className='font-open-sans xsm:text-[0.625rem] xsm:tracking-[-0.00625rem] xsm:text-left text-center text-[0.9375rem] leading-[150%] text-[rgba(9,9,9,0.60)]'>
                {companyItems[0]?.value}
              </p>
            </div>
            <div className='xsm:relative xsm:inset-auto xsm:translate-none absolute top-1/2 right-[4.84rem] -translate-y-1/2 space-y-[0.52083rem]'>
              <h3 className='font-open-sans xsm:text-[1.25rem] xsm:text-left mb-[0.52083rem] text-center text-[2.08333rem] leading-[120%] font-semibold tracking-[-0.03125rem] text-[#1ABC92]'>
                {companyItems[1]?.label}
              </h3>
              <p className='font-open-sans xsm:text-[0.625rem] xsm:tracking-[-0.00625rem] xsm:text-left text-center text-[0.9375rem] leading-[150%] text-[rgba(9,9,9,0.60)]'>
                {companyItems[1]?.value}
              </p>
            </div>
            <div className='col-span-2 h-[0.05208rem] w-full bg-[rgba(9,9,9,0.08)]'></div>
            <div className='xsm:relative xsm:inset-auto xsm:translate-none absolute bottom-[3.28rem] left-1/2 -translate-x-1/2 space-y-[0.52083rem]'>
              <h3 className='font-open-sans xsm:text-[1.25rem] xsm:text-left mb-[0.52083rem] text-center text-[2.08333rem] leading-[120%] font-semibold tracking-[-0.03125rem] text-[#D32F2F]'>
                {companyItems[2]?.label}
              </h3>
              <p className='font-open-sans xsm:text-[0.625rem] xsm:tracking-[-0.00625rem] xsm:text-left text-center text-[0.9375rem] leading-[150%] text-[rgba(9,9,9,0.60)]'>
                {companyItems[2]?.value}
              </p>
            </div>
            <div className='xsm:relative xsm:inset-auto xsm:translate-none absolute top-1/2 left-[5.68rem] -translate-y-1/2 space-y-[0.52083rem]'>
              <h3 className='font-open-sans xsm:text-[1.25rem] xsm:text-left mb-[0.52083rem] text-center text-[2.08333rem] leading-[120%] font-semibold tracking-[-0.03125rem] text-[#4280D8]'>
                {companyItems[3]?.label}
              </h3>
              <p className='font-open-sans xsm:text-[0.625rem] xsm:tracking-[-0.00625rem] xsm:text-left text-center text-[0.9375rem] leading-[150%] text-[rgba(9,9,9,0.60)]'>
                {companyItems[3]?.value}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='xsm:max-w-full xsm:px-[0.83333rem] xsm:py-[3.33333rem] mx-auto max-w-[75rem] pt-[4.17rem] pb-[4.16667rem]'>
        <h2 className='font-open-sans xsm:text-[1.25rem] xsm:mb-[1.46rem] mb-[2.5rem] text-[2.08333rem] leading-[120%] font-semibold tracking-[-0.03125rem] text-[#090909]'>
          {t('SubCompanyPage.companyList')}
        </h2>
        <div className='xsm:grid-cols-1 grid grid-cols-4 gap-[1.25rem]'>
          {companys.map((company) => (
            <CompanyCard
              title={company?.title}
              key={company?.id}
              description={company?.content}
              image={company?.featured_image?.url}
              link={'#'}
            />
          ))}
        </div>
      </div>
      <div className='bg-white'>
        <div className='xsm:max-w-full xsm:h-auto xsm:p-[3.33333rem_0.83333rem] mx-auto flex h-[8.59375rem] max-w-[75rem] items-center justify-between'>
          <Link
            href='#'
            className='font-open-sans xsm:text-[0.625rem] inline-flex items-center space-x-[0.3125rem] text-[0.83333rem] leading-[150%] text-[#D32F2F]'
          >
            <ICChevronDown className='xsm:size-[0.72917rem] size-[0.83333rem] shrink-0 rotate-90' />
            <span className='[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>Trang B</span>
          </Link>
          <Link
            href={locale === 'vi' ? ROUTES.aboutUsVi : ROUTES.aboutUsEn}
            className='font-open-sans xsm:text-[0.625rem] inline-flex items-center space-x-[0.3125rem] border-b border-b-[#D32F2F] py-[0.41667rem] text-[0.83333rem] leading-[150%] font-semibold text-[#D32F2F]'
          >
            {t('Breadcrumb.aboutUsPage')}
          </Link>
          <Link
            href='#'
            className='font-open-sans xsm:text-[0.625rem] inline-flex items-center space-x-[0.3125rem] text-[0.83333rem] leading-[150%] text-[#D32F2F]'
          >
            <span className='[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>Trang A</span>
            <ICChevronDown className='xsm:size-[0.72917rem] size-[0.83333rem] shrink-0 -rotate-90' />
          </Link>
        </div>
      </div>
    </>
  )
}
