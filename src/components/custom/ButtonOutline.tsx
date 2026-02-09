import { cn } from '@/lib/utils'

export default function ButtonOutline({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'rounded-[5.20833rem] relative w-fit overflow-hidden group shadow-[0_0_2px_0_rgba(0,_0,_0,_0.10),_0_1px_8px_0_rgba(0,_0,_0,_0.10)] backdrop-blur-[6px] h-[2.08333rem] px-[1.15rem] border border-solid border-text-60 flex-center space-x-[0.36rem] pc-button-14-r text-text-60',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
