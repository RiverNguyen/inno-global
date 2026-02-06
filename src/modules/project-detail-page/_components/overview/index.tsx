type OverviewRow = {
  label: string
  /** Plain text hoặc HTML (vd: ul/li). Render bằng dangerouslySetInnerHTML. */
  value: string
}

const OVERVIEW_FAKE_DATA: OverviewRow[] = [
  {
    label: 'CHỦ ĐẦU TƯ',
    value: 'Công ty Cổ phần thương mại Hải Phòng Plaza - Tập đoàn DOJI',
  },
  {
    label: 'GIẢI THƯỞNG',
    value:
      '<ul><li>Giải thưởng Dot Property Vietnam Awards 2021: Đạt giải "Dự án căn hộ và khách sạn cao cấp có thiết kế mang tính biểu tượng đẹp nhất Việt Nam 2021"</li><li>Dot Property Vietnam Awards 2021: "Best Luxury Residence and Hotel Iconic Design Vietnam 2021"</li></ul>',
  },
  {
    label: 'NĂM BẮT ĐẦU THỰC HIỆN',
    value: '<span style="color: #dc2626; font-weight: 600">2020</span>',
  },
  {
    label: 'ĐỊA ĐIỂM',
    value: 'Lô đất 1/8B Khu đô thị mới Ngã 5 - Sân bay Cát Bi, phường Đằng Lâm, Quận Hải An, thành phố Hải Phòng.',
  },
  {
    label: 'ĐỐI TÁC QUỐC TẾ',
    value: 'Mercury',
  },
  {
    label: 'CÔNG VIỆC ĐẢM NHIỆM',
    value: 'Lập hồ sơ TMB tỷ lệ 1/500 & Phương án kiến trúc, Lập BCNCKT, TKCS, TKBVTC, Dự toán',
  },
  {
    label: 'LOẠI CÔNG TRÌNH',
    value: 'Khách sạn, Nhà ở cao tầng',
  },
  {
    label: 'CẤP CÔNG TRÌNH',
    value: 'Cấp 1',
  },
  {
    label: 'QUY MÔ DỰ ÁN',
    value:
      '<ul><li>Diện tích đất/Land area: 12.868 m2</li><li>Diện tích xây dựng/Construction area: 6.718 m2</li><li>Tổng diện tích sàn/GFA: 186.677 m2</li><li>Số tầng cao/Level: 45</li><li>Số tầng hầm/Basement: 03</li><li>Diện tích hầm/Basement area: 12810 m2</li></ul>',
  },
]

function renderCellValue(value: string) {
  return (
    <div
      className="text-[#333] [&_li]:before:content-['-_\00a0'] [&_ul]:list-none [&_ul]:space-y-1"
      dangerouslySetInnerHTML={{ __html: value }}
    />
  )
}

export default function Overview() {
  return (
    <section className='xsm:pt-[1.46rem] xsm:px-[0.8275rem] xsm:pb-[1.04rem] p-[6.25rem_12.5rem]'>
      <table className='w-full border border-[#090909]/8'>
        <tbody>
          {OVERVIEW_FAKE_DATA.map((row) => (
            <tr
              key={row.label}
              className='border-b border-[#090909]/8 last:border-b-0 last:[&>td]:pb-[2.92rem]'
            >
              <td className='xsm:w-[6.17rem] xsm:px-[0.42rem] xsm:py-[0.42rem] xsm:text-[0.729rem] xsm:leading-[1.5] w-[15.47rem] border-r border-[#090909]/8 px-[1.66667rem] py-[1.04rem] align-top text-[0.83rem] leading-[1.3] font-semibold tracking-[-0.00833rem] text-[#090909]/80'>
                {row.label}
              </td>
              <td className='xsm:px-[0.42rem] xsm:py-[0.42rem] xsm:text-[0.729rem] xsm:leading-[1.5] px-[2.4rem] py-[1.04rem] text-[1.04167rem] leading-[1.5] tracking-[-0.005rem] text-[#090909]/80'>
                {renderCellValue(row.value)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
