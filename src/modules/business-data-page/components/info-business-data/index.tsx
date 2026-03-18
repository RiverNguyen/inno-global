import { IBDProjectOverview } from '@/interfaces/business-data.interface'

const InfoBusinessData = ({ acfOverView }: { acfOverView: IBDProjectOverview[] }) => {
  return (
    <section className='xsm:px-[0.83333rem] xsm:mt-[1.25rem] xsm:mb-[2.08333rem] max-w-[75rem] my-[3.75rem] mx-auto bg-[#F8F8F8]'>
      <table className='w-[100%] border-1 border-[#09090914]/80'>
        <tbody>
          {acfOverView?.map((data, index) => {
            return (
              <tr key={index}>
                <td className='xsm:p-[0.41667rem] xsm:w-[6.17rem] xsm:mb-body-14-r xsm:font-semibold text-[#090909]/80 pc-body-16-s uppercase py-[1.46rem] w-[18.02rem] px-[1.67rem] border-1 border-[#09090914]/80'>
                  {data?.label}
                </td>
                <td
                  className='xsm:p-[0.625rem] xsm:mb-body-14-r text-[#090909]/80 pc-body-20-r py-[1.46rem] px-[1.67rem] border-1 border-[#09090914]/80 [&_a]:text-[#000DFF] [&_a]:underline'
                  dangerouslySetInnerHTML={{ __html: data?.value || '' }}
                ></td>
              </tr>
            )
          })}
          {/* <tr className=''>
            <td className='text-[#090909]/80 pc-body-16-s uppercase py-[1.75rem] w-[21.63rem] px-[2rem] border-1 border-[#09090914]/80'>
              TÊN CÔNG TY
            </td>
            <td className='text-[#090909]/80 py-[1.75rem] pc-body-20-r px-[2rem] border-1 border-[#09090914]/80'>
              CÔNG TY TNHH INNO VIỆT NAM
            </td>
          </tr> */}
        </tbody>
      </table>
    </section>
  )
}

export default InfoBusinessData
