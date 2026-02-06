import Banner from '@/modules/service-list-page/_components/banner'
import List, { type ServiceListInitialPage } from '@/modules/service-list-page/_components/list'

type ServiceListDataSource = 'service' | 'project'

const ServiceList = ({
  initialPage,
  page,
  dataSource = 'project',
}: {
  initialPage: ServiceListInitialPage
  page: { banner: string }
  dataSource?: ServiceListDataSource
}) => {
  return (
    <>
      <Banner banner={page?.banner} />
      <List
        initialPage={initialPage}
        dataSource={dataSource}
      />
    </>
  )
}

export default ServiceList
