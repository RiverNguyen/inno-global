'use client'

import { IAcfImage } from '@/interfaces/acf-wp.interface'
import { cn } from '@/lib/utils'

interface ITimelineItem {
  id: string
  year: string
  description: string
  image: IAcfImage
}

const positionRowOdd = [
  [8, 9.95],
  [24.84, 12.4],
  [43.59, 8.8],
  [62.86, 8.7],
]
const positionRowEvent = [
  [13.28, 9.95],
  [31.15, 10.6],
  [48.54, 8.8],
  [68.49, 8.7],
]

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
    image: createMockImage(8, '/history/d-bg-history.jpg', 'Các mốc tiếp theo'),
  },
]

const ITEMS_PER_ROW = 4
const REM_TO_PX = 16
const HORIZONTAL_LINE_GAP_REM = 28.13
const HORIZONTAL_LINE_GAP = HORIZONTAL_LINE_GAP_REM * REM_TO_PX
const ITEM_LINE_GAP = HORIZONTAL_LINE_GAP * 2
const CORNER_RADIUS = 28
const BOUNDARY_MARGIN_REM = 5.2
const TO_BE_CONTINUED_LABEL = 'To be continued...'
const START_MARKER_ICON = '/history/marker.svg'
const FIRST_ITEM_IMAGE_SIZE_REM = 14.58333
const DEFAULT_ITEM_IMAGE_SIZE_REM = 10.41667
const MAIN_PATH_STROKE_WIDTH = 3
const IMAGE_BORDER_WIDTH = 8
const DESCRIPTION_GAP_REM = 0.9
const DESCRIPTION_BOX_WIDTH_REM = 18
const YEAR_BOX_WIDTH_REM = 12
const YEAR_BOX_HEIGHT_REM = 3.4
const CONTENT_SAFE_PADDING_REM = 1

const markerConfig = {
  default: {
    radius: 8,
    fill: '#ef3b3b',
  },
  start: {
    radius: 22,
    fill: '#ffffff',
    stroke: '#ef3b3b',
    strokeWidth: 2.5,
    iconSize: 60,
  },
  end: {
    outerRadius: 12,
    outerFill: '#D32F2F',
    outerOpacity: 0.2,
    outerRadius2: 16,
    outerFill2: '#D32F2F',
    outerOpacity2: 0.1,
    innerRadius: 8,
    innerFill: '#ef3b3b',
  },
}

interface IPoint {
  x: number
  y: number
}

interface ITimelinePoint extends IPoint {
  itemLineIndex: number
  stemHeight: number
  stemUp: boolean
}

const toPx = (valueInRem: number) => valueInRem * REM_TO_PX
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)
const maxStemHeight = toPx(
  Math.max(...positionRowOdd.map((item) => item[1]), ...positionRowEvent.map((item) => item[1])),
)
// const minPointLeftRem = Math.min(...positionRowOdd.map((item) => item[0]), ...positionRowEvent.map((item) => item[0]))
const maxPointLeftRem = Math.max(...positionRowOdd.map((item) => item[0]), ...positionRowEvent.map((item) => item[0]))
// const LEFT_BOUNDARY_X = toPx(minPointLeftRem - BOUNDARY_MARGIN_REM)
const RIGHT_BOUNDARY_X = toPx(maxPointLeftRem + BOUNDARY_MARGIN_REM)
const SVG_WIDTH = RIGHT_BOUNDARY_X + toPx(BOUNDARY_MARGIN_REM)
const CONTENT_SAFE_PADDING_X = toPx(CONTENT_SAFE_PADDING_REM)
const TOP_PADDING = toPx(4)
const FIRST_ITEM_LINE_Y = TOP_PADDING + maxStemHeight + toPx(FIRST_ITEM_IMAGE_SIZE_REM) + toPx(2)

const getLinePositions = (itemLineIndex: number) => {
  const visualLineIndex = itemLineIndex + 1
  return visualLineIndex % 2 === 1 ? positionRowOdd : positionRowEvent
}

const getItemLineY = (itemLineIndex: number) => FIRST_ITEM_LINE_Y + itemLineIndex * ITEM_LINE_GAP

const getPointByIndex = (itemIndex: number): ITimelinePoint => {
  const itemLineIndex = Math.floor(itemIndex / ITEMS_PER_ROW)
  const indexInLine = itemIndex % ITEMS_PER_ROW
  const [leftInRem, stemInRem] = getLinePositions(itemLineIndex)[indexInLine]

  return {
    x: toPx(leftInRem),
    y: getItemLineY(itemLineIndex),
    itemLineIndex,
    stemHeight: toPx(stemInRem),
    stemUp: (itemIndex + 1) % 2 === 1,
  }
}

const splitRows = (points: ITimelinePoint[]) => {
  const rows: ITimelinePoint[][] = []
  for (let i = 0; i < points.length; i += ITEMS_PER_ROW) {
    rows.push(points.slice(i, i + ITEMS_PER_ROW))
  }
  return rows
}

