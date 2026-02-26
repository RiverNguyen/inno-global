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
      <section className='w-full h-[100vh] flex-center relative'>
        <Image
          src='/login/bg.webp'
          alt='bg-login'
          fill
          sizes='100vw'
          preload
          className='object-cover'
        />
        <div className='relative z-[1]'>{children}</div>
      </section>
    </main>
  )
}

export default AuthLayout
