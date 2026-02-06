import { useTranslations } from 'next-intl'

import Breadcrumb from '@/components/shared/Breadcrumb'

export default function Banner() {
  const t = useTranslations()

  return (
    <div className='bg-white'>
      <div className='xsm:p-[1.66667rem_0.83333rem_0.83333rem_0.83333rem] xsm:shadow-[0_4px_30px_0_rgba(0,0,0,0.08)] mx-auto flex w-full max-w-[75rem] flex-col gap-[1.25rem] pt-[3.125rem] pb-[2.08333rem]'>
        {/* Breadcrumb */}
        <Breadcrumb
          navItems={[
            { label: t('Breadcrumb.homePage'), href: '/' },
            { label: t('Breadcrumb.aboutUsPage'), href: '/about' },
          ]}
          lastItem={{ label: t('LeadershipPage.title') }}
          classNameContainer="xsm:hidden"
        />

        <h1 className="text-[rgba(9,9,9,0.80)] font-open-sans text-[2.8125rem] font-semibold leading-[120%] tracking-[-0.02813rem] xsm:text-[#090909] xsm:text-[1.35417rem]">
          {t('LeadershipPage.title')}
        </h1>
      </div>
    </div>
  )
}
