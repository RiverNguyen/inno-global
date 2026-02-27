import Aside from '@/app/[locale]/(vi)/(user)/_components/aside'

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <style>
        {`
        #footer {
            display: none;
        }
        `}
      </style>
      <main className="bg-[#F8F8F8] h-[calc(100vh-4.95rem)]">
        <section className='max-w-[66.25rem] mx-auto flex space-x-[1.25rem] pt-[6.15rem]'>
          <Aside />
          {children}
        </section>
      </main>
    </>
  )
}

export default UserLayout
