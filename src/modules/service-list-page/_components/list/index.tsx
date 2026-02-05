import Image from 'next/image'
import Link from 'next/link'

const services = [
  {
    title: 'Kiến trúc (Architecture)',
    image: '/services/d-service-1.webp',
    description: 'INNO cung cấp giải pháp kiến trúc toàn diện, kết hợp hài hòa giữa công năng, thẩm mỹ và sự phù hợp với bối cảnh. Mỗi dự án được nghiên cứu kỹ lưỡng từ ý tưởng, không gian, vật liệu đến trải nghiệm sử dụng. Chúng tôi hướng tới những thiết kế bền vững, tinh gọn và mang dấu ấn riêng của chủ đầu tư. Mục tiêu cuối cùng là tạo nên không gian sống và làm việc thực sự hiệu quả và truyền cảm hứng.',
  },
  {
    title: 'Kết cấu (Structural Engineering)',
    image: '/services/d-service-2.webp',
    description: 'INNO cung cấp giải pháp kết cấu toàn diện, kết hợp hài hòa giữa công năng, thẩm mỹ và sự phù hợp với bối cảnh. Mỗi dự án được nghiên cứu kỹ lưỡng từ ý tưởng, không gian, vật liệu đến trải nghiệm sử dụng. Chúng tôi hướng tới những thiết kế bền vững, tinh gọn và mang dấu ấn riêng của chủ đầu tư. Mục tiêu cuối cùng là tạo nên không gian sống và làm việc thực sự hiệu quả và truyền cảm hứng.',
  },
  {
    title: 'MEP - Cơ điện',
    image: '/services/d-service-3.webp',
    description: 'INNO cung cấp giải pháp MEP toàn diện, kết hợp hài hòa giữa công năng, thẩm mỹ và sự phù hợp với bối cảnh. Mỗi dự án được nghiên cứu kỹ lưỡng từ ý tưởng, không gian, vật liệu đến trải nghiệm sử dụng. Chúng tôi hướng tới những thiết kế bền vững, tinh gọn và mang dấu ấn riêng của chủ đầu tư. Mục tiêu cuối cùng là tạo nên không gian sống và làm việc thực sự hiệu quả và truyền cảm hứng.',
  },
  {
    title: 'Kiến trúc (Architecture)',
    image: '/services/d-service-4.webp',
    description: 'INNO cung cấp giải pháp kiến trúc toàn diện, kết hợp hài hòa giữa công năng, thẩm mỹ và sự phù hợp với bối cảnh. Mỗi dự án được nghiên cứu kỹ lưỡng từ ý tưởng, không gian, vật liệu đến trải nghiệm sử dụng. Chúng tôi hướng tới những thiết kế bền vững, tinh gọn và mang dấu ấn riêng của chủ đầu tư. Mục tiêu cuối cùng là tạo nên không gian sống và làm việc thực sự hiệu quả và truyền cảm hứng.',
  },
  {
    title: 'Kiến trúc (Architecture)',
    image: '/services/d-service-5.webp',
    description: 'INNO cung cấp giải pháp kiến trúc toàn diện, kết hợp hài hòa giữa công năng, thẩm mỹ và sự phù hợp với bối cảnh. Mỗi dự án được nghiên cứu kỹ lưỡng từ ý tưởng, không gian, vật liệu đến trải nghiệm sử dụng. Chúng tôi hướng tới những thiết kế bền vững, tinh gọn và mang dấu ấn riêng của chủ đầu tư. Mục tiêu cuối cùng là tạo nên không gian sống và làm việc thực sự hiệu quả và truyền cảm hứng.',
  },
  {
    title: 'Kiến trúc (Architecture)',
    image: '/services/d-service-6.webp',
    description: 'INNO cung cấp giải pháp kiến trúc toàn diện, kết hợp hài hòa giữa công năng, thẩm mỹ và sự phù hợp với bối cảnh. Mỗi dự án được nghiên cứu kỹ lưỡng từ ý tưởng, không gian, vật liệu đến trải nghiệm sử dụng. Chúng tôi hướng tới những thiết kế bền vững, tinh gọn và mang dấu ấn riêng của chủ đầu tư. Mục tiêu cuối cùng là tạo nên không gian sống và làm việc thực sự hiệu quả và truyền cảm hứng.',
  },
  {
    title: 'Kiến trúc (Architecture)',
    image: '/services/d-service-7.webp',
    description: 'INNO cung cấp giải pháp kiến trúc toàn diện, kết hợp hài hòa giữa công năng, thẩm mỹ và sự phù hợp với bối cảnh. Mỗi dự án được nghiên cứu kỹ lưỡng từ ý tưởng, không gian, vật liệu đến trải nghiệm sử dụng. Chúng tôi hướng tới những thiết kế bền vững, tinh gọn và mang dấu ấn riêng của chủ đầu tư. Mục tiêu cuối cùng là tạo nên không gian sống và làm việc thực sự hiệu quả và truyền cảm hứng.',
  },
  {
    title: 'Kiến trúc (Architecture)',
    image: '/services/d-service-8.webp',
    description: 'INNO cung cấp giải pháp kiến trúc toàn diện, kết hợp hài hòa giữa công năng, thẩm mỹ và sự phù hợp với bối cảnh. Mỗi dự án được nghiên cứu kỹ lưỡng từ ý tưởng, không gian, vật liệu đến trải nghiệm sử dụng. Chúng tôi hướng tới những thiết kế bền vững, tinh gọn và mang dấu ấn riêng của chủ đầu tư. Mục tiêu cuối cùng là tạo nên không gian sống và làm việc thực sự hiệu quả và truyền cảm hứng.',
  },
]

