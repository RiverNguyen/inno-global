import AboutList from '@/modules/page-about-us/sections/SectionAbout/AboutList'

const ABOUT_ITEMS = [
  { title: 'CEO Message', url: '#' },
  { title: 'Sơ đồ tổ chức', url: '#' },
  { title: 'Công ty con/liên kết', url: '#' },
  { title: 'Ban lãnh đạo công ty', url: '#' },
  { title: 'Văn hóa doanh nghiệp', url: '#' },
  { title: 'Dữ liệu doanh nghiệp', url: '#' },
  { title: 'Lịch sử hình thành & phát triển', url: '#' },
  { title: 'Trách nhiệm xã hội', url: '#' },
]

export default function SectionAbout() {
  return (
    <section className='font-open-sans xsm:space-y-[1.45833rem] xsm:px-[0.83333rem] xsm:pt-[1.66667rem] xsm:pb-[0.72917rem] relative space-y-[3rem]'>
      <div className='xsm:space-y-[1.5rem] space-y-[1.04167rem]'>
        <h1 className='text-primary/80 xsm:text-[1.35417rem] text-[2.8125rem] leading-[1.2] font-semibold tracking-[-0.02813rem]'>
          Về chúng tôi
        </h1>
        <p className='text-primary xsm:text-trim-both xsm:text-edge-[cap_alphabetic] xsm:text-[0.72917rem] text-justify text-[0.9375rem] leading-[1.5]'>
          INNO là đơn vị thi công và kiến trúc tiên phong, hoạt động với định hướng ứng dụng các
          giải pháp sáng tạo nhằm đảm bảo chất lượng, tính an toàn và độ bền vững cho mỗi công
          trình. Chúng tôi sở hữu đội ngũ chuyên gia giàu kinh nghiệm trong lĩnh vực kiến trúc, kết
          cấu và quản lý thi công, luôn kiểm soát chặt chẽ từ khâu thiết kế đến triển khai thực tế.
          INNO theo đuổi tư duy thiết kế tối ưu, kết hợp hài hòa giữa công năng, thẩm mỹ và khả năng
          thích ứng với từng loại hình dự án. Mỗi không gian được tạo nên không chỉ đáp ứng yêu cầu
          sử dụng mà còn mang giá trị lâu dài, phù hợp với xu hướng kiến trúc hiện đại và phát triển
          bền vững.
        </p>
      </div>
      <AboutList items={ABOUT_ITEMS} />
    </section>
  )
}
