import { cn } from '@/lib/utils'

export default function ButtonRed({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'rounded-[5.20833rem] relative w-fit overflow-hidden group shadow-[0_0_2px_0_rgba(0,_0,_0,_0.10),_0_1px_8px_0_rgba(0,_0,_0,_0.10)] backdrop-blur-[6px] h-[2.08333rem] px-[1.15rem]',
        className,
      )}
      {...props}
    >
      <div className='transition-all duration-300 bg-gr-2-reverse size-full absolute top-0 left-0 lg:group-hover:opacity-100 opacity-0'></div>
      <div className='transition-all duration-300 bg-gr-2 size-full absolute top-0 left-0 lg:group-hover:opacity-0 opacity-100'></div>
      <div className='size-full relative z-[2] flex-center space-x-[0.36rem] pc-button-14-r text-white'>
        {children}
      </div>
    </button>
  )
}
