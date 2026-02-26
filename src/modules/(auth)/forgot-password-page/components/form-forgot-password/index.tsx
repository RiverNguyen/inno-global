'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
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
      router.push(`/xac-thuc-otp?email=${values.email}`)
    } else {
      toast.error(res?.message ?? t('error'))
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-[1.0375rem]'
      >
        <Field className='gap-0 space-y-[0.3125rem] w-[36.0625rem]'>
          <FieldLabel
            className='text-[#090909] text-[0.83rem] leading-[1.5] tracking-[-0.0167rem]'
            htmlFor='email'
          >
            Email<span className='text-[#D32F2F] translate-x-[-0.15rem]'>*</span>
          </FieldLabel>
          <Input
            id='email'
            disabled={form.formState.isSubmitting}
            placeholder={t('placeholderEmail')}
            className='h-[2.91667rem] p-[0.83rem_0.625rem] rounded-[0.4167rem] bg-white shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 border-[#090909]/8 placeholder:text-[#090909]/40 text-[0.83rem] leading-[1.5] tracking-[-0.0167rem]'
            {...form.register('email')}
          />

          <FieldError>{form.formState.errors.email?.message}</FieldError>
        </Field>
        <ButtonRed
          type='submit'
          className={`h-[2.6rem] w-full ${form.formState.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
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
