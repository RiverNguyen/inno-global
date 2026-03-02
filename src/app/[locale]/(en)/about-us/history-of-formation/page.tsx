import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import SectionPagination from '@/components/shared/SectionPagination'
import ENDPOINTS from '@/configs/endpoints'
import ENV from '@/configs/env'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import BannerHistory from '@/modules/history-page/BannerHistory'
import IndexTimeline from '@/modules/history-page/timeline/index'
import historyService from '@/services/history'
import metadataValues from '@/utils/metadataValues'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const res = await getMetaDataRankMath(ENDPOINTS.history.rank_math[locale as keyof typeof ENDPOINTS.history.rank_math])
  return metadataValues(res, ENV.DOMAIN || '')
}

export default async function HistoryPage({ params }: { params: Promise<{ locale: string }> }) {
  const t = await getTranslations()
  const { locale } = await params
  const pageAcf = await historyService.getPageAcf(locale)
  const timeline = [
    ...(pageAcf?.acf?.timeline || []),
    {
      year: t('HistoryPage.continue'),
      description: '',
      image: null,
      isToBeContinued: true,
    },
  ]

  return (
    <main className='relative w-full'>
      <style>{`
        #footer {
          background-color: #fff;
        }
      `}</style>
      <BannerHistory banner={pageAcf?.acf?.banner} />
      <IndexTimeline timeline={timeline} />
      <SectionPagination
        className='bg-[#F0F0F0] py-[2.96875rem] mt-[6.75rem] xsm:mt-0'
        prev={{
          label: t('Breadcrumb.businessCulturePage'),
          href: `${locale === 'vi' ? '/ve-chung-toi/van-hoa-doanh-nghiep' : '/en/about-us/corporate-culture'}`,
        }}
        center={{
          label: t('Breadcrumb.aboutUsPage'),
          href: `${locale === 'vi' ? '/ve-chung-toi' : '/en/about-us'}`,
        }}
        next={{
          label: t('Breadcrumb.socialResponsibilityPage'),
          href: `${locale === 'vi' ? '/ve-chung-toi/trach-nhiem-xa-hoi' : '/en/about-us/social-responsibility'}`,
        }}
      />
    </main>
  )
}
