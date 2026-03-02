import Image from 'next/image'
import Link from 'next/link'

import { IFooter } from '@/layouts/footer/footer'

const FooterDashboard = ({ data }: { data: IFooter }) => {
  return (
    <div className='bg-[#f0f0f0] p-[1.25rem_12.5rem] xsm:p-[0.83rem]'>
      <div className='flex items-center justify-between xsm:flex-col xsm:items-start'>
        <div className='flex items-center space-x-[0.89rem] xsm:space-x-[0.625rem]'>
          {data?.socials?.items?.map((item, index) => (
            <Link
              href={item?.link?.url || ''}
              target={'_blank'}
              key={index}
              className='block'
            >
              <Image
                src={item?.icon?.url || ''}
                alt={item?.icon?.alt || ''}
                width={40}
                height={40}
                className='size-[2.08333rem] object-contain xsm:size-[1.67rem]'
              />
            </Link>
          ))}
        </div>
        <div className='flex flex-col items-end xsm:mt-[1.04rem] xsm:items-start'>
          <div className='flex'>
            {data?.menu_column_3?.items?.map((item, index) => (
              <Link
                href={item?.link?.url || ''}
                target={'_blank'}
                key={index}
                className='block text-[#090909] text-[0.625rem] leading-[1.4] font-semibold tracking-[-0.00625rem] xsm:leading-[1.5] xsm:font-medium'
              >
                {item?.link?.title}
                {index < (data?.menu_column_3?.items?.length || 0) - 1 && (
                  <span className='mx-[0.83rem] xsm:opacity-15'>|</span>
                )}
              </Link>
            ))}
          </div>
          <p className='text-[#090909]/60 text-[0.625rem] leading-[1.4] tracking-[-0.00625rem] mt-[0.68rem] xsm:mt-[0.62rem] xsm:font-medium xsm:tracking-[-0.0125rem] xsm:leading-[1.2]'>
            {data?.copyright}
          </p>
        </div>
      </div>
    </div>
  )
}

export default FooterDashboard
