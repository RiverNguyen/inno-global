'use client'

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FONT_SIZE_OPTIONS, applyFontSize, useFontSize } from '@/contexts/FontSizeContext'

function FontSizeModal() {
  const { showModal, selectedSize, setSelectedSize, saveAndClose, isFirstVisit } = useFontSize()

  if (!showModal) return null

  return (
    <div className='fixed inset-0 z-[9999] flex items-center justify-center bg-background'>
      <div className='mx-4 flex max-w-md flex-col gap-6 rounded-lg border bg-card p-8 shadow-lg'>
        <h2 className='text-lg font-semibold text-foreground'>Chọn kích thước chữ (màn hình ≥ 1600px)</h2>
        <p className='text-sm text-muted-foreground'>Thiết lập này áp dụng cho màn hình rộng từ 1600px trở lên.</p>
        <Select
          value={selectedSize}
          onValueChange={(v) => {
            setSelectedSize(v)
            applyFontSize(v)
          }}
        >
          <SelectTrigger className='w-full'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className='z-[10000]'>
            {FONT_SIZE_OPTIONS.map((opt) => (
              <SelectItem
                key={opt.value}
                value={opt.value}
              >
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={saveAndClose}
          className='w-full'
        >
          {isFirstVisit ? 'Vào website' : 'Áp dụng'}
        </Button>
      </div>
    </div>
  )
}

export default function FontSizeGate({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FontSizeModal />
      {children}
    </>
  )
}
