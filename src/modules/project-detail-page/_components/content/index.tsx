'use client'
import { useTranslations } from 'next-intl'
// import dynamic from 'next/dynamic'

import './style.css'
import ShareSection from '@/modules/project-detail-page/_components/share/index'

// sửa lỗi ssr
// const ShareSticky = dynamic(() => import('@/modules/project-detail-page/_components/share-sticky/index'), {
//   ssr: false,
// })

function wrapTablesInWrapper(html: string) {
  return html.replace(/<table(?=\s|>)/gi, '<div class="table-wrapper"><table').replace(/<\/table>/gi, '</table></div>')
}

const Content = ({ content }: { content: string }) => {
  const t = useTranslations('DetailProjectPage')
  return (
    <section className='xsm:p-[2.4rem_0.8275rem] xsm:bg-[#F5F5F5] xsm:overflow-hidden relative p-[6.25rem_0] '>
      <div
        className='xsm:hidden absolute top-0 left-0 h-[10.36458rem] w-full opacity-15'
        style={{
          background: 'linear-gradient(180deg, #D9D9D9 0%, rgba(255, 255, 255, 0.00) 71.88%)',
        }}
      />
      <div
        className='xsm:hidden absolute bottom-0 left-0 h-[10.36458rem] w-full opacity-15'
        style={{
          background: 'linear-gradient(0deg, #D9D9D9 0%, rgba(255, 255, 255, 0.00) 71.88%)',
        }}
      />

      <h2 className='xsm:text-[1.25rem] max-w-[75rem] mx-auto relative mb-[2.08rem] text-[2.083rem] leading-[1.2] font-semibold tracking-[-0.03125rem] text-[#090909]'>
        {t('learnMore')}
      </h2>

      <div className='xsm:space-x-0 relative max-w-[75rem] mx-auto'>
        <article
          id='project_detail'
          dangerouslySetInnerHTML={{ __html: wrapTablesInWrapper(content || '') }}
        />
        {/* <div className='hidden sm:block'>
          <ShareSticky />
        </div> */}
        <ShareSection />
      </div>
    </section>
  )
}

export default Content
