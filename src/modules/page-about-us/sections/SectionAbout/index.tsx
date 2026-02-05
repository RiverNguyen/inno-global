import { ISectionAboutUsAcf } from '@/interfaces/about-us.interface'
import AboutList from '@/modules/page-about-us/sections/SectionAbout/AboutList'

interface SectionAboutProps {
  aboutUsAcf: ISectionAboutUsAcf
}

export default function SectionAbout({ aboutUsAcf }: SectionAboutProps) {
  return (
    <section className='font-open-sans xsm:space-y-[1.45833rem] xsm:px-[0.83333rem] xsm:pt-[1.66667rem] xsm:pb-[0.72917rem] relative space-y-[3rem]'>
      <div className='xsm:space-y-[1.5rem] space-y-[1.04167rem]'>
        <h1 className='text-primary/80 xsm:text-[1.35417rem] text-[2.8125rem] leading-[1.2] font-semibold tracking-[-0.02813rem]'>
          {aboutUsAcf?.title || ''}
        </h1>
        <p className='text-primary xsm:text-trim-both xsm:text-edge-[cap_alphabetic] xsm:text-[0.72917rem] text-justify text-[0.9375rem] leading-[1.5]'>
          {aboutUsAcf?.description || ''}
        </p>
      </div>
      <AboutList navItems={aboutUsAcf?.nav_items || []} />
    </section>
  )
}
