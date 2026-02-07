import AboutUsHome from '@/app/[locale]/_components/about-us/AboutUsHome'
import BannerHome from '@/app/[locale]/_components/banner/BannerHome'
import ScrollSnapWrapper from '@/app/[locale]/_components/scroll/ScrollSnapWrapper'

// export const dynamicParams = false
export function generateStaticParams() {
  return [{ locale: 'vi' }, { locale: 'en' }]
}

export default function Page() {
  // const t = useTranslations('HomePage')
  return (
    <ScrollSnapWrapper>
      <section data-snap>
        <BannerHome />
      </section>
      <section data-snap>
        <AboutUsHome />
      </section>
      <section
        data-snap
        className='h-[80vh] bg-yellow-100'
      ></section>
      <section
        data-snap
        className='h-[70vh] bg-black'
      ></section>
      <section
        data-snap
        className='h-[50vh] bg-red-300'
      ></section>
      <section
        data-snap
        className='h-[60vh] bg-yellow-500'
      ></section>
    </ScrollSnapWrapper>
  )
}
