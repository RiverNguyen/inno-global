import Image from 'next/image'
import Link from 'next/link'

const boardOfDirectors = [
  {
    name: 'Lê Thanh Sơn',
    position: 'Chủ Tịch Hội Đồng',
    image: '/leadership/d-leadership-1.webp',
  },
  {
    name: 'Lê Thanh Sơn',
    position: 'Chủ Tịch Hội Đồng',
    image: '/leadership/d-leadership-2.webp',
  },
  {
    name: 'Lê Thanh Sơn',
    position: 'Chủ Tịch Hội Đồng',
    image: '/leadership/d-leadership-3.webp',
  },
  {
    name: 'Lê Thanh Sơn',
    position: 'Chủ Tịch Hội Đồng',
    image: '/leadership/d-leadership-4.webp',
  },
  {
    name: 'Lê Thanh Sơn',
    position: 'Chủ Tịch Hội Đồng',
    image: '/leadership/d-leadership-1.webp',
  },
  {
    name: 'Lê Thanh Sơn',
    position: 'Chủ Tịch Hội Đồng',
    image: '/leadership/d-leadership-2.webp',
  },
  {
    name: 'Lê Thanh Sơn',
    position: 'Chủ Tịch Hội Đồng',
    image: '/leadership/d-leadership-3.webp',
  },
]

const BoardSection = ({
  title,
  directors,
}: {
  title: string
  directors: typeof boardOfDirectors
}) => (
  <div className='xsm:gap-[1.25rem] flex flex-col gap-[3.33333rem]'>
    <h2 className='font-open-sans xsm:text-[1.04167rem] xsm:leading-[150%] text-center text-[1.875rem] leading-[1.35417rem] font-semibold text-[rgba(9,9,9,0.80)]'>
      {title}
    </h2>
    <div className='xsm:gap-y-[0.625rem] xsm:gap-x-[0.83333rem] flex flex-wrap justify-center gap-x-[1.77rem] gap-y-[3.33333rem]'>
      {directors.map((director, index) => (
        <Link
          href=''
          key={index}
          className='xsm:w-[8.5112rem] relative w-[17.34375rem]'
        >
          <Image
            src='/leadership/overlay.webp'
            alt='overlay'
            width={333}
            height={439}
            className='xsm:h-[11.22047rem] absolute top-0 left-0 h-[22.86458rem] w-full object-cover'
          />
          <Image
            src={director.image}
            alt={director.name}
            width={333}
            height={439}
            className='xsm:h-[11.22047rem] relative h-[22.86458rem] w-full object-cover'
          />
          <div className='xsm:py-[0.52083rem] xsm:px-[0.625rem] flex flex-col gap-[0.39333rem] bg-[#F0F0F0] py-[1.25rem] pr-[1.45833rem] pl-[1.25rem]'>
            <h3 className='font-open-sans xsm:text-[0.72917rem] text-[1.25rem] leading-[150%] font-semibold text-[#090909]'>
              {director.name}
            </h3>
            <div className='xsm:gap-[0.19302rem] flex items-center gap-[0.39333rem]'>
              <Image
                src='/leadership/icon-user.webp'
                alt='user'
                width={20}
                height={20}
                className='xsm:size-[0.625rem] size-[1.04896rem]'
              />
              <span className='font-open-sans xsm:text-[0.625rem] text-[0.9375rem] leading-[150%] text-[rgba(9,9,9,0.60)]'>
                {director.position}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
)

export default function BoardOfDirectors() {
  return (
    <>
      <div className='xsm:gap-[1.66667rem] xsm:px-[0.83333rem] xsm:pb-0 xsm:pt-[1.66667rem] mx-auto flex w-full max-w-[74.6875rem] flex-col gap-[5rem] py-[4.16667rem]'>
        {/* Hội đồng quản trị */}
        <BoardSection
          title='Hội đồng Quản trị'
          directors={boardOfDirectors}
        />

        {/* Ban giám đốc */}
        <BoardSection
          title='Ban Giám đốc'
          directors={boardOfDirectors}
        />
      </div>

      {/* Pagination */}
      <div className='xsm:py-[3.33333rem] xsm:px-[0.83333rem] bg-white py-[2.96875rem]'>
        <div className='mx-auto flex w-full max-w-[75.1rem] items-center justify-between'>
          <Link
            href=''
            type='button'
            className='flex cursor-pointer items-center gap-[0.3125rem]'
          >
            <ICArrowLeft className='xsm:size-[0.625rem] size-[0.83333rem]' />
            <span className='font-open-sans xsm:text-[0.625rem] text-[0.83333rem] leading-[150%] text-[#D32F2F] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>
              Trang B
            </span>
          </Link>

          <Link
            href=''
            className='font-open-sans xsm:text-[0.625rem] xsm:leading-[150%] xsm:tracking-normal flex items-center justify-center border-b border-[#D32F2F] py-[0.41667rem] text-[0.83333rem] leading-[130%] font-semibold tracking-[-0.00833rem] text-[#D32F2F]'
          >
            Về chúng tôi
          </Link>

          <Link
            href=''
            type='button'
            className='flex cursor-pointer items-center gap-[0.375rem]'
          >
            <span className='font-open-sans xsm:text-[0.625rem] text-[0.83333rem] leading-[150%] text-[#D32F2F] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'>
              Trang A
            </span>
            <ICArrowLeft className='h-[1rem] w-[1rem] rotate-180' />
          </Link>
        </div>
      </div>
    </>
  )
}

const ICArrowLeft = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      {...props}
    >
      <path
        d='M6.38016 3.95312L2.3335 7.99979L6.38016 12.0465'
        stroke='#D32F2F'
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
