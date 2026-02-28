'use client'

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default function SessionSyncOnMount() {
  const { update } = useSession()

  useEffect(() => {
    // Sync client session after navigation (e.g. after server-action signIn)
    void update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
