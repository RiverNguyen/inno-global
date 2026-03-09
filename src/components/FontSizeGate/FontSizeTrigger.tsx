'use client'

import { useFontSize } from '@/contexts/FontSizeContext'

export default function FontSizeTrigger() {
  const { openModal } = useFontSize()

  return (
    <button
      type='button'
      onClick={openModal}
      className="relative inline-block pb-[0.1rem] text-[0.625rem] leading-[1.4] tracking-[-0.00625rem] text-[#090909] after:absolute after:bottom-0 after:left-0 after:h-[0.10417rem] after:w-full after:origin-left after:scale-x-0 after:bg-[#E00000] after:transition-transform after:duration-300 after:ease-out after:content-[''] hover:after:scale-x-100 focus-visible:after:scale-x-100"
    >
      Cỡ chữ
    </button>
  )
}
