'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocalStorage } from '@uidotdev/usehooks'
import { Loader2 } from 'lucide-react'
import { User } from 'next-auth'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { forgotPassword } from '@/actions/forgotPasswordForm'
import { verifyOtp } from '@/actions/verifyOtpForm'
import ButtonRed from '@/components/custom/ButtonRed'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import BackButton from '@/modules/(auth)/dashboard/_components/back-button'

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

type FormVerifyOTPProps = {
  user?: User['user']
  onSuccess?: () => void
}

export default function FormVerifyOTP({ user, onSuccess }: FormVerifyOTPProps) {
  const { data: session } = useSession()
  const t = useTranslations('DashboardChangePasswordPage')
  const resendOtpStorageKey = `${RESEND_OTP_LS_KEY_PREFIX}${user?.email ?? 'unknown'}`
  const [resendUntil, setResendUntil] = useLocalStorage<number>(resendOtpStorageKey, 0)
  const [resendSecondsLeft, setResendSecondsLeft] = useState<number>(0)
  const [isResendingOtp, setIsResendingOtp] = useState(false)
  const formSchema = z.object({
    otp: z.string().min(6, t('validateOTPLength')),
    email: z.string().optional(),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
      email: user?.email ?? '',
    },
  })

  const verifiedOtpStorageKey = `${VERIFIED_OTP_LS_KEY_PREFIX}`
  const [, setVerifiedOtp] = useLocalStorage<VerifiedOtpPayload | null>(verifiedOtpStorageKey, null)

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
        email: user?.email ?? null,
        savedAt: now,
        expiresAt: now + VERIFIED_OTP_TTL_MS,
      })
      form.reset()
      if (onSuccess) {
        onSuccess()
      } else {
        toast.error(res?.message ?? t('error'))
      }
    } else {
      toast.error(res?.message ?? t('error'))
    }
  }

  async function handleResendOTP() {
    if (form.formState.isSubmitting || isResendingOtp || resendSecondsLeft > 0) return

    setIsResendingOtp(true)
    try {
      const res = await forgotPassword({ email: user?.email ?? '' })
      if (res?.success) {
        toast.success(t('resendOTPSuccess'))
        setResendUntil(Date.now() + RESEND_OTP_COOLDOWN_MS)
      } else {
        toast.error(res?.message ?? t('resendOTPError'))
      }
    } catch {
      toast.error(t('resendOTPError'))
    } finally {
      setIsResendingOtp(false)
    }
  }

  const isResendDisabled = form.formState.isSubmitting || isResendingOtp || resendSecondsLeft > 0

  return (
    <section className='xsm:pt-[3.54rem]'>
      <h1 className='xsm:flex xsm:text-[0.83rem] xsm:mb-[2.29rem] xsm:text-[#333] mb-[1.25rem] text-[1.45rem] leading-[1.5] font-semibold text-[#090909]'>
        <BackButton className='translate-y-[0.1rem]' />
        {t('title')}
      </h1>
      <div className='flex-y-center space-x-[0.62rem]'>
        <div className='relative size-[2.5rem] overflow-hidden rounded-full border border-[#D32F2F]'>
          <Avatar className='size-full object-cover'>
            <AvatarImage
              src={user?.avatar_512 || ''}
              className='object-cover'
            />
            <AvatarFallback>
              <Skeleton className='size-full rounded-full' />
            </AvatarFallback>
          </Avatar>
        </div>
        <div className=''>
          <p className='xsm:leading-[1.2] xsm:tracking-normal xsm:font-normal text-[0.83rem] leading-[1.5] tracking-[-0.0167rem] text-[#090909]'>
            {user?.display_name || '---'}
          </p>
          <p className='text-[0.72917rem] leading-[1.5] text-[#090909]/40'>ID: {session?.user?.user_code}</p>
        </div>
      </div>
      <div className='xsm:mb-[1.25rem] xsm:text-[0.625rem] mt-[0.89rem] mb-[1.35rem] text-[0.83rem] leading-[1.5] tracking-[-0.0167rem] text-[#090909]/80'>
        <p>
          {t('desc1')} <br className='lg:hidden' />
          <strong className='xsm:text-[0.729rem] leading-[1.3] font-semibold tracking-[-0.00833rem] text-[#090909]'>
            {user?.email}
          </strong>
        </p>
        <p>{t('desc2')}</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                className='xsm:h-[2.083rem] xsm:p-[0.72rem_0.625rem] xsm:rounded-[0.41rem] xsm:placeholder:text-[0.625rem] h-[2.91667rem] max-w-[22.1875rem] rounded-[0.4167rem] border-[#090909]/8 bg-[#f0f0f0] p-[0.83rem_0.625rem] text-[0.83rem] leading-[1.5] tracking-[-0.0167rem] shadow-none placeholder:text-[#090909]/40 focus-visible:ring-0 focus-visible:ring-offset-0'
                {...form.register('otp')}
              />
              <button
                type='button'
                onClick={handleResendOTP}
                disabled={isResendDisabled}
                className='xsm:h-[2.083rem] flex-center xsm:min-w-[7.23rem] h-[2.91667rem] rounded-[5.2rem] border border-[#090909]/60 px-[1.15rem] text-[0.72rem] leading-[1.5] whitespace-nowrap text-[#090909]/60 disabled:cursor-not-allowed disabled:opacity-50'
              >
                {t('resendOTP')}
                {resendSecondsLeft > 0 ? ` (${resendSecondsLeft}s)` : ''}
              </button>
            </div>

            <FieldError className='xsm:text-[0.625rem]'>{form.formState.errors.otp?.message}</FieldError>
          </Field>
          <ButtonRed
            type='submit'
            className={`xsm:mt-[1.25rem] xsm:w-full xsm:h-[2.083rem] mt-[1.35rem] h-[2.6rem] min-w-[8rem] text-[0.73rem] leading-[1.5] ${form.formState.isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
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
    </section>
  )
}
