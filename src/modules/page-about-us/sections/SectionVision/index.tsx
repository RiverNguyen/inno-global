import CardVisionMission from '@/modules/page-about-us/components/CardVisionMission'

const VISION_DATA = {
  title: 'Tầm nhìn',
  content:
    "<p>Trở thành công ty tư vấn thiết kế <strong>hàng đầu Việt Nam</strong>. Quy mô nhân sự<strong style='color: #D32F2F;'> Top 10 khu vực Đông Nam Á</strong></p>",
  thumbnail: { url: '/images/about-us/d-image-1.jpg' },
}

export default function SectionVision() {
  return (
    <section>
      <CardVisionMission
        alignContent='left'
        title={VISION_DATA?.title}
        content={VISION_DATA?.content}
        thumbnail={VISION_DATA?.thumbnail}
      />
    </section>
  )
}
