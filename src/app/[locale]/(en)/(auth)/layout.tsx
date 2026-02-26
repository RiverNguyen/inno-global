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
      <section className='w-full h-[100vh] flex-center xsm:items-start relative xsm:pt-[6.51rem] xsm:px-[0.83rem]'>
        <Image
          src='/login/bg.webp'
          alt='bg-login'
          fill
          sizes='100vw'
          preload
          className='object-cover xsm:hidden'
        />
        <div className='relative z-[1] xsm:w-full'>{children}</div>
      </section>
    </main>
  )
}

export default AuthLayout