const buildTimelinePath = (rows: ITimelinePoint[]): string => {
  const pointRows = splitRows(rows)
  if (!pointRows.length || !pointRows[0].length) return ''

  const pathMinX = MAIN_PATH_STROKE_WIDTH / 2
  const pathMaxX = SVG_WIDTH - MAIN_PATH_STROKE_WIDTH / 2
  const firstPoint = pointRows[0][0]
  const lastRow = pointRows[pointRows.length - 1]
  const lastPoint = lastRow[lastRow.length - 1]
  let path = `M ${firstPoint.x} ${firstPoint.y}`

  pointRows.forEach((rowPoints, rowIndex) => {
    const rowY = rowPoints[0].y
    const isLastRow = rowIndex === pointRows.length - 1
    const radius = Math.min(CORNER_RADIUS, HORIZONTAL_LINE_GAP / 2 - 12)
    const rowEndX = isLastRow ? lastPoint.x : pathMaxX - radius
    path += ` H ${rowEndX}`

    if (isLastRow) return

    const nextRowY = pointRows[rowIndex + 1][0].y
    const separatorY = rowY + HORIZONTAL_LINE_GAP

    path += ` Q ${pathMaxX} ${rowY} ${pathMaxX} ${rowY + radius}`
    path += ` V ${separatorY - radius}`
    path += ` Q ${pathMaxX} ${separatorY} ${pathMaxX - radius} ${separatorY}`
    path += ` H ${pathMinX + radius}`
    path += ` Q ${pathMinX} ${separatorY} ${pathMinX} ${separatorY + radius}`
    path += ` V ${nextRowY - radius}`
    path += ` Q ${pathMinX} ${nextRowY} ${pathMinX + radius} ${nextRowY}`
  })

  return path
}

const renderMainMarker = (point: ITimelinePoint, isStartPoint: boolean, isEndPoint: boolean) => {
  if (isStartPoint) {
    return (
      <g>
        {/* <circle
          cx={point.x}
          cy={point.y}
          r={markerConfig.start.radius}
          fill={markerConfig.start.fill}
          stroke={markerConfig.start.stroke}
          strokeWidth={markerConfig.start.strokeWidth}
        /> */}
        <image
          href={START_MARKER_ICON}
          x={point.x - markerConfig.start.iconSize / 2}
          y={point.y - markerConfig.start.iconSize / 2}
          width={markerConfig.start.iconSize}
          height={markerConfig.start.iconSize}
          preserveAspectRatio='xMidYMid meet'
        />
      </g>
    )
  }

  if (isEndPoint) {
    return (
      <g>
        <circle
          cx={point.x}
          cy={point.y}
          r={markerConfig.end.outerRadius2}
          fill={markerConfig.end.outerFill2}
          opacity={markerConfig.end.outerOpacity2}
        />
        <circle
          cx={point.x}
          cy={point.y}
          r={markerConfig.end.outerRadius}
          fill={markerConfig.end.outerFill}
          opacity={markerConfig.end.outerOpacity}
        />
        <circle
          cx={point.x}
          cy={point.y}
          r={markerConfig.end.innerRadius}
          fill={markerConfig.end.innerFill}
        />
      </g>
    )
  }

  return (
    <>
      <circle
        cx={point.x}
        cy={point.y}
        r={markerConfig.end.outerRadius}
        fill={markerConfig.end.outerFill}
        opacity={markerConfig.end.outerOpacity}
      />
      <circle
        cx={point.x}
        cy={point.y}
        r={markerConfig.default.radius}
        fill={markerConfig.default.fill}
      />
    </>
  )
}

