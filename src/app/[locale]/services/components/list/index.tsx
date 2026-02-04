import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Kiến trúc (Architecture)",
    image: "/services/d-service-1.webp",
    description: "INNO cung cấp giải pháp kiến trúc toàn diện, kết hợp hài hòa giữa công năng, thẩm mỹ và sự phù hợp với bối cảnh. Mỗi dự án được nghiên cứu kỹ lưỡng từ ý tưởng, không gian, vật liệu đến trải nghiệm sử dụng. Chúng tôi hướng tới những thiết kế bền vững, tinh gọn và mang dấu ấn riêng của chủ đầu tư. Mục tiêu cuối cùng là tạo nên không gian sống và làm việc thực sự hiệu quả và truyền cảm hứng.",
  },
  {
    title: "Kết cấu (Structural Engineering)",
    image: "/services/d-service-2.webp",
    description: "INNO cung cấp giải pháp kết cấu toàn diện, kết hợp hài hòa giữa công năng, thẩm mỹ và sự phù hợp với bối cảnh. Mỗi dự án được nghiên cứu kỹ lưỡng từ ý tưởng, không gian, vật liệu đến trải nghiệm sử dụng. Chúng tôi hướng tới những thiết kế bền vững, tinh gọn và mang dấu ấn riêng của chủ đầu tư. Mục tiêu cuối cùng là tạo nên không gian sống và làm việc thực sự hiệu quả và truyền cảm hứng.",
  },
  {
    title: "MEP - Cơ điện",
    image: "/services/d-service-3.webp",
    description: "INNO cung cấp giải pháp MEP toàn diện, kết hợp hài hòa giữa công năng, thẩm mỹ và sự phù hợp với bối cảnh. Mỗi dự án được nghiên cứu kỹ lưỡng từ ý tưởng, không gian, vật liệu đến trải nghiệm sử dụng. Chúng tôi hướng tới những thiết kế bền vững, tinh gọn và mang dấu ấn riêng của chủ đầu tư. Mục tiêu cuối cùng là tạo nên không gian sống và làm việc thực sự hiệu quả và truyền cảm hứng.",
  },
  {
    title: "Kiến trúc (Architecture)",
    image: "/services/d-service-4.webp",
    description: "INNO cung cấp giải pháp kiến trúc toàn diện, kết hợp hài hòa giữa công năng, thẩm mỹ và sự phù hợp với bối cảnh. Mỗi dự án được nghiên cứu kỹ lưỡng từ ý tưởng, không gian, vật liệu đến trải nghiệm sử dụng. Chúng tôi hướng tới những thiết kế bền vững, tinh gọn và mang dấu ấn riêng của chủ đầu tư. Mục tiêu cuối cùng là tạo nên không gian sống và làm việc thực sự hiệu quả và truyền cảm hứng.",
  },
  {
    title: "Kiến trúc (Architecture)",
    image: "/services/d-service-5.webp",
    description: "INNO cung cấp giải pháp kiến trúc toàn diện, kết hợp hài hòa giữa công năng, thẩm mỹ và sự phù hợp với bối cảnh. Mỗi dự án được nghiên cứu kỹ lưỡng từ ý tưởng, không gian, vật liệu đến trải nghiệm sử dụng. Chúng tôi hướng tới những thiết kế bền vững, tinh gọn và mang dấu ấn riêng của chủ đầu tư. Mục tiêu cuối cùng là tạo nên không gian sống và làm việc thực sự hiệu quả và truyền cảm hứng.",
  },
  {
    title: "Kiến trúc (Architecture)",
    image: "/services/d-service-6.webp",
    description: "INNO cung cấp giải pháp kiến trúc toàn diện, kết hợp hài hòa giữa công năng, thẩm mỹ và sự phù hợp với bối cảnh. Mỗi dự án được nghiên cứu kỹ lưỡng từ ý tưởng, không gian, vật liệu đến trải nghiệm sử dụng. Chúng tôi hướng tới những thiết kế bền vững, tinh gọn và mang dấu ấn riêng của chủ đầu tư. Mục tiêu cuối cùng là tạo nên không gian sống và làm việc thực sự hiệu quả và truyền cảm hứng.",
  },
  {
    title: "Kiến trúc (Architecture)",
    image: "/services/d-service-7.webp",
    description: "INNO cung cấp giải pháp kiến trúc toàn diện, kết hợp hài hòa giữa công năng, thẩm mỹ và sự phù hợp với bối cảnh. Mỗi dự án được nghiên cứu kỹ lưỡng từ ý tưởng, không gian, vật liệu đến trải nghiệm sử dụng. Chúng tôi hướng tới những thiết kế bền vững, tinh gọn và mang dấu ấn riêng của chủ đầu tư. Mục tiêu cuối cùng là tạo nên không gian sống và làm việc thực sự hiệu quả và truyền cảm hứng.",
  },
  {
    title: "Kiến trúc (Architecture)",
    image: "/services/d-service-8.webp",
    description: "INNO cung cấp giải pháp kiến trúc toàn diện, kết hợp hài hòa giữa công năng, thẩm mỹ và sự phù hợp với bối cảnh. Mỗi dự án được nghiên cứu kỹ lưỡng từ ý tưởng, không gian, vật liệu đến trải nghiệm sử dụng. Chúng tôi hướng tới những thiết kế bền vững, tinh gọn và mang dấu ấn riêng của chủ đầu tư. Mục tiêu cuối cùng là tạo nên không gian sống và làm việc thực sự hiệu quả và truyền cảm hứng.",
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
              height={363}
              className="w-full h-[18.9rem] object-cover absolute top-0 left-0 group-hover:translate-y-[-3.125rem] transition-transform duration-500 ease-[cubic-bezier(0.41,0.01,0,1)] xsm:h-full"
            />
            <div className="absolute inset-0 opacity-[0.46] bg-[linear-gradient(180deg,#000_47.12%,rgba(29,29,29,0.72)_71.63%,rgba(102,102,102,0.00)_100%)] sm:hidden"></div>

            <div className="absolute top-full left-0 translate-y-[-4.8rem] group-hover:translate-y-[-100%] transition-transform duration-500 ease-[cubic-bezier(0.41,0.01,0,1)] w-full flex flex-col gap-[0.52083rem] p-[1.45833rem] justify-center bg-[#F0F0F0] xsm:absolute-y-center xsm:bg-transparent xsm:py-[0.20833rem] xsm:px-[0.41667rem] xsm:justify-start xsm:gap-[0.41667rem]">
              <div className="flex justify-between items-center">
                <h3 className="group-hover:text-primary-red-100 transition-colors duration-500 ease-[cubic-bezier(0.41,0.01,0,1)] line-clamp-1 text-en font-open-sans text-[1.25rem] font-semibold leading-[150%] xsm:line-clamp-2 xsm:text-white xsm:text-[0.72917rem] xsm:flex-1">
                  {service.title}
                </h3>
                <div className="flex-center p-[0.46875rem] rounded-full bg-[rgba(9,9,9,0.10)] backdrop-blur-[20px] xsm:hidden">
                  <IconChevronRight className="size-[0.83333rem]" />
                </div>
                <IconArrowRight className="size-[0.72917rem] hidden xsm:block" />
              </div>
              <p className="group-hover:opacity-90 transition-opacity duration-500 ease-[cubic-bezier(0.41,0.01,0,1)] opacity-0 text-en-60 text-justify font-open-sans text-[0.83333rem] leading-[150%] tracking-[-0.01667rem] xsm:hidden">
                {service.description}
              </p>
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