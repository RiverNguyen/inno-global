import CardVisionMission from '@/modules/page-about-us/components/CardVisionMission'

const MISSION_DATA = {
  title: 'Sứ mệnh',
  content:
    "<p>Đồng hành và hỗ trợ các thế hệ kiến trúc sư và kỹ sư Việt Nam trong hành trình <strong style='color: #D32F2F;'>phát triển bản thân, nghề nghiệp và khời nghiệp</strong></p>",
  thumbnail: { url: '/images/about-us/d-image-2.jpg' },
}

export default function SectionMission() {
  return (
    <section>
      <CardVisionMission
        alignContent='right'
        title={MISSION_DATA?.title}
        content={MISSION_DATA?.content}
        thumbnail={MISSION_DATA?.thumbnail}
      />
    </section>
  )
}
