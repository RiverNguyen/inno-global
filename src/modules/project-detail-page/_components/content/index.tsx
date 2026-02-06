'use client'
import { useTranslations } from 'use-intl'
import './style.css'
import ShareSticky from '@/modules/project-detail-page/_components/share-sticky'

const content = `
  <h2>1. Thông tin chung</h2>
<span style="font-family: 'times new roman', times, serif;">Vincom Landmark Tower là công trình căn họ chung cư kết hợp với thương mại dịch vụ và khách sạn nằm trong dự án Khu phức hợp Tân Cảng Sài Gòn (Vinhomes Central Park), phường 12, quận Bình Thạnh, TP Hồ Chí Minh.</span>

<span style="font-family: 'times new roman', times, serif;"><img class="alignleft wp-image-3583 " src="https://cms.tiemtourshagiang.com/wp-content/uploads/2025/06/general_info_image_1-scaled.webp" alt="" width="512" height="512" /><img class="wp-image-3584 alignleft" src="https://cms.tiemtourshagiang.com/wp-content/uploads/2025/06/design_idea_image_2-scaled.webp" alt="" width="513" height="513" /></span>

<h2><span style="font-family: 'times new roman', times, serif;">2. Giá trị tinh thần &amp; biểu tượng</span></h2>
<span style="font-family: 'times new roman', times, serif;">Với chiều cao 461,2m,đứng trong top 8 tòa nhà cao nhất thế giới, Landmark 81 chính là biểu tượng của đỉnh cao, tầm vóc mới cũng như đánh dấu sự thịnh vượng và phát triển của Việt Nam trong tương lai.</span>

<span style="font-family: 'times new roman', times, serif;"><img class="aligncenter wp-image-3586 size-full" src="https://cms.tiemtourshagiang.com/wp-content/uploads/2025/06/symbolic_value_image-scaled.webp" alt="" width="2560" height="1440" /></span>
<h2><span style="font-family: 'times new roman', times, serif;">3. Ý tưởng thiết kế</span></h2>
<span style="font-family: 'times new roman', times, serif;">Đến từ 2 hình ảnh mang tính đại diện cho linh hồn người Việt là cây tre và bó đũa. Landmark chính là công trình tiêu biểu đại diện cho hồn Việt. Phần tháp tòa nhà có kiến trúc như những đốt tre được bó lại, đại diện cho sự trung thực, chính trực, chăm chỉ, lạc quan của người Việt, nó cũng thể hiện sức mạnh sức mạnh đoàn kết vững chắc của bó đũa trong truyện ngụ ngôn xưa.</span>

<span style="font-family: 'times new roman', times, serif;"><img class="wp-image-3585 alignleft" src="https://cms.tiemtourshagiang.com/wp-content/uploads/2025/06/design_idea_image_1-scaled.webp" alt="" width="508" height="508" /><img class="wp-image-3588 alignleft" src="https://cms.tiemtourshagiang.com/wp-content/uploads/2025/06/general_info_image_2_11zon-scaled.webp" alt="" width="511" height="511" /></span>

<h2><span style="font-family: 'times new roman', times, serif;">4. Tiêu chí thiết kế</span></h2>
<span style="font-family: 'times new roman', times, serif;">Công trình được thiết kế với vẻ ngoài sang trọng, hiện đại, đủ nổi bật để trở thành điểm nhấn ấn tượng trong quần thể các công trình lân cận mà không phá vỡ tính đồng nhất của một đô thị lấp lãnh giữa lòng Sài Gòn hoa lệ.</span>
<span style="font-family: 'times new roman', times, serif;">Bên trong công trình là một cỗ máy khổng lồ, hoạt động uyển chuyển, nhịp nhàng, ăn khớp với nhay để đảm bảo cho việc vận hoành toàn nhà luôn đạt hiệu suất cao và ổn định, qua đó, đem lại các tiện nghi với chất lượng tốt nhất cho người sử dụng.</span>

<span style="font-family: 'times new roman', times, serif;"><img class="wp-image-3585 alignleft" src="https://cms.tiemtourshagiang.com/wp-content/uploads/2025/06/design_idea_image_1-scaled.webp" alt="" width="508" height="508" /><img class="wp-image-3588 alignleft" src="https://cms.tiemtourshagiang.com/wp-content/uploads/2025/06/general_info_image_2_11zon-scaled.webp" alt="" width="511" height="511" /></span>


<span style="font-family: 'times new roman', times, serif;">Then, suddenly, it was all over. As China’s economy slowed amid months of COVID lockdowns, Wei’s employer made a wave of layoffs. Wei lost his job, and struggled to find a new one. Soon after, he had to leave Shenzhen for a cheaper city nearby. He appeared to be on a road to nowhere.</span>
<span style="font-family: 'times new roman', times, serif;">“I never said no to any assignments — my performance was one of the best,” Wei tells Sixth Tone.</span>
<table style="border-collapse: collapse; width: 100%;">
<tbody>
<tr>
<td style="width: 20%;"><span style="font-family: 'times new roman', times, serif;">title</span></td>
<td style="width: 20%;"><span style="font-family: 'times new roman', times, serif;">title</span></td>
<td style="width: 20%;"><span style="font-family: 'times new roman', times, serif;">title</span></td>
<td style="width: 20%;"><span style="font-family: 'times new roman', times, serif;">title</span></td>
<td style="width: 20%;"><span style="font-family: 'times new roman', times, serif;">title</span></td>
</tr>
<tr>
<td style="width: 20%;"><span style="font-family: 'times new roman', times, serif;">Water is the mother of tea, tools are the father of tea</span></td>
<td style="width: 20%;">
<ul>
 	<li><span style="font-family: 'times new roman', times, serif;">Water is the mother of tea, tools are the father of tea</span></li>
 	<li><span style="font-family: 'times new roman', times, serif;">Water is the mother of tea, tools are the father of tea</span></li>
</ul>
<ul>
 	<li><span style="font-family: 'times new roman', times, serif;">Water is the mother of tea, tools are the father of tea</span></li>
</ul>
</td>
<td style="width: 20%;"><span style="font-family: 'times new roman', times, serif;">Tanzanian music, particularly Bongo Flava, is popular not only within the country but also across East Africa. Traditional dance forms like "Ngoma" are also cherished, often performed during cultural festivals and celebrations. Tanzanian music, particularly Bongo Flava, is popular not only within the country but also across East Africa.</span></td>
<td style="width: 20%;"><span style="font-family: 'times new roman', times, serif;">content</span></td>
<td style="width: 20%;"><span style="font-family: 'times new roman', times, serif;">content</span></td>
</tr>
<tr>
<td style="width: 20%;"><span style="font-family: 'times new roman', times, serif;">Water is the mother of tea, tools are the father of tea</span></td>
<td style="width: 20%;"><span style="font-family: 'times new roman', times, serif;">content</span></td>
<td style="width: 20%;"><span style="font-family: 'times new roman', times, serif;">content</span></td>
<td style="width: 20%;"></td>
<td style="width: 20%;"></td>
</tr>
</tbody>
</table>
<h2><span style="font-family: 'times new roman', times, serif;">5. Lời kết</span></h2>
<span style="font-family: 'times new roman', times, serif;">Có thể nói, Landmark 81 chính là đại diện cho khát khao vươn cao, vươn xa tới sự thịnh vượng và phát triển của người Việt. Lần đầu tiên, người Việt đã xây dựng và sở hữu tòa nhà cao tầng trong top thế giới, đánh dấu một mốc mới đầy quan trọng trong sự phát triển và khẳng định khả năng của chúng ta.</span>
<h1><span style="font-family: 'times new roman', times, serif;">Heading 1</span></h1>
<h2><span style="font-family: 'times new roman', times, serif;">Heading 2</span></h2>
<h3><span style="font-family: 'times new roman', times, serif;">Heading 3</span></h3>
<h4><span style="font-family: 'times new roman', times, serif;">Heading 4</span></h4>
<h5><span style="font-family: 'times new roman', times, serif;">Heading 5</span></h5>
<h6><span style="font-family: 'times new roman', times, serif;">Heading 6</span></h6>`