export default function List() {
  return (
    <section className="w-full max-w-[75rem] mx-auto py-[6.25rem] xsm:pt-[1.45833rem] xsm:pb-[3.33333rem] xsm:px-[0.83333rem]">
      <div className="grid grid-cols-2 gap-[1.66667rem] xsm:gap-[0.3125rem]">
        {services.map((service, index) => (
          <Link href='' key={index} className="relative flex flex-col h-[23.69792rem] overflow-hidden group xsm:rounded-[0.20833rem] xsm:h-[5.29167rem]">
            <Image
              src={service.image}
              alt={service.title}
              width={704}
              height={400}
              className="w-[full] flex-1 min-h-0 object-cover"
            />
            <div className="absolute inset-0 opacity-46 bg-[linear-gradient(180deg,#000_47.12%,rgba(29,29,29,0.72)_71.63%,rgba(102,102,102,0.00)_100%)] sm:hidden"></div>
            <div className="flex flex-col p-[1.45833rem] justify-center bg-[#F0F0F0] xsm:absolute xsm:bottom-[1.32135rem] xsm:left-0 xsm:w-full xsm:bg-transparent xsm:py-[0.20833rem] xsm:px-[0.41667rem] xsm:justify-start xsm:gap-[0.41667rem]">
              <div className="flex justify-between items-center">
                <h3 className="group-hover:text-[#D32F2F] transition-colors duration-500 ease-[cubic-bezier(0.41,0.01,0,1)] line-clamp-1 text-[#090909] font-open-sans text-[1.25rem] font-semibold leading-[150%] xsm:line-clamp-2 xsm:text-white xsm:text-[0.72917rem] xsm:flex-1">
                  {service.title}
                </h3>
                <div className="flex items-center justify-center p-[0.46875rem] rounded-full bg-[rgba(9,9,9,0.10)] backdrop-blur-[20px] xsm:hidden">
                  <IconChevronRight className="size-[0.83333rem]" />
                </div>
                <IconArrowRight className="size-[0.72917rem] hidden xsm:block" />
              </div>
              <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-[cubic-bezier(0.41,0.01,0,1)] group-hover:grid-rows-[1fr] group-hover:opacity-90 xsm:hidden">
                <div className="min-h-0 overflow-hidden">
                  <p className="pt-[0.52083rem] text-[rgba(9,9,9,0.60)] font-open-sans text-[0.83333rem] leading-[150%] tracking-[-0.01667rem]">
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
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <path d="M6 13L11.0002 7.88114L6 3" stroke="#090909" strokeWidth="1.2" />
    </svg>
  )
}

const IconArrowRight = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" {...props}>
      <path d="M9.72134 7.58901L2.62093 7.58902L2.62093 6.42253L9.72093 6.42211L6.59228 3.29346L7.41723 2.4685L11.9545 7.00577L7.41723 11.543L6.59227 10.7181L9.72134 7.58901Z" fill="white" />
    </svg>
  )
}
