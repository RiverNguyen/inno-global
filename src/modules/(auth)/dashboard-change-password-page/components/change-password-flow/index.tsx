'use client'

import dynamic from 'next/dynamic'
import { User } from 'next-auth'
import { useState } from 'react'

import FormChangePassword from '@/modules/(auth)/dashboard-change-password-page/components/form-change-password'

const FormVerifyOTP = dynamic(
  () => import('@/modules/(auth)/dashboard-change-password-page/components/form-verify-otp'),
  { ssr: false },
)

type Step = 'verify' | 'change'

export default function ChangePasswordFlow({ user }: { user?: User['user'] }) {
  const [step, setStep] = useState<Step>('verify')

  if (step === 'change') {
    return <FormChangePassword />
  }

  return (
    <FormVerifyOTP
      user={user}
      onSuccess={() => setStep('change')}
    />
  )
}
