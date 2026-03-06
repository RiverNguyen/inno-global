'use client'

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

const STORAGE_KEY = 'inno-font-size-large-screen'
const DEFAULT_FONT_SIZE = '16'

export const FONT_SIZE_OPTIONS = Array.from({ length: 11 }, (_, i) => {
  const value = String(10 + i)
  const label = value === '16' ? `${value}px - Mặc định` : `${value}px`
  return { value, label }
})

export function applyFontSize(value: string) {
  if (typeof document === 'undefined') return
  document.documentElement.style.setProperty('--font-size-large-screen', `${value}px`)
}

type FontSizeContextType = {
  showModal: boolean
  openModal: () => void
  closeModal: () => void
  selectedSize: string
  setSelectedSize: (v: string) => void
  saveAndClose: () => void
  hasEntered: boolean
  isFirstVisit: boolean
}

const FontSizeContext = createContext<FontSizeContextType | null>(null)

export function FontSizeProvider({ children }: { children: ReactNode }) {
  const [showModal, setShowModal] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)
  const [selectedSize, setSelectedSize] = useState(DEFAULT_FONT_SIZE)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    queueMicrotask(() => setMounted(true))
    const saved = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
    if (saved) {
      applyFontSize(saved)
      queueMicrotask(() => setHasEntered(true))
      queueMicrotask(() => setSelectedSize(saved))
    } else {
      queueMicrotask(() => setShowModal(true))
    }
  }, [])

  const openModal = useCallback(() => {
    setShowModal(true)
  }, [])

  const closeModal = useCallback(() => {
    setShowModal(false)
  }, [])

  const saveAndClose = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, selectedSize)
    applyFontSize(selectedSize)
    setHasEntered(true)
    setShowModal(false)
  }, [selectedSize])

  return (
    <FontSizeContext.Provider
      value={{
        showModal: mounted ? showModal : false,
        openModal,
        closeModal,
        selectedSize,
        setSelectedSize,
        saveAndClose,
        hasEntered,
        isFirstVisit: mounted && !hasEntered && showModal,
      }}
    >
      {children}
    </FontSizeContext.Provider>
  )
}

export function useFontSize() {
  const ctx = useContext(FontSizeContext)
  if (!ctx) throw new Error('useFontSize must be used within FontSizeProvider')
  return ctx
}
