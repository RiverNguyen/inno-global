'use client'

import { FC, useEffect } from 'react'

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { cn } from '@/lib/utils'

interface DrawerProviderProps {
  children: React.ReactNode
  className?: string
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  showDrawerDrag?: boolean
}

const DrawerProvider: FC<DrawerProviderProps> = ({ children, className, open, setOpen, showDrawerDrag = false }) => {
  useEffect(() => {
    if (open) {
      // Lưu lại scroll position và chặn scroll
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
    } else {
      // Khôi phục scroll
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }

    // Cleanup function
    return () => {
      if (open) {
        const scrollY = document.body.style.top
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflow = ''
        if (scrollY) {
          window.scrollTo(0, parseInt(scrollY || '0') * -1)
        }
      }
    }
  }, [open])

  return (
    <Drawer
      onOpenChange={(open) => setOpen(open)}
      open={open}
      modal={true}
    >
      <DrawerContent
        suppressHydrationWarning
        className={cn('w-full rounded-[1rem_1rem_0rem_0rem] bg-white', className)}
        hiddenDrag={!showDrawerDrag}
      >
        {/* Giữ lại để tránh báo error */}
        <DrawerHeader className='hidden'>
          <DrawerTitle></DrawerTitle>
        </DrawerHeader>
        {children}
      </DrawerContent>
    </Drawer>
  )
}

export default DrawerProvider
