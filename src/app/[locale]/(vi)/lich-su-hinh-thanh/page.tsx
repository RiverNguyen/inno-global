import BannerHistory from '@/app/[locale]/(vi)/lich-su-hinh-thanh/_components/BannerHistory'
import IndexTimeline from '@/app/[locale]/(vi)/lich-su-hinh-thanh/_components/timeline/index'

export default function page() {
  return (
    <main className='w-full relative'>
      <BannerHistory />
      <IndexTimeline />
    </main>
  )
}
