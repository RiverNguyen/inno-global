import { ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'

import { Link } from '@/i18n/navigation'
import { IBDOurOffice } from '@/interfaces/business-data.interface'

const OfficeBusinessData = ({ acfOurOffice }: { acfOurOffice: IBDOurOffice }) => {
  return (
    <section className='xsm:h-auto h-[46.77083rem] bg-[#EFEFEF]'>
      <div className='max-w-[75rem] h-full mx-auto'>
        <div className='xsm:py-[2.5rem] flex w-full xsm:flex-col h-full justify-center items-center'>
          <div className='xsm:w-auto xsm:mr-0 xsm:px-[0.83rem] w-[40.15625rem] mr-[5.31rem]'>
            <h3 className='xsm:mb-[1.25rem] xsm:mb-header-h1-26-semi text-[2.8125rem] line-clamp-1 text-[#000000] font-semibold leading-[3.375rem] tracking-[0.01406rem] mb-[1.66667rem]'>
              {acfOurOffice.tittle}
            </h3>
            <p className='xsm:mb-[1.25rem] xsm:mb-body-14-r pc-body-18-r-primary text-[#090909]/80 mb-[1.66667rem] max-h-[30rem] overflow-auto'>
              {acfOurOffice.desc}
            </p>
            <Link
              href={acfOurOffice.link.url}
              target={acfOurOffice.link.target}
              className='flex-center group relative h-[2.6rem] w-fit overflow-hidden rounded-[5.20833rem] px-[1.15rem] text-[0.73rem] leading-[1.5] text-[#090909]/60 outline outline-[#090909]/60 transition-all duration-300 hover:text-white hover:outline-none xsm:h-[2.083rem] xsm:mb-[2.08rem]'
            >
              <span className='absolute inset-0 rounded-[inherit] bg-[radial-gradient(298.39%_130.99%_at_6.62%_16.15%,_#CA2A2A_15.19%,_#D32F2F_53.77%,_#FF6E6E_100%)] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100' />
              <span className='flex-center relative z-10'>
                {acfOurOffice.link.title}
                <ChevronRightIcon className='ml-1.25 size-[0.83333rem] translate-y-[0.0375rem] text-[#090909]/60 transition-all duration-300 group-hover:translate-x-[0.5rem] group-hover:text-white' />
              </span>
            </Link>
          </div>
          <Image
            className='xsm:px-[0.83333rem] xsm:h-[23.87448rem] w-[28.17708rem] h-[37.65625rem]'
            src={acfOurOffice.image}
            alt=''
            width={541}
            height={723}
          ></Image>
        </div>
      </div>
    </section>
  )
}

export default OfficeBusinessData
