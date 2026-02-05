import Image from 'next/image'
import Link from 'next/link'

const services = [
  {
    title: 'Kiến trúc (Architecture)',
    image: '/services/d-service-1.webp',
    description:
      'INNO cung cấp giải pháp kiến trúc toàn diện, kết hợp hài hòa giữa công năng, thẩm mỹ và sự phù hợp với bối cảnh. Mỗi dự án được nghiên cứu kỹ lưỡng từ ý tưởng, không gian, vật liệu đến trải nghiệm sử dụng. Chúng tôi hướng tới những thiết kế bền vững, tinh gọn và mang dấu ấn riêng của chủ đầu tư. Mục tiêu cuối cùng là tạo nên không gian sống và làm việc thực sự hiệu quả và truyền cảm hứng.',
  },
  {
    title: 'Kết cấu (Structural Engineering)',
    image: '/services/d-service-2.webp',
    description:
      'INNO cung cấp giải pháp kết cấu toàn diện, kết hợp hài hòa giữa công năng, thẩm mỹ và sự phù hợp với bối cảnh. Mỗi dự án được nghiên cứu kỹ lưỡng từ ý tưởng, không gian, vật liệu đến trải nghiệm sử dụng. Chúng tôi hướng tới những thiết kế bền vững, tinh gọn và mang dấu ấn riêng của chủ đầu tư. Mục tiêu cuối cùng là tạo nên không gian sống và làm việc thực sự hiệu quả và truyền cảm hứng.',
  },
  {
    title: 'MEP - Cơ điện',
    image: '/services/d-service-3.webp',
    description:
      'INNO cung cấp giải pháp MEP toàn diện, kết hợp hài hòa giữa công năng, thẩm mỹ và sự phù hợp với bối cảnh. Mỗi dự án được nghiên cứu kỹ lưỡng từ ý tưởng, không gian, vật liệu đến trải nghiệm sử dụng. Chúng tôi hướng tới những thiết kế bền vững, tinh gọn và mang dấu ấn riêng của chủ đầu tư. Mục tiêu cuối cùng là tạo nên không gian sống và làm việc thực sự hiệu quả và truyền cảm hứng.',
  },
  {
    title: 'Kiến trúc (Architecture)',
    image: '/services/d-service-4.webp',
    description:
      'INNO cung cấp giải pháp kiến trúc toàn diện, kết hợp hài hòa giữa công năng, thẩm mỹ và sự phù hợp với bối cảnh. Mỗi dự án được nghiên cứu kỹ lưỡng từ ý tưởng, không gian, vật liệu đến trải nghiệm sử dụng. Chúng tôi hướng tới những thiết kế bền vững, tinh gọn và mang dấu ấn riêng của chủ đầu tư. Mục tiêu cuối cùng là tạo nên không gian sống và làm việc thực sự hiệu quả và truyền cảm hứng.',
  },
  {
    title: 'Kiến trúc (Architecture)',
    image: '/services/d-service-5.webp',
    description:
      'INNO cung cấp giải pháp kiến trúc toàn diện, kết hợp hài hòa giữa công năng, thẩm mỹ và sự phù hợp với bối cảnh. Mỗi dự án được nghiên cứu kỹ lưỡng từ ý tưởng, không gian, vật liệu đến trải nghiệm sử dụng. Chúng tôi hướng tới những thiết kế bền vững, tinh gọn và mang dấu ấn riêng của chủ đầu tư. Mục tiêu cuối cùng là tạo nên không gian sống và làm việc thực sự hiệu quả và truyền cảm hứng.',
  },
  {
    title: 'Kiến trúc (Architecture)',
    image: '/services/d-service-6.webp',
    description:
      'INNO cung cấp giải pháp kiến trúc toàn diện, kết hợp hài hòa giữa công năng, thẩm mỹ và sự phù hợp với bối cảnh. Mỗi dự án được nghiên cứu kỹ lưỡng từ ý tưởng, không gian, vật liệu đến trải nghiệm sử dụng. Chúng tôi hướng tới những thiết kế bền vững, tinh gọn và mang dấu ấn riêng của chủ đầu tư. Mục tiêu cuối cùng là tạo nên không gian sống và làm việc thực sự hiệu quả và truyền cảm hứng.',
  },
  {
    title: 'Kiến trúc (Architecture)',
    image: '/services/d-service-7.webp',
    description:
      'INNO cung cấp giải pháp kiến trúc toàn diện, kết hợp hài hòa giữa công năng, thẩm mỹ và sự phù hợp với bối cảnh. Mỗi dự án được nghiên cứu kỹ lưỡng từ ý tưởng, không gian, vật liệu đến trải nghiệm sử dụng. Chúng tôi hướng tới những thiết kế bền vững, tinh gọn và mang dấu ấn riêng của chủ đầu tư. Mục tiêu cuối cùng là tạo nên không gian sống và làm việc thực sự hiệu quả và truyền cảm hứng.',
  },
  {
    title: 'Kiến trúc (Architecture)',
    image: '/services/d-service-8.webp',
    description:
      'INNO cung cấp giải pháp kiến trúc toàn diện, kết hợp hài hòa giữa công năng, thẩm mỹ và sự phù hợp với bối cảnh. Mỗi dự án được nghiên cứu kỹ lưỡng từ ý tưởng, không gian, vật liệu đến trải nghiệm sử dụng. Chúng tôi hướng tới những thiết kế bền vững, tinh gọn và mang dấu ấn riêng của chủ đầu tư. Mục tiêu cuối cùng là tạo nên không gian sống và làm việc thực sự hiệu quả và truyền cảm hứng.',
  },
]

