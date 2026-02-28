import { useTranslations } from 'next-intl'

import { ITermsOfUseAcfDataRes } from '@/interfaces/terms-of-use.interface'
import './styles.css'

export default function SectionTermsOfUse({ acfData }: { acfData: ITermsOfUseAcfDataRes }) {
  const t = useTranslations('TermsOfUsePage')
  return (
    <section className='xsm:px-[0.83333rem] xsm:space-y-0 relative mx-auto max-w-[75rem] space-y-[1.25rem]'>
      <div className='xsm:py-[2.08333rem] xsm:space-y-[0.83333rem] space-y-[1.25rem]'>
        <h1 className='text-primary/80 xsm:text-[1.35417rem] xsm:space-y-[1.35417rem] text-[2.8125rem] leading-[1.2] font-semibold tracking-[-0.02813rem]'>
          {acfData?.acf?.title || ''}
        </h1>
        <p className='text-primary/60 xsm:text-trim-both xsm:text-edge-[cap_alphabetic] xsm:text-[0.72917rem] text-[0.9375rem] leading-[1.5]'>
          {t('effectiveDate')} {acfData?.acf?.effective_date || ''}
        </p>
      </div>

      <div className='xsm:space-y-[1.66667rem] space-y-[2.08333rem]'>
        {Array.isArray(acfData?.acf?.term_list) &&
          acfData?.acf?.term_list?.map(({ term_title, term_content }, index) => (
            <article
              key={index}
              className='xsm:space-y-[0.9375rem] space-y-[0.83333rem]'
            >
              <h3 className='text-primary xsm:text-[0.83333rem] xsm:leading-[1.2] text-[1.25rem] leading-[1.5] font-semibold'>
                {term_title || ''}
              </h3>
              <div
                className='terms-of-use__content'
                dangerouslySetInnerHTML={{ __html: term_content || '' }}
              ></div>
            </article>
          ))}
      </div>
    </section>
  )
}
