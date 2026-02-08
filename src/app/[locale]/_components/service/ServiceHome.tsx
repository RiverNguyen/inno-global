'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/parallax'
import { Parallax } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { cn } from '@/lib/utils'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const SERVICES = [
  {
    title: 'Kiến trúc (Architecture)',
    description:
      'INNO cung cấp giải pháp kiến trúc toàn diện, kết hợp hài hòa giữa công năng, thẩm mỹ và sự phù hợp với bối cảnh. Mỗi dự án được nghiên cứu kỹ lưỡng từ ý tưởng, không gian, vật liệu đến trải nghiệm sử dụng. Chúng tôi hướng tới những thiết kế bền vững, tinh gọn và mang dấu ấn riêng của chủ đầu tư. Mục tiêu cuối cùng là tạo nên không gian sống và làm việc thực sự hiệu quả và truyền cảm hứng.',
    image: '/home/d-service1.webp',
  },
  {
    title: 'Kết cấu (Structural Engineering)',
    description:
      'Dịch vụ thiết kế kết cấu của INNO đảm bảo độ an toàn, ổn định và bền vững cho mọi loại công trình, từ nhà ở đến dự án quy mô lớn. Chúng tôi sử dụng các phương pháp tính toán hiện đại, tối ưu vật liệu và tuân thủ nghiêm ngặt tiêu chuẩn kỹ thuật. Mọi giải pháp đều được kiểm tra đa chiều nhằm hạn chế rủi ro trong thi công. Kết cấu được thiết kế chuẩn mực góp phần nâng cao chất lượng tổng thể của công trình.',
    image: '/home/d-service2.webp',
  },
  {
    title: 'MEP – Cơ điện',
    description:
      'Hệ thống cơ điện (MEP) đóng vai trò quan trọng trong việc vận hành hiệu quả và tiết kiệm năng lượng cho công trình. INNO cung cấp các giải pháp thiết kế hệ thống điện, nước, điều hòa không khí và thông gió tối ưu. Chúng tôi chú trọng đến việc tích hợp các công nghệ thông minh, thân thiện với môi trường, đảm bảo sự tiện nghi và an toàn tối đa cho người sử dụng.',
    image: '/home/d-service1.webp',
  },
  {
    title: 'Kết cấu (Structural Engineering)',
    description:
      'Dịch vụ thiết kế kết cấu của INNO đảm bảo độ an toàn, ổn định và bền vững cho mọi loại công trình, từ nhà ở đến dự án quy mô lớn. Chúng tôi sử dụng các phương pháp tính toán hiện đại, tối ưu vật liệu và tuân thủ nghiêm ngặt tiêu chuẩn kỹ thuật. Mọi giải pháp đều được kiểm tra đa chiều nhằm hạn chế rủi ro trong thi công. Kết cấu được thiết kế chuẩn mực góp phần nâng cao chất lượng tổng thể của công trình.',
    image: '/home/d-service2.webp',
  },
  {
    title: 'Kiến trúc (Architecture)',
    description:
      'INNO cung cấp giải pháp kiến trúc toàn diện, kết hợp hài hòa giữa công năng, thẩm mỹ và sự phù hợp với bối cảnh. Mỗi dự án được nghiên cứu kỹ lưỡng từ ý tưởng, không gian, vật liệu đến trải nghiệm sử dụng. Chúng tôi hướng tới những thiết kế bền vững, tinh gọn và mang dấu ấn riêng của chủ đầu tư. Mục tiêu cuối cùng là tạo nên không gian sống và làm việc thực sự hiệu quả và truyền cảm hứng.',
    image: '/home/d-service1.webp',
  },
  {
    title: 'Giải pháp Kiến tạo toàn phần',
    description:
      'Giải pháp Kiến tạo toàn phần của INNO mang đến sự đồng bộ từ khâu thiết kế kiến trúc, kết cấu đến cơ điện và nội thất. Chúng tôi đảm nhận vai trò tổng thầu thiết kế, giúp chủ đầu tư kiểm soát tốt tiến độ, chi phí và chất lượng dự án. Sự phối hợp chặt chẽ giữa các bộ môn giúp giảm thiểu xung đột kỹ thuật và tối ưu hóa hiệu quả thi công.',
    image: '/home/d-service2.webp',
  },
  {
    title: 'Giải pháp Kiến trúc',
    description:
      'INNO cung cấp giải pháp kiến trúc toàn diện, kết hợp hài hòa giữa công năng, thẩm mỹ và sự phù hợp với bối cảnh. Mỗi dự án được nghiên cứu kỹ lưỡng từ ý tưởng, không gian, vật liệu đến trải nghiệm sử dụng. Chúng tôi hướng tới những thiết kế bền vững, tinh gọn và mang dấu ấn riêng của chủ đầu tư. Mục tiêu cuối cùng là tạo nên không gian sống và làm việc thực sự hiệu quả và truyền cảm hứng.',
    image: '/home/d-service1.webp',
  },
  {
    title: 'Kết cấu (Structural Engineering)',
    description:
      'Dịch vụ thiết kế kết cấu của INNO đảm bảo độ an toàn, ổn định và bền vững cho mọi loại công trình, từ nhà ở đến dự án quy mô lớn. Chúng tôi sử dụng các phương pháp tính toán hiện đại, tối ưu vật liệu và tuân thủ nghiêm ngặt tiêu chuẩn kỹ thuật. Mọi giải pháp đều được kiểm tra đa chiều nhằm hạn chế rủi ro trong thi công. Kết cấu được thiết kế chuẩn mực góp phần nâng cao chất lượng tổng thể của công trình.',
    image: '/home/d-service2.webp',
  },
  {
    title: 'MEP – Cơ điện',
    description:
      'Hệ thống cơ điện (MEP) đóng vai trò quan trọng trong việc vận hành hiệu quả và tiết kiệm năng lượng cho công trình. INNO cung cấp các giải pháp thiết kế hệ thống điện, nước, điều hòa không khí và thông gió tối ưu. Chúng tôi chú trọng đến việc tích hợp các công nghệ thông minh, thân thiện với môi trường, đảm bảo sự tiện nghi và an toàn tối đa cho người sử dụng.',
    image: '/home/d-service1.webp',
  },
  {
    title: 'Kết cấu (Structural Engineering)',
    description:
      'Dịch vụ thiết kế kết cấu của INNO đảm bảo độ an toàn, ổn định và bền vững cho mọi loại công trình, từ nhà ở đến dự án quy mô lớn. Chúng tôi sử dụng các phương pháp tính toán hiện đại, tối ưu vật liệu và tuân thủ nghiêm ngặt tiêu chuẩn kỹ thuật. Mọi giải pháp đều được kiểm tra đa chiều nhằm hạn chế rủi ro trong thi công. Kết cấu được thiết kế chuẩn mực góp phần nâng cao chất lượng tổng thể của công trình.',
    image: '/home/d-service2.webp',
  },
]

