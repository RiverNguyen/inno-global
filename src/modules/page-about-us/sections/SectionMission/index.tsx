import { ISectionMissionAcf } from '@/interfaces/about-us.interface'
import CardVisionMission from '@/modules/page-about-us/components/CardVisionMission'

interface SectionMissionProps {
  missionAcfData: ISectionMissionAcf
}

export default function SectionMission({ missionAcfData }: SectionMissionProps) {
  return (
    <section>
      <CardVisionMission
        alignContent='right'
        title={missionAcfData?.title}
        content={missionAcfData?.description}
        thumbnail={missionAcfData?.image}
      />
    </section>
  )
}
