'use client'

import { User } from 'next-auth'
import { useState } from 'react'

import FormChangePassword from '@/modules/(auth)/dashboard-change-password-page/components/form-change-password'
import FormVerifyOTP from '@/modules/(auth)/dashboard-change-password-page/components/form-verify-otp'

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
