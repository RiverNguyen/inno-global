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

const BoardSection = ({ title, directors }: { title: string; directors: typeof boardOfDirectors }) => (
  <div className="flex flex-col gap-[3.33333rem] xsm:gap-[1.25rem]">
    <h2 className="text-[rgba(9,9,9,0.80)] font-open-sans text-[1.875rem] font-semibold text-center leading-[1.35417rem] xsm:text-[1.04167rem] xsm:leading-[150%]">
      {title}
    </h2>
    <div className="flex flex-wrap justify-center gap-y-[3.33333rem] gap-x-[1.77rem] xsm:gap-y-[0.625rem] xsm:gap-x-[0.83333rem]">
      {directors.map((director, index) => (
        <Link href='' key={index} className="relative w-[17.34375rem] xsm:w-[8.5112rem]">
          <Image
            src='/leadership/overlay.webp'
            alt="overlay"
            width={333}
            height={439}
            className="w-full h-[22.86458rem] object-cover absolute top-0 left-0 xsm:h-[11.22047rem]"
          />
          <Image
            src={director.image}
            alt={director.name}
            width={333}
            height={439}
            className="w-full h-[22.86458rem] object-cover relative xsm:h-[11.22047rem]"
          />
          <div className="py-[1.25rem] pl-[1.25rem] pr-[1.45833rem] bg-[#F0F0F0] flex flex-col gap-[0.39333rem] xsm:py-[0.52083rem] xsm:px-[0.625rem]">
            <h3 className="text-[#090909] font-open-sans text-[1.25rem] font-semibold leading-[150%] xsm:text-[0.72917rem]">
              {director.name}
            </h3>
            <div className="flex items-center gap-[0.39333rem] xsm:gap-[0.19302rem]">
              <Image
                src='/leadership/icon-user.webp'
                alt="user"
                width={20}
                height={20}
                className="size-[1.04896rem] xsm:size-[0.625rem]"
              />
              <span className="text-[rgba(9,9,9,0.60)] font-open-sans text-[0.9375rem] leading-[150%] xsm:text-[0.625rem]">
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
      <div className="max-w-[74.6875rem] mx-auto flex flex-col gap-[5rem] py-[4.16667rem] xsm:gap-[1.66667rem] xsm:px-[0.83333rem] xsm:pb-0 xsm:pt-[1.66667rem]">
        {/* Hội đồng quản trị */}
        <BoardSection title="Hội đồng Quản trị" directors={boardOfDirectors} />

        {/* Ban giám đốc */}
        <BoardSection title="Ban Giám đốc" directors={boardOfDirectors} />
      </div>

      {/* Pagination */}
      <div className="bg-white py-[2.96875rem] xsm:py-[3.33333rem] xsm:px-[0.83333rem]">
        <div className="flex max-w-[75.1rem] mx-auto justify-between items-center">
          <Link href='' type="button" className="flex items-center gap-[0.3125rem] cursor-pointer">
            <ICArrowLeft className="size-[0.83333rem] xsm:size-[0.625rem]" />
            <span className="text-[#D32F2F] font-open-sans text-[0.83333rem] leading-[150%] [text-box-trim:trim-both] [text-box-edge:cap_alphabetic] xsm:text-[0.625rem]">Trang B</span>
          </Link>

          <Link href='' className="flex-center py-[0.41667rem] border-b border-[#D32F2F] text-[#D32F2F] font-open-sans text-[0.83333rem] font-semibold leading-[130%] tracking-[-0.00833rem] xsm:text-[0.625rem] xsm:leading-[150%] xsm:tracking-normal">
            Về chúng tôi
          </Link>

          <Link href='' type="button" className="flex items-center gap-[0.375rem] cursor-pointer">
            <span className="text-[#D32F2F] font-open-sans text-[0.83333rem] leading-[150%] [text-box-trim:trim-both] [text-box-edge:cap_alphabetic] xsm:text-[0.625rem]">Trang A</span>
            <ICArrowLeft className="w-[1rem] h-[1rem] rotate-180" />
          </Link>
        </div>
      </div>

    </>
  )
}

const ICArrowLeft = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <path d="M6.38016 3.95312L2.3335 7.99979L6.38016 12.0465" stroke="#D32F2F" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
