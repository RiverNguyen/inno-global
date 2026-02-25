import { useTranslations } from 'next-intl'

import Breadcrumb from '@/components/shared/Breadcrumb'
import { IBlog } from '@/interfaces/blog.interface'

import Content from './_components/Content'
import RelatedBlogs from './_components/related-blogs'

interface BlogDetailProps {
  locale: string
  blog: IBlog
  relatedBlogs: IBlog[]
}

const BlogDetail = ({ locale, blog, relatedBlogs }: BlogDetailProps) => {
  const t = useTranslations('DetailBlogPage')
  console.log(relatedBlogs)

  return (
    <div className="container mt-[3.65rem] xsm:mt-[5rem]">
      <Breadcrumb
        navItems={[
          { label: t('breadcrumbHome'), href: '/' },
          { label: t('blog'), href: locale === 'en' ? '/blogs' : '/tin-tuc' },
        ]}
        lastItem={{ label: blog?.title }}
        classNameContainer='xsm:hidden pt-[2.8125rem]'
      />

      <div className="my-[6.25rem] xsm:mt-0 xsm:my-0">
        <Content blog={blog} />
      </div>

      <RelatedBlogs data={relatedBlogs} />
    </div>
  )
}

export default BlogDetail