/** Bọc mọi table trong div.table-wrapper để scroll ngang hoạt động */
function wrapTablesInWrapper(html: string) {
  return html.replace(/<table(?=\s|>)/gi, '<div class="table-wrapper"><table').replace(/<\/table>/gi, '</table></div>')
}

const Content = ({ content }: { content: string }) => {
  const t = useTranslations('DetailProjectPage')
  return (
    <section className='xsm:p-[2.4rem_0.8275rem] xsm:bg-[#F5F5F5] xsm:overflow-hidden relative p-[6.25rem_12.5rem] pr-[7.03rem]'>
      <div
        className='xsm:hidden absolute top-0 left-0 h-[10.36458rem] w-full opacity-15'
        style={{
          background: 'linear-gradient(180deg, #D9D9D9 0%, rgba(255, 255, 255, 0.00) 71.88%)',
        }}
      />
      <div
        className='xsm:hidden absolute bottom-0 left-0 h-[10.36458rem] w-full opacity-15'
        style={{
          background: 'linear-gradient(0deg, #D9D9D9 0%, rgba(255, 255, 255, 0.00) 71.88%)',
        }}
      />

      <h2 className='xsm:text-[1.25rem] relative text-[2.083rem] leading-[1.2] font-semibold tracking-[-0.03125rem] text-[#090909]'>
        {t('learnMore')}
      </h2>

      <div className='xsm:space-x-0 relative flex space-x-[2.86rem]'>
        <article
          id='project_detail'
          dangerouslySetInnerHTML={{ __html: wrapTablesInWrapper(content || '') }}
        />
        <div className='hidden sm:block'>
          <ShareSticky />
        </div>
      </div>
    </section>
  )
}

export default Content
