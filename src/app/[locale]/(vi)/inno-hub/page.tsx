import ENDPOINTS from '@/configs/endpoints'
import InnoHubModule from '@/modules/inno-hub-page'
import innoHubService from '@/services/inno-hub'

const InnoHubPage = async () => {
  const { acf } = await innoHubService.getAcfData(ENDPOINTS.inno_hub.page_id.vi)
  console.log(acf)

  return <InnoHubModule acfData={acf} />
}

export default InnoHubPage