export default function Timeline() {
  const lastItem = timelineMockData[timelineMockData.length - 1]
  const hasToBeContinuedAtEnd = lastItem?.year === TO_BE_CONTINUED_LABEL
  const totalRealItems = hasToBeContinuedAtEnd ? timelineMockData.length - 1 : timelineMockData.length
  const shouldHideToBeContinued = hasToBeContinuedAtEnd && totalRealItems % ITEMS_PER_ROW === 0
  const visibleData = shouldHideToBeContinued ? timelineMockData.slice(0, -1) : timelineMockData

  const points = visibleData.map((_, index) => getPointByIndex(index))
  const rows = Math.ceil(visibleData.length / ITEMS_PER_ROW)

  const maxImageDiameter = toPx(FIRST_ITEM_IMAGE_SIZE_REM)
  const svgHeight = rows > 0 ? getItemLineY(rows - 1) + maxStemHeight + maxImageDiameter + toPx(6) : toPx(40)
  const pathD = buildTimelinePath(points)

  return (
    <section className='w-full py-20'>
      <div className='container'>
        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${svgHeight}`}
          className='w-full h-auto'
        >
          <defs>
            <linearGradient
              id='timeline-image-border-gradient'
              x1='0%'
              y1='0%'
              x2='0%'
              y2='100%'
            >
              <stop
                offset='23.97%'
                stopColor='#FFB2B2'
              />
              <stop
                offset='81.78%'
                stopColor='#D32F2F'
              />
            </linearGradient>
          </defs>

          <path
            d={pathD}
            fill='none'
            stroke='#ef3b3b'
            strokeWidth={MAIN_PATH_STROKE_WIDTH}
            strokeLinecap='butt'
            strokeLinejoin='round'
          />

          {points.map((point, index) => {
            const currentItem = visibleData[index]
            const isToBeContinued = currentItem.year === TO_BE_CONTINUED_LABEL
            const isStartPoint = index === 0
            const isEndPoint = index === points.length - 1
            const isOddItem = (index + 1) % 2 === 1
            const stemEndY = point.stemUp ? point.y - point.stemHeight : point.y + point.stemHeight
            const imageSize = index === 0 ? toPx(FIRST_ITEM_IMAGE_SIZE_REM) : toPx(DEFAULT_ITEM_IMAGE_SIZE_REM)
            const imageRadius = imageSize / 2
            const imageCenterX = point.x
            const imageY = point.stemUp ? stemEndY - imageSize : stemEndY
            const imageCenterY = imageY + imageRadius
            const clipId = `timeline-image-clip-${index}`
            const descriptionWidth = toPx(DESCRIPTION_BOX_WIDTH_REM)
            const descriptionHeight = imageSize
            const rawDescriptionX = isOddItem
              ? imageCenterX + imageRadius + toPx(DESCRIPTION_GAP_REM)
              : imageCenterX - imageRadius - toPx(DESCRIPTION_GAP_REM) - descriptionWidth
            const descriptionX = clamp(
              rawDescriptionX,
              CONTENT_SAFE_PADDING_X,
              SVG_WIDTH - descriptionWidth - CONTENT_SAFE_PADDING_X,
            )
            const descriptionY = imageCenterY - descriptionHeight / 2
            const yearFontRem = isToBeContinued ? 1.6 : 2.5
            const estimatedYearWidth = currentItem.year.length * yearFontRem * REM_TO_PX * 0.56 + toPx(1.2)
            const yearWidth = Math.max(toPx(YEAR_BOX_WIDTH_REM), estimatedYearWidth)
            const yearHeight = toPx(YEAR_BOX_HEIGHT_REM)
            const rawYearX = point.x - yearWidth / 2
            const yearX = clamp(rawYearX, CONTENT_SAFE_PADDING_X, SVG_WIDTH - yearWidth - CONTENT_SAFE_PADDING_X)
            const yearY = isToBeContinued
              ? point.y + toPx(0.8)
              : point.stemUp
                ? point.y + toPx(2.3)
                : point.y - yearHeight - toPx(0.6)
            const hasDescription = !!currentItem.description?.trim()

            return (
              <g key={`${currentItem.id}-${index}`}>
                {!isToBeContinued && (
                  <line
                    x1={point.x}
                    y1={point.y}
                    x2={point.x}
                    y2={stemEndY}
                    stroke='#ef3b3b'
                    strokeWidth={3}
                    strokeLinecap='round'
                  />
                )}

                {renderMainMarker(point, isStartPoint, isEndPoint)}

                {!isToBeContinued && (
                  <>
                    <defs>
                      <clipPath id={clipId}>
                        <circle
                          cx={imageCenterX}
                          cy={imageCenterY}
                          r={imageRadius - IMAGE_BORDER_WIDTH / 2}
                        />
                      </clipPath>
                    </defs>

                    <image
                      href={currentItem.image.url}
                      x={imageCenterX - imageRadius}
                      y={imageY}
                      width={imageSize}
                      height={imageSize}
                      clipPath={`url(#${clipId})`}
                      preserveAspectRatio='xMidYMid slice'
                    />

                    <circle
                      cx={imageCenterX}
                      cy={imageCenterY}
                      r={imageRadius - IMAGE_BORDER_WIDTH / 2}
                      fill='none'
                      stroke='url(#timeline-image-border-gradient)'
                      strokeWidth={IMAGE_BORDER_WIDTH}
                    />

                    {hasDescription && (
                      <foreignObject
                        x={descriptionX}
                        y={descriptionY}
                        width={descriptionWidth}
                        height={descriptionHeight}
                      >
                        <div className='flex h-full w-full items-center justify-start'>
                          <div
                            className='w-full max-h-full overflow-y-auto overflow-x-hidden pr-[0.35rem] text-[0.9375rem] font-normal leading-normal text-text-80 [scrollbar-width:thin] [&_p]:m-0 [&_ul]:m-0 [&_ul]:list-disc [&_ul]:pl-4 [&_li]:mb-1'
                            dangerouslySetInnerHTML={{ __html: currentItem.description }}
                          />
                        </div>
                      </foreignObject>
                    )}
                  </>
                )}

                <foreignObject
                  x={yearX}
                  y={yearY}
                  width={yearWidth}
                  height={yearHeight}
                >
                  <div
                    className={cn(
                      'flex h-full w-full items-center justify-center text-center text-[2.083333rem] font-semibold leading-[1.2] -tracking-[0.03125rem] whitespace-nowrap text-text-100/20',
                      isToBeContinued && 'text-[1.25rem] -tracking-[0.0125rem]',
                      isStartPoint && 'text-[2.083333rem] text-[#111111]',
                    )}
                  >
                    {currentItem.year}
                  </div>
                </foreignObject>
              </g>
            )
          })}
        </svg>
      </div>
    </section>
  )
}
