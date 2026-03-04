import { ChevronRightIcon } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

import { IProject } from '@/app/[locale]/_components/projects/projects'
import ROUTES from '@/configs/routes'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

interface IProjectInfoProps {
  data: IProject[]
  activeIndex: number
}

export default function ProjectInfo({ data, activeIndex }: IProjectInfoProps) {
  const t = useTranslations('ProjectListPage')
  const locale = useLocale()

  return (
    <div className='xsm:w-auto xsm:left-[0.52rem] xsm:right-[0.52rem] xsm:p-0 absolute bottom-0 left-0 z-10 w-[41.51042rem] p-[0.52083rem_5.20833rem_0_7.29167rem]'>
      <div className='xsm:overflow-hidden xsm:bg-white relative h-[12.5rem] w-full rounded-[0.20833rem] shadow-[0_239px_67px_0_rgba(181,181,181,0.00),0_153px_61px_0_rgba(181,181,181,0.01),0_86px_52px_0_rgba(181,181,181,0.05),0_38px_38px_0_rgba(181,181,181,0.09),0_10px_21px_0_rgba(181,181,181,0.10)]'>
        {data.map((item, index) => (
          <div
            className={cn(
              'xsm:top-[1.25rem] xsm:right-[0.83333rem] xsm:bottom-[0.3167rem] xsm:left-[0.83333rem] xsm:w-auto invisible absolute bottom-[1.333rem] left-0 flex w-full flex-col opacity-0 transition-all duration-300 ease-in-out sm:translate-y-full',
              activeIndex === index && 'visible opacity-100 sm:translate-y-0',
            )}
            key={item.id}
          >
            <h3 className='group xsm:text-[#090909] flex items-center justify-between space-x-[1rem] text-white'>
              <Link
                className='xsm:text-[0.72917rem] line-clamp-1 text-[1.25rem] leading-normal font-semibold tracking-[-0.02813rem]'
                href={`/projects/${item.link}`}
              >
                {item.title || '-'}
              </Link>
              <Link
                className='xsm:text-[0.625rem] xsm:text-[#D32F2F] flex shrink-0 items-center space-x-[0.20833rem] text-[0.83rem] leading-normal tracking-[-0.01667rem] opacity-80'
                href={locale === 'vi' ? `${ROUTES.projectsVi}/${item.link}` : `${ROUTES.projectsEn}/${item.link}`}
              >
                {t('viewDetail')}{' '}
                <ChevronRightIcon className='xsm:size-[0.625rem] size-[0.83rem] transition-all duration-300 ease-in-out group-hover:translate-x-[0.5rem]' />
              </Link>
            </h3>
            <p className='xsm:text-[0.72917rem] xsm:leading-[1.5] xsm:text-[#090909]/80 xsm:line-clamp-4 xsm:mt-[0.73rem] mt-0.5 line-clamp-3 text-[0.9375rem] text-white/80'>
              {item.content || '-'}
            </p>
            <div className='xsm:mt-auto mt-[1.46rem] grid grid-cols-2 gap-x-[1rem]'>
              {(
                [
                  { label: t('labelInvestor'), value: item.investor, mobileOrder: 'xsm:order-1' },
                  { label: t('labelLocation'), value: item.location, mobileOrder: 'xsm:order-3' },
                  { label: t('labelArea'), value: item.area, mobileOrder: 'xsm:order-2' },
                  { label: t('labelYear'), value: item.year, mobileOrder: 'xsm:order-4' },
                ] as const
              ).map(({ label, value, mobileOrder }) => (
                <div
                  key={label}
                  className={cn(
                    'xsm:pb-[0.52rem] xsm:border-[#090909]/10 flex border-t border-white/20 pt-[0.52rem] pb-[0.73rem]',
                    mobileOrder,
                  )}
                >
                  <p className='xsm:text-[0.625rem] xsm:text-[#090909] mr-[0.52rem] text-[0.83333rem] tracking-[-0.01667rem] text-white/90'>
                    {label}
                  </p>
                  <p className='xsm:text-[0.625rem] xsm:text-[#090909]/90 text-[0.83333rem] font-semibold tracking-[-0.01667rem] text-white'>
                    {value || '-'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
