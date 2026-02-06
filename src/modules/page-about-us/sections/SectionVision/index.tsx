import { ISectionVisionAcf } from '@/interfaces/about-us.interface'
import CardVisionMission from '@/modules/page-about-us/components/CardVisionMission'

interface SectionVisionProps {
  visionAcfData: ISectionVisionAcf
}

export default function SectionVision({ visionAcfData }: SectionVisionProps) {
  return (
    <section>
      <CardVisionMission
        alignContent='left'
        title={visionAcfData?.title}
        content={visionAcfData?.description}
        thumbnail={visionAcfData?.image}
      />
    </section>
  )
}
