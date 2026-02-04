export default function ICClose(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      {...props}
    >
      <path
        d='M3.33398 3.33301L12.6667 12.6657'
        stroke='#090909'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M3.33331 12.6657L12.666 3.33301'
        stroke='#090909'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
