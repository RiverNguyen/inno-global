'use client'

import Image from 'next/image'
import { useState } from 'react'

import { Link } from '@/i18n/navigation'
import { IInnoHub } from '@/interfaces/inno-hub.interface'

interface ContentDemoProps {
  purpose: IInnoHub['purpose']
}

const ContentDemo = ({ purpose }: ContentDemoProps) => {
  const [active, setActive] = useState(0)

  const handleClick = (index: number) => {
    setActive(index)

    const el = document.getElementById(`section-${index}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* 🔥 Tabs mobile */}
      <div className='lg:hidden sticky top-0 z-50 bg-white border-b'>
        <div className='relative'>
          {/* Fade trái */}
          <div className='pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-white to-transparent z-10' />
          {/* Fade phải */}
          <div className='pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-white to-transparent z-10' />
          {/* Scroll container */}
          <div
            className='flex overflow-x-auto gap-2 px-[0.83rem]
  snap-x snap-mandatory
  [-ms-overflow-style:none] [scrollbar-width:none]
  [&::-webkit-scrollbar]:hidden
  [-webkit-overflow-scrolling:touch]'
          >
            {purpose.map((item, index) => {
              const realIndex = index % purpose.length
              return (
                <button
                  key={index}
                  id={`tab-${realIndex}`}
                  onClick={() => handleClick(realIndex)}
                  className={`flex-shrink-0 snap-start whitespace-nowrap 
  font-open-sans 
  text-[0.72917rem] leading-[150%] 
  px-[0.52083rem] pt-[0.8917rem] pb-[0.625rem] 
  border-b-2 transition duration-300 ease-out ${active === realIndex ? 'border-b-[#D32F2F]' : 'border-b-transparent'}`}
                >
                  {item.purpose_detail.title}
                </button>
              )
            })}
          </div>
        </div>
      </div>
      <section className='max-w-300 bg-[#F8F8F8] mx-auto lg:pl-[0] lg:pr-[0] lg:pt-[3.58rem] pl-[0.82rem] pr-[0.82rem] pt-[1.5rem]'>
        {purpose.map((item, index) => {
          const { title, purpose_repeat } = item.purpose_detail
          return (
            <div
              key={index}
              id={`section-${index}`} // 👈 dùng để scroll
              className='mb-[3rem] scroll-mt-[70px]' // 👈 tránh bị header che
            >
              <h3 className='mb-header-h2-24-sm mb-[1.56rem] lg:pc-h3-40-s'>{title}</h3>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-[1.25rem] lg:gap-y-[2.5rem] gap-y-[1.25rem] gap-x-[0.83rem]'>
                {purpose_repeat.map((sub, i) => (
                  <Link
                    key={i}
                    href={''}
                    className='block hover:opacity-80 transition'
                  >
                    <Image
                      alt={sub.title}
                      width={272}
                      height={173}
                      src={sub.image}
                      className='w-full h-auto'
                    />

                    <p className='lg:pc-20-20-sm mb-body-14-sm text-primary/80 mt-[0.62rem] lg:text-primary'>
                      {sub.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </section>
    </>
  )
}

export default ContentDemo
