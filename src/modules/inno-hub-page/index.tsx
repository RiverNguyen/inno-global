import ContentDemo from './components/content-demo'
import HeroSection from './components/hero-section'

const InnoHubModule = ({ locale }: { locale: string }) => {
  return (
    <>
      <HeroSection locale={locale} />

      <div className='bg-[#F8F8F8]'>
        <ContentDemo locale={locale} />

        <div className='pb-[5rem] pt-[2.88rem]'>
          <ContentDemo locale={locale} />
        </div>
      </div>
    </>
  )
}

export default InnoHubModule
