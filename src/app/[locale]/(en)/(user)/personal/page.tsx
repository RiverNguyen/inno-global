import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'

import AsideMenu from '../_components/aside-menu'
import AsideUserCard from '../_components/aside-user-card'

const mobileKeywords = ['android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone', 'mobile']

function isMobileUserAgent(userAgent: string): boolean {
  const ua = userAgent.toLowerCase()
  return mobileKeywords.some((keyword) => ua.includes(keyword))
}

const PersonalPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params
  const headersList = await headers()
  const userAgent = headersList.get('user-agent') ?? ''

  if (!isMobileUserAgent(userAgent)) {
    redirect(`/${locale}/info`)
  }

  const session = await auth()

  return (
    <div className='space-y-[0.83rem] px-[0.83rem] pt-[3.96rem]'>
      <AsideUserCard session={session} />
      <AsideMenu />
    </div>
  )
}

export default PersonalPage
