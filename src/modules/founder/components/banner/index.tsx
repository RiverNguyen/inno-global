import { useTranslations } from 'next-intl'

import Breadcrumb from '@/components/shared/Breadcrumb'

export default function Banner({
  aboutUsBasePath,
  leadershipHref,
  bannerTitle,
}: {
  aboutUsBasePath: string
  leadershipHref: string
  bannerTitle?: string
}) {
  const t = useTranslations()

  const title = bannerTitle || t('FounderPage.ceoMessage')

  return (
    <div className='bg-white'>
      <div className='xsm:p-[1.66667rem_0.83333rem_0.83333rem_0.83333rem] mx-auto flex w-full max-w-[75rem] flex-col gap-[1.25rem] py-[2.08333rem]'>
        <Breadcrumb
          navItems={[
            { label: t('Breadcrumb.homePage'), href: '/' },
            { label: t('Breadcrumb.aboutUsPage'), href: aboutUsBasePath },
            { label: t('LeadershipPage.title'), href: leadershipHref },
          ]}
          lastItem={{ label: title }}
          classNameContainer='xsm:hidden'
        />

        <h1 className='font-open-sans xsm:text-[#090909] xsm:mb-h2-24-sm pc-h2-54-s text-[rgba(9,9,9,0.80)]'>
          {title}
        </h1>
      </div>
    </div>
  )
}
