import { cn } from '@/lib/utils'

export default function ButtonRed({ className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'group relative h-[2.08333rem] w-fit overflow-hidden rounded-[5.20833rem] px-[1.15rem] shadow-[0_0_2px_0_rgba(0,_0,_0,_0.10),_0_1px_8px_0_rgba(0,_0,_0,_0.10)] backdrop-blur-[6px]',
        className,
      )}
      {...props}
    >
      <div className='bg-gr-2-reverse absolute top-0 left-0 size-full opacity-0 transition-all duration-300 lg:group-hover:opacity-100'></div>
      <div className='bg-gr-2 absolute top-0 left-0 size-full opacity-100 transition-all duration-300 lg:group-hover:opacity-0'></div>
      <div className='flex-center pc-button-14-r relative z-[2] size-full space-x-[0.36rem] text-white'>{children}</div>
    </button>
  )
}
