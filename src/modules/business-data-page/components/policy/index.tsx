import { Link } from '@/i18n/navigation'
import { IBDOurPolicy } from '@/interfaces/business-data.interface'

const PolicyBusinessData = ({ acfOurPolicy }: { acfOurPolicy: IBDOurPolicy }) => {
  return (
    <section className='xsm:py-[2.08333rem] py-[3.75rem] '>
      <div className='xsm:px-[0.83333rem] xsm:py-0 max-w-[75rem] mx-auto pt-[0.72917rem] pb-[3.95833rem]'>
        <h3 className='xsm:mb-header-h1-26-semi pc-h3-40-s line-clamp-1'>{acfOurPolicy.title}</h3>
        <p className='xsm:mb-[1.45833rem] xsm:mb-body-14-r text-[#090909]/80 pc-body-18-r-primary mb-[2.6rem] mt-[1.04rem] line-clamp-5'>
          {acfOurPolicy.desc}
        </p>
        <div className='xsm:flex-wrap xsm:pb-[0.72917rem] flex w-full '>
          {acfOurPolicy.link_repeat.map((policy, index) => {
            return (
              <Link
                key={index}
                href={policy.link.url}
                target={policy.link.target}
                className='group xsm:pb-0 xsm:pt-[0.72917rem] xsm:border-b-0 xsm:border-t-1 xsm:even:mr-0 xsm:even:mb-[1.04167rem] xsm:w-[8.41rem] xsm:mr-[1.04167rem] xsm:flex-none flex-1 mr-[1.66667rem] pb-[0.83333rem] border-b-1 border-[#090909]/12'
              >
                <div className='flex items-center'>
                  <svg
                    className=' xsm:size-[0.625rem] size-[1.04167rem] mr-[0.73rem]'
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    viewBox='0 0 20 20'
                    fill='none'
                  >
                    <path
                      d='M11.8732 10L14.5775 10.0084L11.875 10L6.91719 4.70512L8.0957 3.52661L14.5775 10.0084L8.0957 16.4902L6.91719 15.3117L11.8732 10Z'
                      fill='#090909'
                    />
                  </svg>
                  <p
                    className='relative inline-block xsm:text-[0.625rem] pc-body-18-m-primary
                      after:absolute after:left-0 after:top-[calc(100%+0.125rem)] after:h-[0.125rem] after:w-full after:origin-left after:scale-x-0 after:bg-[#D32F2F] after:transition-transform after:duration-300 after:ease-out
                      group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100'
                  >
                    {policy.link.title}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default PolicyBusinessData
