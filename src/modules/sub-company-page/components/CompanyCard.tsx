import Image from 'next/image'

export default function CompanyCard({
  image,
  title,
  description,
}: {
  image: string
  title: string
  description: string
}) {
  return (
    <div className='group relative overflow-hidden bg-white shadow-[0_0_2px_0_rgba(145,158,171,0.20),0_12px_24px_-4px_rgba(222,222,222,0.13)]'>
      <div className='h-[11.30208rem] w-[17.8125rem] overflow-hidden'>
        <Image
          src={image}
          alt={''}
          width={342}
          height={217}
          className='size-full object-cover transition duration-500 ease-[cubic-bezier(0.44,0,0,0.99)] lg:group-hover:scale-112'
        />
      </div>
      <div className='xsm:p-[0.83333rem_1.04167rem_1.25rem_1.04167rem] p-[0.9375rem_1.25rem_1.25rem_1.25rem]'>
        <h3 className='xsm:text-[1.04167rem] font-open-sans mb-[0.52083rem] text-[1.04167rem] leading-[150%] font-semibold transition duration-500 ease-[cubic-bezier(0.44,0,0,0.99)] lg:group-hover:text-[#D32F2F]'>
          {title}
        </h3>
        <article
          className='font-open-sans text-[0.72917rem] leading-[150%] text-[rgba(9,9,9,0.6)] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]'
          dangerouslySetInnerHTML={{ __html: description }}
        ></article>
      </div>
    </div>
  )
}
