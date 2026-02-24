import Image from 'next/image'

export default function BannerHistory() {
  return (
    <section className='relative w-full h-screen'>
      <Image
        className='size-full object-cover'
        src='/images/banner-history.png'
        alt='banner-history'
        width={1920}
        height={1080}
      />
    </section>
  )
}