export default function List() {
  return (
    <section className='xsm:pt-[1.45833rem] xsm:pb-[3.33333rem] xsm:px-[0.83333rem] mx-auto w-full max-w-[75rem] py-[6.25rem]'>
      <div className='xsm:gap-[0.3125rem] grid grid-cols-2 gap-[1.66667rem]'>
        {services.map((service, index) => (
          <Link
            href=''
            key={index}
            className='group xsm:rounded-[0.20833rem] xsm:h-[5.29167rem] relative flex h-[23.69792rem] flex-col overflow-hidden'
          >
            <Image
              src={service.image}
              alt={service.title}
              width={704}
              height={400}
              className='min-h-0 w-[full] flex-1 object-cover'
            />
            <div className='absolute inset-0 bg-[linear-gradient(180deg,#000_47.12%,rgba(29,29,29,0.72)_71.63%,rgba(102,102,102,0.00)_100%)] opacity-46 sm:hidden'></div>
            <div className='xsm:absolute xsm:bottom-[1.32135rem] xsm:left-0 xsm:w-full xsm:bg-transparent xsm:py-[0.20833rem] xsm:px-[0.41667rem] xsm:justify-start xsm:gap-[0.41667rem] flex flex-col justify-center bg-[#F0F0F0] p-[1.45833rem]'>
              <div className='flex items-center justify-between'>
                <h3 className='font-open-sans xsm:line-clamp-2 xsm:text-white xsm:text-[0.72917rem] xsm:flex-1 line-clamp-1 text-[1.25rem] leading-[150%] font-semibold text-[#090909] transition-colors duration-500 ease-[cubic-bezier(0.41,0.01,0,1)] group-hover:text-[#D32F2F]'>
                  {service.title}
                </h3>
                <div className='xsm:hidden flex items-center justify-center rounded-full bg-[rgba(9,9,9,0.10)] p-[0.46875rem] backdrop-blur-[20px]'>
                  <IconChevronRight className='size-[0.83333rem]' />
                </div>
                <IconArrowRight className='xsm:block hidden size-[0.72917rem]' />
              </div>
              <div className='xsm:hidden grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-[cubic-bezier(0.41,0.01,0,1)] group-hover:grid-rows-[1fr] group-hover:opacity-90'>
                <div className='min-h-0 overflow-hidden'>
                  <p className='font-open-sans pt-[0.52083rem] text-[0.83333rem] leading-[150%] tracking-[-0.01667rem] text-[rgba(9,9,9,0.60)]'>
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

const IconChevronRight = (props: React.SVGProps<SVGSVGElement>) => {
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
        d='M6 13L11.0002 7.88114L6 3'
        stroke='#090909'
        strokeWidth='1.2'
      />
    </svg>
  )
}

const IconArrowRight = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='14'
      height='14'
      viewBox='0 0 14 14'
      fill='none'
      {...props}
    >
      <path
        d='M9.72134 7.58901L2.62093 7.58902L2.62093 6.42253L9.72093 6.42211L6.59228 3.29346L7.41723 2.4685L11.9545 7.00577L7.41723 11.543L6.59227 10.7181L9.72134 7.58901Z'
        fill='white'
      />
    </svg>
  )
}
