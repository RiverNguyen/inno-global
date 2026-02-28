'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { forgotPassword } from '@/actions/forgotPasswordForm'
import ButtonRed from '@/components/custom/ButtonRed'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export default function FormForgotPassword() {
  const t = useTranslations('ForgotPasswordPage')
  const locale = useLocale()
  const router = useRouter()
  const formSchema = z.object({
    email: z.string().min(1, t('validateEmail')).email(t('validateEmailFormat')),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await forgotPassword(values)
    if (res?.success) {
      toast.success(t('success'))
      form.reset()
      router.push(`${locale === 'vi' ? '/xac-thuc-otp' : 'verify-otp'}?email=${values.email}`)
    } else {
      toast.error(res?.message ?? t('error'))
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='xsm:space-y-[0.83rem] space-y-[1.0375rem]'
      >
        <Field className='xsm:w-full w-[36.0625rem] gap-0 space-y-[0.3125rem]'>
          <FieldLabel
            className='xsm:text-[0.72rem] xsm:tracking-[-0.01458rem] text-[0.83rem] leading-[1.5] tracking-[-0.0167rem] text-[#090909]'
            htmlFor='email'
          >
            Email<span className='xsm:translate-x-[-0.3rem] translate-x-[-0.15rem] text-[#D32F2F]'>*</span>
          </FieldLabel>
          <Input
            id='email'
            disabled={form.formState.isSubmitting}
            placeholder={t('placeholderEmail')}
            className='xsm:h-[2.083rem] xsm:p-[0.72rem_0.625rem] xsm:rounded-[0.41rem] xsm:bg-[#f0f0f0] xsm:placeholder:text-[0.625rem] h-[2.91667rem] rounded-[0.4167rem] border-[#090909]/8 bg-white p-[0.83rem_0.625rem] text-[0.83rem] leading-[1.5] tracking-[-0.0167rem] shadow-none placeholder:text-[#090909]/40 focus-visible:ring-0 focus-visible:ring-offset-0'
            {...form.register('email')}
          />

          <FieldError className='xsm:text-[0.625rem]'>{form.formState.errors.email?.message}</FieldError>
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
