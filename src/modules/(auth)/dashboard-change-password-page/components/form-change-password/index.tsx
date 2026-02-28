'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocalStorage } from '@uidotdev/usehooks'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { resetPasswordWithOtp } from '@/actions/resetPasswordWithOtp'
import ButtonRed from '@/components/custom/ButtonRed'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Form } from '@/components/ui/form'
import { PasswordInput } from '@/components/ui/password-input'

type VerifiedOtpPayload = {
  otp: string
  email: string | null
  savedAt: number
  expiresAt: number
}

export default function FormChangePassword() {
  const t = useTranslations('ChangePasswordPage')

  const formSchema = z
    .object({
      new_password: z.string().min(6, t('validatePasswordLength')),
      confirm_password: z.string().min(6, t('validateConfirmPasswordLength')),
    })
    .refine((data) => data.new_password === data.confirm_password, {
      message: t('validateConfirmPassword'),
      path: ['confirm_password'],
    })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      new_password: '',
      confirm_password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {

  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-[1.0375rem] w-full'
      >
        <Field className='gap-0 space-y-[0.3125rem]'>
          <FieldLabel
            className='text-[#090909] text-[0.83rem] leading-[1.5] tracking-[-0.0167rem] xsm:text-[0.72rem] xsm:tracking-[-0.01458rem]'
            htmlFor='password'
          >
            {t('labelPassword')}
            <span className='text-[#D32F2F] translate-x-[-0.15rem] xsm:translate-x-[-0.3rem]'>*</span>
          </FieldLabel>
          <PasswordInput
            id='password'
            disabled={form.formState.isSubmitting}
            placeholder={t('placeholderPassword')}
            className='xsm:h-[2.083rem] xsm:p-[0.72rem_0.625rem] xsm:rounded-[0.41rem] xsm:bg-[#f0f0f0] xsm:placeholder:text-[0.625rem] h-[2.91667rem] p-[0.83rem_0.625rem] rounded-[0.4167rem] bg-white shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 border-[#090909]/8 placeholder:text-[#090909]/40 text-[0.83rem] leading-[1.5] tracking-[-0.0167rem]'
            {...form.register('new_password')}
          />

          <FieldError className='xsm:text-[0.625rem]'>{form.formState.errors.new_password?.message}</FieldError>
        </Field>
        <Field className='gap-0 space-y-[0.3125rem]'>
          <FieldLabel
            className='text-[#090909] text-[0.83rem] leading-[1.5] tracking-[-0.0167rem] xsm:text-[0.72rem] xsm:tracking-[-0.01458rem]'
            htmlFor='password'
          >
            {t('labelPassword')}
            <span className='text-[#D32F2F] translate-x-[-0.15rem] xsm:translate-x-[-0.3rem]'>*</span>
          </FieldLabel>
          <PasswordInput
            id='password'
            disabled={form.formState.isSubmitting}
            placeholder={t('placeholderPassword')}
            className='xsm:h-[2.083rem] xsm:p-[0.72rem_0.625rem] xsm:rounded-[0.41rem] xsm:bg-[#f0f0f0] xsm:placeholder:text-[0.625rem] h-[2.91667rem] p-[0.83rem_0.625rem] rounded-[0.4167rem] bg-white shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 border-[#090909]/8 placeholder:text-[#090909]/40 text-[0.83rem] leading-[1.5] tracking-[-0.0167rem]'
            {...form.register('new_password')}
          />

          <FieldError className='xsm:text-[0.625rem]'>{form.formState.errors.new_password?.message}</FieldError>
        </Field>
        <Field className='gap-0 space-y-[0.3125rem]'>
          <FieldLabel
            className='text-[#090909] text-[0.83rem] leading-[1.5] tracking-[-0.0167rem] xsm:text-[0.72rem] xsm:tracking-[-0.01458rem]'
            htmlFor='password'
          >
            {t('labelConfirmPassword')}
            <span className='text-[#D32F2F] translate-x-[-0.15rem] xsm:translate-x-[-0.3rem]'>*</span>
          </FieldLabel>
          <PasswordInput
            id='confirmPassword'
            disabled={form.formState.isSubmitting}
            placeholder={t('placeholderConfirmPassword')}
            className='xsm:h-[2.083rem] xsm:p-[0.72rem_0.625rem] xsm:rounded-[0.41rem] xsm:bg-[#f0f0f0] xsm:placeholder:text-[0.625rem] h-[2.91667rem] p-[0.83rem_0.625rem] rounded-[0.4167rem] bg-white shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 border-[#090909]/8 placeholder:text-[#090909]/40 text-[0.83rem] leading-[1.5] tracking-[-0.0167rem]'
            {...form.register('confirm_password')}
          />
          <FieldError className='xsm:text-[0.625rem]'>{form.formState.errors.confirm_password?.message}</FieldError>
        </Field>

        <ButtonRed
          type='submit'
          className={`h-[2.6rem] xsm:mt-[0.63rem] text-[0.73rem] leading-[1.5] xsm:h-[2.083rem] w-full ${form.formState.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className='size-[1.25rem] animate-spin mr-2' /> {t('loading')}
            </>
          ) : (
            t('submit')
          )}
        </ButtonRed>
      </form>
    </Form>
  )
}
