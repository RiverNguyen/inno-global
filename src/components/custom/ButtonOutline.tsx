import { cn } from '@/lib/utils'

export default function ButtonOutline({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'group border-text-60 flex-center pc-button-14-r text-text-60 relative h-[2.08333rem] w-fit space-x-[0.36rem] overflow-hidden rounded-[5.20833rem] border border-solid px-[1.15rem] shadow-[0_0_2px_0_rgba(0,_0,_0,_0.10),_0_1px_8px_0_rgba(0,_0,_0,_0.10)] backdrop-blur-[6px]',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
