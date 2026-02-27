import { auth } from '@/auth'

import AsideMenu from './aside-menu'
import AsideUserCard from './aside-user-card'

const Aside = async () => {
  const session = await auth()

  return (
    <aside className='w-[13.85rem] space-y-[0.625rem] xsm:hidden'>
      <AsideUserCard session={session} />
      <AsideMenu />
    </aside>
  )
}

export default Aside
