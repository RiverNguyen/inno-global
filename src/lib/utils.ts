import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertRemToPx(rem: number) {
  if (typeof window === 'undefined' || !document?.documentElement) {
    return
  }

  const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
  return rem * rootFontSize
}

export function formatDateDDMMYYYY(dateStr: string | undefined): string {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return dateStr
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}.${month}.${year}`
}

/**
 * Convert ISO 8601 string -> Unix timestamp
 * @param iso ISO string, vd: "2025-09-04T08:04:38+00:00"
 * @param unit 's' => seconds (default), 'ms' => milliseconds
 */
export function isoToUnixTimestamp(iso: string, unit: 's' | 'ms' = 's'): number {
  const ms = Date.parse(iso) // milliseconds since 1970-01-01T00:00:00Z
  if (Number.isNaN(ms)) {
    throw new Error(`Invalid ISO date string: ${iso}`)
  }
  return unit === 's' ? Math.floor(ms / 1000) : ms
}

export function formatDateToDDMMYYYY(dateStr?: string): string {
  if (!dateStr) return '-'

  const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (!match) return dateStr

  const [, year, month, day] = match

  return `${day}/${month}/${year}`
}
