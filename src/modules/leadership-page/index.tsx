import Banner from '@/modules/leadership-page/components/banner'
import BoardOfDirectors from '@/modules/leadership-page/components/board-of-directors'
import leadershipService from '@/services/leadership'

const getLeaderHref = (locale: string, slug?: string) => {
  const aboutUsBasePath = locale === 'en' ? '/about-us' : '/ve-chung-toi'
  const leaderBasePath = locale === 'en' ? '/leadership' : '/ban-lanh-dao-cong-ty'
  const basePath = `${aboutUsBasePath}${leaderBasePath}`
  return slug ? `${basePath}/${slug}` : basePath
}

const Leadership = async ({ locale: _locale }: { locale: string }) => {
  const aboutUsBasePath = _locale === 'en' ? '/about-us' : '/ve-chung-toi'

  const [leadershipPageAcf, groupsRes] = await Promise.all([
    leadershipService.getLeadershipPageAcf(_locale),
    leadershipService.getLeadershipGroups(_locale),
  ])

  const bannerTitle = leadershipPageAcf?.acf?.title

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
          image: leader.featured_image?.url ?? '/default.webp',
          href: getLeaderHref(_locale, leader.slug),
        })),
      }
    }),
  )

  return (
    <main className='xsm:bg-white xsm:pt-[2.92rem] bg-[#F8F8F8] pt-[3.65rem]'>
      <Banner
        aboutUsBasePath={aboutUsBasePath}
        title={bannerTitle}
      />
      <BoardOfDirectors
        sections={sections}
        locale={_locale}
      />
    </main>
  )
}

export default Leadership
