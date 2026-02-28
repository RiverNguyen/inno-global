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
      <main className='xsm:h-[calc(100vh-6.46rem)] h-[calc(100vh-4.95rem)] bg-[#F8F8F8]'>
        <section className='xsm:pt-0 xsm:space-x-0 xsm:block mx-auto flex max-w-[66.25rem] space-x-[1.25rem] pt-[6.15rem]'>
          <Aside />

          {children}
        </section>
      </main>
      {/* <FooterDashboard /> */}
    </>
  )
}

export default UserLayout
