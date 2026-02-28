import { auth } from '@/auth'

import AsideMenu from '../_components/aside-menu'
import AsideUserCard from '../_components/aside-user-card'

const PersonalPage = async () => {
  const session = await auth()

  return (
    <div className='space-y-[0.83rem] px-[0.83rem] pt-[3.96rem]'>
      <AsideUserCard session={session} />
      <AsideMenu />
    </div>
  )
}

export default PersonalPage
