'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocalStorage } from '@uidotdev/usehooks'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { forgotPassword } from '@/actions/forgotPasswordForm'
import { verifyOtp } from '@/actions/verifyOtpForm'
import ButtonRed from '@/components/custom/ButtonRed'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const RESEND_OTP_COOLDOWN_MS = 60_000
const RESEND_OTP_LS_KEY_PREFIX = 'verifyOtp:resendUntil:'
const VERIFIED_OTP_LS_KEY_PREFIX = 'verifyOtp:otp'
const VERIFIED_OTP_TTL_MS = 5 * 60_000

type VerifiedOtpPayload = {
  otp: string
  email: string | null
  savedAt: number
  expiresAt: number
}

export default function FormVerifyOTP({ email }: { email?: string }) {
  const t = useTranslations('VerifyOTPPage')
  const locale = useLocale()
  const router = useRouter()
  const resendOtpStorageKey = `${RESEND_OTP_LS_KEY_PREFIX}${email ?? 'unknown'}`
  const [resendUntil, setResendUntil] = useLocalStorage<number>(resendOtpStorageKey, 0)
  const [resendSecondsLeft, setResendSecondsLeft] = useState<number>(0)
  const [isResendingOtp, setIsResendingOtp] = useState(false)
  const formSchema = z.object({
    otp: z.string().min(1, t('validateOTP')),
    email: z.string().optional(),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
      email: email ?? '',
    },
  })

  const verifiedOtpStorageKey = `${VERIFIED_OTP_LS_KEY_PREFIX}`
  const [, setVerifiedOtp] = useLocalStorage<VerifiedOtpPayload | null>(verifiedOtpStorageKey, null)

  const didInitResendCooldownKeyRef = useRef<string | null>(null)
  useEffect(() => {
    // Disable resend for the first 60s when entering the page (per email/key).
    // Important: do NOT restart cooldown when it naturally reaches 0.
    if (didInitResendCooldownKeyRef.current === resendOtpStorageKey) return
    didInitResendCooldownKeyRef.current = resendOtpStorageKey

    const now = Date.now()
    if (!resendUntil || resendUntil <= now) setResendUntil(now + RESEND_OTP_COOLDOWN_MS)
  }, [resendOtpStorageKey, resendUntil, setResendUntil])

  useEffect(() => {
    // Best-effort cleanup of expired stored OTP for this email.
    // (We don't keep the value in state here to avoid extra re-renders.)
    try {
      const raw = window.localStorage.getItem(verifiedOtpStorageKey)
      if (!raw) return
      const parsed = JSON.parse(raw) as Partial<VerifiedOtpPayload>
      if (typeof parsed.expiresAt === 'number' && parsed.expiresAt <= Date.now()) {
        window.localStorage.removeItem(verifiedOtpStorageKey)
      }
    } catch {
      // ignore
    }
  }, [verifiedOtpStorageKey])

  useEffect(() => {
    if (!resendUntil) {
      setResendSecondsLeft(0)
      return
    }

    const tick = () => {
      const remainMs = resendUntil - Date.now()
      if (remainMs <= 0) {
        setResendUntil(0)
        setResendSecondsLeft(0)
        return
      }
      setResendSecondsLeft(Math.ceil(remainMs / 1000))
    }

    tick()
    const id = window.setInterval(tick, 250)
    return () => window.clearInterval(id)
  }, [resendUntil, setResendUntil])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await verifyOtp(values)
    if (res?.success) {
      toast.success(t('success'))
      const now = Date.now()
      setVerifiedOtp({
        otp: values.otp,
        email: email ?? null,
        savedAt: now,
        expiresAt: now + VERIFIED_OTP_TTL_MS,
      })
      form.reset()
      router.push(`${locale === 'vi' ? '/doi-mat-khau' : 'change-password'}`)
    } else {
      toast.error(res?.message ?? t('error'))
    }
  }

  async function handleResendOTP() {
    if (form.formState.isSubmitting || isResendingOtp || resendSecondsLeft > 0) return

    setIsResendingOtp(true)
    const nextUntil = Date.now() + RESEND_OTP_COOLDOWN_MS
    setResendUntil(nextUntil)
    try {
      const res = await forgotPassword({ email: email ?? '' })
      if (res?.success) {
        toast.success(t('resendOTPSuccess'))
      } else {
        toast.error(res?.message ?? t('resendOTPError'))
        setResendUntil(0)
      }
    } catch {
      toast.error(t('resendOTPError'))
      setResendUntil(0)
    } finally {
      setIsResendingOtp(false)
    }
  }

  const isResendDisabled = form.formState.isSubmitting || isResendingOtp || resendSecondsLeft > 0

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='xsm:space-y-[1.25rem] space-y-[1.0375rem]'
      >
        <input
          type='hidden'
          {...form.register('email')}
        />
        <Field className='gap-0 space-y-[0.3125rem]'>
          <FieldLabel
            className='xsm:text-[0.72rem] xsm:tracking-[-0.01458rem] text-[0.83rem] leading-[1.5] tracking-[-0.0167rem] text-[#090909]'
            htmlFor='otp'
          >
            {t('label')}
            <span className='xsm:translate-x-[-0.3rem] translate-x-[-0.15rem] text-[#D32F2F]'>*</span>
          </FieldLabel>
          <div className='xsm:space-x-[0.625rem] flex items-center space-x-[1.25rem]'>
            <Input
              id='otp'
              disabled={form.formState.isSubmitting}
              placeholder={t('placeholderOTP')}
              className='xsm:h-[2.083rem] xsm:p-[0.72rem_0.625rem] xsm:rounded-[0.41rem] xsm:bg-[#f0f0f0] xsm:placeholder:text-[0.625rem] h-[2.91667rem] rounded-[0.4167rem] border-[#090909]/8 bg-white p-[0.83rem_0.625rem] text-[0.83rem] leading-[1.5] tracking-[-0.0167rem] shadow-none placeholder:text-[#090909]/40 focus-visible:ring-0 focus-visible:ring-offset-0'
              {...form.register('otp')}
            />
            <button
              type='button'
              onClick={handleResendOTP}
              disabled={isResendDisabled}
              className='xsm:h-[2.083rem] flex-center h-[2.91667rem] rounded-[5.2rem] border border-[#090909]/60 px-[1.15rem] text-[0.72rem] leading-[1.5] whitespace-nowrap text-[#090909]/60 disabled:cursor-not-allowed disabled:opacity-50'
            >
              {t('resendOTP')}
              {resendSecondsLeft > 0 ? ` (${resendSecondsLeft}s)` : ''}
            </button>
          </div>

          <FieldError className='xsm:text-[0.625rem]'>{form.formState.errors.otp?.message}</FieldError>
        </Field>
        <ButtonRed
          type='submit'
          className={`xsm:mt-[0.63rem] xsm:h-[2.083rem] h-[2.6rem] w-full text-[0.73rem] leading-[1.5] ${form.formState.isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className='mr-2 size-[1.25rem] animate-spin' /> {t('loading')}
            </>
          ) : (
            t('submit')
          )}
        </ButtonRed>
      </form>
    </Form>
  )
}
