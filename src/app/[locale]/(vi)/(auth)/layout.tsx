import Image from 'next/image'
import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <style>
        {`
        #footer {
            display: none;
        }
        `}
      </style>
      <section className='flex-center xsm:items-start xsm:pt-[6.51rem] xsm:px-[0.83rem] relative h-[100vh] w-full'>
        <Image
          src='/login/bg.webp'
          alt='bg-login'
          fill
          sizes='100vw'
          preload
          className='xsm:hidden object-cover'
        />
        <div className='xsm:w-full relative z-[1]'>{children}</div>
      </section>
    </main>
  )
}

export default AuthLayout
