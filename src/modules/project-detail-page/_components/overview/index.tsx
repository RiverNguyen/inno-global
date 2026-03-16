import { IProjectDetailAcf } from '@/interfaces/project.interface'

function renderCellValue(value: string) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: value }}
      className="text-[#333] [&_li]:before:content-['-_\00a0'] [&_ul]:list-none [&_ul]:space-y-1"
    ></div>
  )
}

export default function Overview({ overview }: { overview?: IProjectDetailAcf['project_overview'] }) {
  return (
    <section className='xsm:pt-[1.46rem] xsm:px-[0.8275rem] xsm:pb-[1.04rem] p-[4rem_0] max-w-[75rem] mx-auto'>
      <table className='w-full border-[0.75px] border-[#090909]/8'>
        <tbody>
          {Array.isArray(overview) &&
            overview.map((row) => (
              <tr
                key={row?.label}
                className='xsm:last:[&>td]:pb-[0.42rem] border-b-[0.75px] border-[#090909]/8 last:border-b-0 last:[&>td]:pb-[2.92rem]'
              >
                <td className='xsm:w-[6.17rem] xsm:px-[0.42rem] xsm:py-[0.42rem] xsm:text-[0.729rem] xsm:leading-[1.5] w-[15.47rem] border-r-[0.75px] border-[#090909]/8 px-[1.66667rem] py-[1.04rem] align-top text-[0.83rem] leading-[1.3] font-semibold tracking-[-0.00833rem] text-[#090909]/80'>
                  {row?.label}
                </td>
                <td className='xsm:px-[0.42rem] xsm:py-[0.42rem] xsm:text-[0.729rem] xsm:leading-[1.5] px-[2.4rem] py-[1.04rem] text-[1.04167rem] leading-[1.5] tracking-[-0.005rem] text-[#090909]/80'>
                  {renderCellValue(row?.value || '')}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  )
}
