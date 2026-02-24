import BannerHistory from '@/app/[locale]/(vi)/lich-su-hinh-thanh/_components/BannerHistory'
import Timeline from '@/app/[locale]/(vi)/lich-su-hinh-thanh/_components/timeline/Timeline'

export default function page() {
  return (
    <main className='w-full relative'>
      <BannerHistory />
      <Timeline />
    </main>
  )
}
