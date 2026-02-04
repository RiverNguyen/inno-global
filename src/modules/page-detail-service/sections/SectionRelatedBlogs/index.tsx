import Link from 'next/link'

import CardBlog from '@/components/shared/CardBlog'
import TitleSection from '@/modules/page-detail-service/components/TitleSection'

const MOCK_DATA = [
  {
    title: 'Seminar đào tạo và phát triển lên văn hóa doanh nghiệp INNO Gitiho',
    category: 'XÂY DỰNG',
    date: '30.10.2025',
    thumbnail: { alt: '', url: '/images/detail-service/d-image-1.jpg' },
  },
  {
    title: 'Seminar đào tạo và phát triển lên văn hóa doanh nghiệp INNO Gitiho',
    category: 'XÂY DỰNG',
    date: '30.10.2025',
    thumbnail: { alt: '', url: '/images/detail-service/d-image-1.jpg' },
  },
  {
    title: 'Seminar đào tạo và phát triển lên văn hóa doanh nghiệp INNO Gitiho',
    category: 'XÂY DỰNG',
    date: '30.10.2025',
    thumbnail: { alt: '', url: '/images/detail-service/d-image-1.jpg' },
  },
  {
    title: 'Seminar đào tạo và phát triển lên văn hóa doanh nghiệp INNO Gitiho',
    category: 'XÂY DỰNG',
    date: '30.10.2025',
    thumbnail: { alt: '', url: '/images/detail-service/d-image-1.jpg' },
  },
  {
    title: 'Seminar đào tạo và phát triển lên văn hóa doanh nghiệp INNO Gitiho',
    category: 'XÂY DỰNG',
    date: '30.10.2025',
    thumbnail: { alt: '', url: '/images/detail-service/d-image-1.jpg' },
  },
  {
    title: 'Seminar đào tạo và phát triển lên văn hóa doanh nghiệp INNO Gitiho',
    category: 'XÂY DỰNG',
    date: '30.10.2025',
    thumbnail: { alt: '', url: '/images/detail-service/d-image-1.jpg' },
  },
]

export default function SectionRelatedBlogs() {
  return (
    <section className='xsm:pt-[1.66667rem] xsm:pb-[3.33333rem] xsm:px-[0.83333rem] relative'>
      <div className='xsm:space-y-[1.04167rem] mx-auto max-w-[75rem] space-y-[2.08333rem]'>
        <TitleSection>Bài viết liên quan</TitleSection>
        <div className='xsm:grid-cols-1 xsm:gap-[1.04167rem] grid grid-cols-3 gap-[2.08333rem]'>
          {MOCK_DATA.map((item, index) => (
            <Link
              href={'#'}
              key={index}
              className='col-span-1'
            >
              <CardBlog
                title={item?.title}
                category={item?.category}
                date={item?.date}
                thumbnail={item?.thumbnail}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
