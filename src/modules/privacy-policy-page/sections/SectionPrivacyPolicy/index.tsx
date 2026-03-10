import { useTranslations } from 'next-intl'

import { IPrivacyPolicyAcfDataRes } from '@/interfaces/privacy-policy.interface'

import './styles.css'

export default function SectionPrivacyPolicy({ acfData }: { acfData: IPrivacyPolicyAcfDataRes }) {
  const t = useTranslations('PrivacyPolicyPage')
  return (
    <section className='xsm:px-[0.83333rem] xsm:space-y-0 relative mx-auto max-w-[75rem] space-y-[1.25rem]'>
      <div className='xsm:py-[2.08333rem] xsm:space-y-[0.83333rem] space-y-[1.25rem]'>
        <h1 className='text-primary/80 xsm:mb-h2-24-sm xsm:space-y-[1.35417rem] pc-h2-54-s'>
          {acfData?.acf?.title || ''}
        </h1>
        <p className='text-primary/60 xsm:text-trim-both xsm:text-edge-[cap_alphabetic] xsm:text-[0.72917rem] pc-body-18-r-primary'>
          {t('effectiveDate')} {acfData?.acf?.effective_date || ''}
        </p>
      </div>

      <div className='xsm:space-y-[1.66667rem] space-y-[2.08333rem]'>
        {Array.isArray(acfData?.acf?.policy_list) &&
          acfData?.acf?.policy_list?.map(({ policy_title, policy_content }, index) => (
            <article
              key={index}
              className='xsm:space-y-[0.9375rem] space-y-[0.83333rem]'
            >
              <h3 className='text-primary xsm:text-[0.83333rem] xsm:leading-[1.2] pc-24-24-semi'>
                {policy_title || ''}
              </h3>
              <div
                dangerouslySetInnerHTML={{ __html: policy_content || '' }}
                className='privacy-policy__content'
              ></div>
            </article>
          ))}
      </div>
    </section>
  )
}
