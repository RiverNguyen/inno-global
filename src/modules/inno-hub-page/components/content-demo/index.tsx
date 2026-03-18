'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const ContentDemo = ({ locale }: { locale: string }) => {
  const t = useTranslations('InnoHub')

  const data = [
    {
      id: 1,
      slug: 'inno-viet-nam',
      title: 'INNO Việt Nam',
      desc: 'Tại INNO, chúng tôi đang nỗ lực gấp đôi để giành được niềm tin của xã hội bằng cách đáp ứng và vượt qua mong đợ',
      img: '/inno-hub/d-demo-1.png',
    },
    {
      id: 2,
      slug: 'noi-dung-demo',
      title: 'Nội dung Demo',
      desc: 'Tại INNO, chúng tôi đang nỗ lực gấp đôi để giành được niềm tin của xã hội bằng cách đáp ứng và vượt qua mong đợ',
      img: '/inno-hub/d-demo-2.png',
    },
    {
      id: 3,
      slug: 'ktsvn',
      title: 'KTSVN',
      desc: 'Tại INNO, chúng tôi đang nỗ lực gấp đôi để giành được niềm tin của xã hội bằng cách đáp ứng và vượt qua mong đợ',
      img: '/inno-hub/d-demo-3.png',
    },
    {
      id: 4,
      slug: 'ktsvn-2',
      title: 'KTSVN',
      desc: 'Tại INNO, chúng tôi đang nỗ lực gấp đôi để giành được niềm tin của xã hội bằng cách đáp ứng và vượt qua mong đợ',
      img: '/inno-hub/d-demo-1.png',
    },
    {
      id: 5,
      slug: 'ktsvn-3',
      title: 'KTSVN',
      desc: 'Tại INNO, chúng tôi đang nỗ lực gấp đôi để giành được niềm tin của xã hội bằng cách đáp ứng và vượt qua mong đợ',
      img: '/inno-hub/d-demo-2.png',
    },
    {
      id: 6,
      slug: 'ktsvn-4',
      title: 'KTSVN',
      desc: 'Tại INNO, chúng tôi đang nỗ lực gấp đôi để giành được niềm tin của xã hội bằng cách đáp ứng và vượt qua mong đợ',
      img: '/inno-hub/d-demo-3.png',
    },
    {
      id: 7,
      slug: 'ktsvn-5',
      title: 'KTSVN',
      desc: 'Tại INNO, chúng tôi đang nỗ lực gấp đôi để giành được niềm tin của xã hội bằng cách đáp ứng và vượt qua mong đợ',
      img: '/inno-hub/d-demo-1.png',
    },
  ]

  return (
    <section className='max-w-300 bg-[#F8F8F8] mx-auto pt-[3.58rem]'>
      <h3 className='pc-h3-40-s mb-[1.56rem]'>{t('Demo')}</h3>

      <div className='grid grid-cols-5 gap-x-[1.25rem] gap-y-[2.5rem]'>
        {data.map((item) => (
          <Link
            key={item.id}
            href={`/${locale}/inno-hub/${item.slug}`}
            className='block hover:opacity-80 transition cursor-pointer'
          >
            <Image
              alt={item.title}
              width={272}
              height={173}
              src={item.img}
              className='w-full h-auto'
            />

            <p className='pc-20-20-sm mt-[0.62rem] text-primary'>{item.title}</p>

            <p className='pc-body-14-r mt-[0.62rem] text-primary/90 line-clamp-3 hover:line-clamp-none transition-all'>
              {item.desc}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default ContentDemo