export default function ServiceHome() {
  const [activeService, setActiveService] = useState(0)
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Handle left menu click
  const handleServiceClick = (index: number) => {
    setActiveService(index)
    if (swiperInstance) {
      swiperInstance.slideTo(index)
    }
  }

  useGSAP(
    () => {
      // Parallax effect: Image moves up, Text moves down
      // We apply this to the WRAPPERS so it doesn't conflict with Swiper Parallax
      const images = gsap.utils.toArray('.service-parallax-image-wrapper')
      const texts = gsap.utils.toArray('.service-parallax-text-wrapper')

      images.forEach((img: any) => {
        gsap.fromTo(
          img,
          { y: '0%' },
          {
            y: '-15%', // Functionality: scrolling down moves image up relative to container
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom', // Start when Section top hits viewport bottom
              end: 'bottom top', // End when Section bottom hits viewport top
              scrub: true,
            },
          },
        )
      })

      texts.forEach((txt: any) => {
        gsap.fromTo(
          txt,
          { y: '0%' },
          {
            y: '30%', // Functionality: scrolling down moves text down relative to container
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })
    },
    { scope: containerRef, dependencies: [swiperInstance] }, // Re-run if swiper changes
  )

  return (
    <div
      ref={containerRef}
      className='flex min-h-screen xsm:hidden'
    >
      {/* Left Menu */}
      <div className='w-[35.3125rem] pt-[5.7rem] pr-[2.92rem] pl-[7.29rem] pb-[5.18rem] space-y-[2.24rem] z-20 relative bg-white'>
        <h3 className='pc-h3-40-s text-text-100'>Năng Lực - Dịch Vụ</h3>
        <div className='grid grid-cols-1'>
          {SERVICES.map((service, index) => (
            <p
              key={index}
              onClick={() => handleServiceClick(index)}
              className={cn(
                `pc-body-20-r text-[1.04167rem] cursor-pointer px-[0.9375rem] py-[1.25rem] border-b border-b-en-60/10 transition-all duration-300 ${index === 0 ? 'border-t border-t-en-60/10' : ''}`,
                activeService === index
                  ? 'text-primary-red-100 bg-[linear-gradient(90deg,rgba(211,47,47,0.04)_87.82%,rgba(211,47,47,0.00)_100%)]'
                  : 'text-en-60 hover:text-primary-red-100 hover:bg-[linear-gradient(90deg,rgba(211,47,47,0.04)_87.82%,rgba(211,47,47,0.00)_100%)]',
              )}
            >
              {service.title}
            </p>
          ))}
        </div>
      </div>

      {/* Right Content */}
      <div className='flex-1 overflow-hidden h-screen'>
        <Swiper
          direction='vertical'
          modules={[Parallax]}
          parallax={true}
          spaceBetween={0}
          slidesPerView={1}
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => setActiveService(swiper.activeIndex)}
          speed={800}
          className='w-full h-full'
          allowTouchMove={true}
        >
          {SERVICES.map((service, index) => (
            <SwiperSlide
              key={index}
              className='relative w-full h-full overflow-hidden'
            >
              <div className='absolute inset-0 w-full h-[120%] -top-[10%] service-parallax-image-wrapper'>
                <div
                  className='w-full h-full relative'
                  data-swiper-parallax-y='-1%'
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className='object-cover w-full h-full'
                    priority={index === 0}
                  />
                  {/* Dark Overlay */}
                  <div className='absolute inset-0 bg-black/40' />
                </div>
              </div>

              {/* Text Content Wrapper for GSAP Parallax */}
              <div className='absolute top-[5.68rem] left-[5.21rem] text-white z-10 service-parallax-text-wrapper pointer-events-none'>
                {/* Text Inner for Swiper Parallax - pointer-events-auto to restore intersection */}
                <div
                  className='pointer-events-auto'
                  data-swiper-parallax-y='-30%'
                  data-swiper-parallax-opacity='0'
                  data-swiper-parallax-duration='600'
                >
                  <h2 className='pc-34-34-m text-white mb-[0.94rem]'>{service.title}</h2>
                  <p className='pc-body-20-r text-[1.04167rem] text-white mb-[2rem] max-w-[52.1875rem]'>
                    {service.description}
                  </p>
                  <div className='flex items-center cursor-pointer group w-fit space-x-[0.28rem] ml-auto'>
                    <Link
                      href='#'
                      className='pc-button-16-r'
                    >
                      Xem chi tiết
                    </Link>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='7'
                      height='11'
                      viewBox='0 0 7 11'
                      fill='none'
                      className='transition-transform group-hover:translate-x-1'
                    >
                      <path
                        d='M3.96486 5.17871L6.12832 5.18545L3.96631 5.17871L6.20402e-05 0.942809L0.942871 0L6.12832 5.18545L0.942867 10.3709L5.79098e-05 9.42809L3.96486 5.17871Z'
                        fill='white'
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
