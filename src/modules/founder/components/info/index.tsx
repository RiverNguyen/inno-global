import Image from 'next/image'

const FounderImage = ({ wrapperClassName }: { wrapperClassName?: string }) => (
  <div className={wrapperClassName ?? ''}>
    <div className='relative w-[24.79167rem] h-[29.53125rem] shrink-0 xsm:w-full xsm:h-[21.2799rem]'>
      <Image
        src='/leadership/overlay.webp'
        alt="overlay"
        width={476}
        height={567}
        className="object-cover absolute inset-0 w-full h-full"
      />
      <Image
        src="/leadership/d-leadership-1.webp"
        alt="Founder"
        width={397}
        height={567}
        className="h-full w-auto object-cover relative mx-auto"
      />
    </div>
  </div>
)

export default function Info() {
  return (
    <div className="relative py-[4.16667rem] min-h-[44.47917rem] xsm:min-h-auto xsm:px-[0.83333rem] xsm:py-[2.29167rem]">
      <Image
        src='/leadership/bg-founder-mb.webp'
        alt="bg-founder"
        width={375}
        height={1220}
        className="hidden xsm:block absolute bottom-0 left-0 w-full h-full object-cover pointer-events-none"
      />

      <div className='max-w-[75rem] mx-auto relative flex gap-[3.75rem] xsm:flex-col'>
        <FounderImage wrapperClassName="xsm:hidden" />

        <div className="flex flex-col">
          <h2 className='text-[#090909] font-open-sans text-[1.875rem] font-semibold leading-[1.35417rem] mb-[0.72917rem] xsm:text-[1.04167rem] xsm:leading-[150%] xsm:mb-[0.3125rem]'>
            Nguyễn Văn A
          </h2>
          <p className='text-[rgba(9,9,9,0.80)] font-open-sans text-[0.9375rem] leading-[150%] xsm:text-[0.83333rem]'>
            CEO INNO JSC
          </p>

          <FounderImage wrapperClassName="hidden xsm:block xsm:my-[1.45833rem]" />

          <div className='text-[rgba(9,9,9,0.80)] text-justify font-open-sans text-[0.9375rem] leading-[150%] mt-[1.66667rem] mb-[2.60417rem] xsm:mt-0 xsm:mb-[1.19792rem] xsm:text-[0.72917rem] xsm:[text-trim:trim-both] xsm:[text-box-edge:cap_alphabetic]'>
            <p>
              Tại INNO, chúng tôi áp dụng cách tiếp cận tích hợp cho các dự án của mình như một công ty dịch vụ chuyên nghiệp. Các đội ngũ của chúng tôi trên tất cả các lĩnh vực thiết kế kiến trúc trong nhà: thiết kế đô thị, nghiên cứu, quy hoạch và tư vấn, làm việc hợp tác để cung cấp những giải pháp tốt hơn cho khách hàng.
            </p>
            <br />
            <p>
              Với khẩu hiệu thương hiệu "TRẢI NGHIỆM, TÍCH HỢP" thể hiện tinh thần của INNO, chúng tôi quyết tâm tạo ra những xu hướng trong thiết kế xã hội và môi trường để đáp ứng những nhu cầu và khát vọng đang thay đổi.
              Chúng tôi kết hợp mong muốn và trải nghiệm của khách hàng với sự đa dạng trong chuyên môn và hồ sơ thành tích phong phú của mình để mang lại những trải nghiệm đáng giá cho mọi người trên toàn thế giới.
            </p>
            <br />
            <p>
              Ngày nay, cuộc chiến chống lại đại dịch COVID-19 đang thúc đẩy nhu cầu về những cách sống mới. Khi các vấn đề liên quan đến kiến trúc, quy hoạch đô thị và môi trường xã hội ngày càng trở nên phức tạp, chúng tôi tại INNO nhận ra rằng vai trò và trách nhiệm mà chúng tôi được kỳ vọng thực hiện đang trở nên quan trọng hơn bao giờ hết.
            </p>
          </div>

          <div className='flex flex-col gap-[0.72917rem] items-end'>
            <p className='text-[#000] font-open-sans text-[1.04167rem] font-semibold [text-box-trim:trim-both] [text-box-edge:cap_alphabetic] xsm:text-[0.83333rem]'>
              Nguyễn Văn A
            </p>
            <p className='text-[rgba(9,9,9,0.80)] font-open-sans text-[0.9375rem] leading-[150%] xsm:text-[0.83333rem]'>
              CEO INNO JSC
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
