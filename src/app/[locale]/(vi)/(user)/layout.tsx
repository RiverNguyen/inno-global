import Aside from '@/app/[locale]/(vi)/(user)/_components/aside'


const UserLayout = async ({ children }: { children: React.ReactNode }) => {

  return (
    <>
      <style>
        {`
        #footer {
            display: none;
        }
        `}
      </style>
      <main className='bg-[#F8F8F8] h-[calc(100vh-4.95rem)] xsm:h-[calc(100vh-6.46rem)]'>
        <section className='max-w-[66.25rem] mx-auto flex space-x-[1.25rem] pt-[6.15rem] xsm:pt-0 xsm:space-x-0 xsm:block'>
          <Aside />

          {children}
        </section>
      </main>
    </>
  )
}

export default UserLayout
