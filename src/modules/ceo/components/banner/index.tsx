import { useTranslations } from 'next-intl'

import Breadcrumb from '@/components/shared/Breadcrumb'

export default function Banner({ aboutUsBasePath }: { aboutUsBasePath: string }) {
  const t = useTranslations()

  return (
    <div className='bg-white'>
      <div className='xsm:p-[1.66667rem_0.83333rem_0.83333rem_0.83333rem] mx-auto flex w-full max-w-[75rem] flex-col gap-[1.25rem] py-[2.08333rem]'>
        <Breadcrumb
          navItems={[
            { label: t('Breadcrumb.homePage'), href: '/' },
            { label: t('Breadcrumb.aboutUsPage'), href: aboutUsBasePath },
          ]}
          lastItem={{ label: t('LeadershipPage.ceoMessage') }}
          classNameContainer='xsm:hidden'
        />

        <h1 className='font-open-sans xsm:text-[#090909] xsm:text-[1.35417rem] text-[2.8125rem] leading-[120%] font-semibold tracking-[-0.02813rem] text-[rgba(9,9,9,0.80)]'>
          {t('LeadershipPage.ceoMessage')}
        </h1>
      </div>
    </div>
  )
}
