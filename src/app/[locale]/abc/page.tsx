import Link from 'next/link'
import React from 'react'

export function generateStaticParams() {
  return [{ locale: 'vi' }]
}

export default function page() {
  return (
    <div>
      <Link href='/'>Home</Link>
    </div>
  )
}
