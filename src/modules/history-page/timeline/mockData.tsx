import { IAcfImage } from '@/interfaces/acf-wp.interface'

export interface ITimelineItem {
  id: string
  year: string
  description: string
  image: IAcfImage | null
  isToBeContinued?: boolean
}

const createMockImage = (id: number, url: string, alt: string): IAcfImage => ({
  id,
  url,
  alt,
  title: alt,
  filename: url.split('/').pop() || `timeline-${id}.jpg`,
  filesize: 0,
  width: 600,
  height: 600,
  mime_type: 'image/jpeg',
  type: 'image',
  subtype: 'jpeg',
  sizes: {
    thumbnail: url,
    medium: url,
    medium_large: url,
    large: url,
  },
})

export const timelineMockData: ITimelineItem[] = [
  {
    id: '2008',
    year: '29/09/2008',
    description: '<p>Công ty cổ phần INNO được thành lập tại căn nhà 33 Đông Tác.</p>',
    image: createMockImage(1, '/history/d-bg-history.jpg', 'Thành lập INNO tại 33 Đông Tác'),
  },
  {
    id: '2014-2017',
    year: '2014 - 2017',
    description:
      '<ul><li>Ghi dấu ấn trong việc tham gia các công trình lớn: Landmark81, Vinhomes Ocean Park,...</li><li>Phát triển năng lực 3 bộ môn chính.</li><li>Thành lập văn phòng miền Nam.</li></ul>',
    image: createMockImage(2, '/history/d-bg-history.jpg', 'Giai đoạn phát triển 2014-2017'),
  },
  {
    id: '2018',
    year: '2018',
    description:
      '<ul><li>Thành lập Chi nhánh miền Nam.</li><li>Thành lập các phòng IBM, BIM MEP, BIM phát triển năng lực chuyển đổi số.</li></ul>',
    image: createMockImage(3, '/history/d-bg-history.jpg', 'Mốc phát triển năm 2018'),
  },
  {
    id: '2020-2022',
    year: '2020 - 2022',
    description:
      '<ul><li>Ghi dấu ấn trong việc tham gia các công trình lớn: Landmark81, Vinhomes Ocean Park,...</li><li>Phát triển năng lực 3 bộ môn chính.</li><li>Thành lập văn phòng miền Nam.</li></ul>',
    image: createMockImage(4, '/history/d-bg-history.jpg', 'Giai đoạn 2020-2022'),
  },
  {
    id: '2023',
    year: '2023',
    description: '<p>Mua lại công ty VAA, chuẩn bị cho bước chuyển đổi mô hình.</p>',
    image: createMockImage(5, '/history/d-bg-history.jpg', 'Mua lại công ty VAA năm 2023'),
  },
  {
    id: '2024',
    year: '2024',
    description: '<p>Thành lập INNO Holding.</p>',
    image: createMockImage(6, '/history/d-bg-history.jpg', 'Thành lập INNO Holding năm 2024'),
  },
  {
    id: '2025',
    year: '2025',
    description:
      '<ul><li>Chuyển trụ sở về 39 Thượng Thụy - tòa nhà do chính INNO thiết kế.</li><li>Đẩy mạnh công tác chuyển đổi số, xây dựng thư viện số dữ liệu.</li><li>Thành lập Ban đào tạo.</li><li>Chuyển đổi mô hình hoạt động tổng thầu.</li></ul>',
    image: createMockImage(7, '/history/d-bg-history.jpg', 'Mốc chuyển đổi năm 2025'),
  },
  {
    id: 'future',
    year: 'To be continued...',
    description: '',
    image: null,
    isToBeContinued: true,
  },
]
