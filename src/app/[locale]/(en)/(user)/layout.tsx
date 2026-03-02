import Aside from '@/app/[locale]/(en)/(user)/_components/aside'
import { IFooter } from '@/layouts/footer/footer'
import FooterDashboard from '@/layouts/footer/footer-dashboard'
import { footerService } from '@/services/home/footer.service'

const UserLayout = async ({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) => {
  const { locale } = await params
  const { data } = await footerService.getFooterData<{ data: { footer_fields: IFooter } }>(locale)

  return (
    <>
      <style>
        {`
        #footer {
            display: none;
        }
        `}
      </style>
      <main
        id='main-content'
        className='xsm:h-[calc(100vh-6.46rem)] h-[calc(100vh-4.95rem)] bg-[#F8F8F8]'
      >
        <section className='xsm:pt-0 xsm:space-x-0 xsm:block mx-auto flex max-w-[66.25rem] space-x-[1.25rem] pt-[6.15rem]'>
          <Aside />

          {children}
        </section>
      </main>
      <FooterDashboard data={data?.footer_fields} />
    </>
  )
}

export default UserLayout
