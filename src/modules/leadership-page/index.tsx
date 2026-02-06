import Banner from '@/modules/leadership-page/components/banner'
import BoardOfDirectors from '@/modules/leadership-page/components/board-of-directors'
import leadershipService from '@/services/leadership'

const getLeaderHref = (locale: string, slug?: string) => {
  const basePath = locale === 'en' ? '/leadership' : '/ban-lanh-dao-cong-ty'
  return slug ? `${basePath}/${slug}` : basePath
}

const Leadership = async ({ locale: _locale }: { locale: string }) => {
  const groupsRes = await leadershipService.getLeadershipGroups(_locale)
  const groups = groupsRes?.data ?? []

  const sections = await Promise.all(
    groups.map(async (group) => {
      if (!group.slug) {
        return {
          title: group.name,
          directors: [],
        }
      }

      const leadersRes = await leadershipService.getLeadershipByGroup(_locale, group.slug)

      return {
        title: group.name,
        directors: (leadersRes?.data ?? []).map((leader) => ({
          name: leader.title,
          position: leader.acf?.position ?? '',
          image: leader.featured_image?.url ?? '',
          href: getLeaderHref(_locale, leader.slug),
        })),
      }
    }),
  )

  return (
    <main className="bg-[#F8F8F8] xsm:bg-white">
      <Banner />
      <BoardOfDirectors sections={sections} locale={_locale} />
    </main>
  )
}

export default Leadership
