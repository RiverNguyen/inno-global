'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { loginForm } from '@/actions/loginForm'
import ButtonRed from '@/components/custom/ButtonRed'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'

export default function FormLogin() {
  const t = useTranslations('LoginPage')
  const router = useRouter()

  const formSchema = z.object({
    username: z.string().min(1, t('validateUsername')),
    password: z.string().min(1, t('validatePassword')),
    remember_me: z.boolean().optional(),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
      remember_me: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await loginForm({
      username: values.username,
      password: values.password,
    })

    if (res?.ok) {
      toast.success(t('success'))
      router.replace('/')
      return
    }

    toast.error(res?.message ?? t('error'))
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-[1.0375rem]'
      >
        <Field className='gap-0 space-y-[0.3125rem]'>
          <FieldLabel
            className='text-[#090909] text-[0.83rem] leading-[1.5] tracking-[-0.0167rem]'
            htmlFor='username'
          >
            {t('username')}
            <span className='text-[#D32F2F] translate-x-[-0.15rem]'>*</span>
          </FieldLabel>
          <Input
            id='username'
            disabled={form.formState.isSubmitting}
            placeholder={t('placeholderUsername')}
            className='h-[2.91667rem] p-[0.83rem_0.625rem] rounded-[0.4167rem] bg-white shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 border-[#090909]/8 placeholder:text-[#090909]/40 text-[0.83rem] leading-[1.5] tracking-[-0.0167rem]'
            {...form.register('username')}
          />

          <FieldError>{form.formState.errors.username?.message}</FieldError>
        </Field>
        <Field className='gap-0 space-y-[0.3125rem]'>
          <FieldLabel
            className='text-[#090909] text-[0.83rem] leading-[1.5] tracking-[-0.0167rem]'
            htmlFor='password'
          >
            {t('password')}
            <span className='text-[#D32F2F] translate-x-[-0.15rem]'>*</span>
          </FieldLabel>
          <PasswordInput
            id='password'
            disabled={form.formState.isSubmitting}
            placeholder={t('placeholderPassword')}
            className='h-[2.91667rem] p-[0.83rem_0.625rem] rounded-[0.4167rem] bg-white shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 border-[#090909]/8 placeholder:text-[#090909]/40 text-[0.83rem] leading-[1.5] tracking-[-0.0167rem]'
            {...form.register('password')}
          />
          <FieldError>{form.formState.errors.password?.message}</FieldError>
        </Field>
        <Field>
          <div className='flex flex-row items-center justify-between pl-[0.42rem]'>
            <div className='flex flex-row items-center gap-2'>
              <Controller
                control={form.control}
                name='remember_me'
                render={({ field }) => (
                  <Checkbox
                    id='remember_me'
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked === true)}
                    onBlur={field.onBlur}
                    className='size-[1.25rem] data-[state=checked]:bg-transparent data-[state=checked]:text-[#D32F2F] data-[state=checked]:border-[#D32F2F]'
                  />
                )}
              />
              <FieldLabel
                className='text-[#090909] text-[0.83rem] leading-[1.5] tracking-[-0.0167rem]'
                htmlFor='remember_me'
              >
                {t('rememberMe')}
              </FieldLabel>
            </div>
            <Link
              href='/forgot-password'
              className='text-[#090909] text-[0.83rem] leading-[1.5] tracking-[-0.0167rem]'
            >
              {t('forgotPassword')}
            </Link>
            <FieldError>{form.formState.errors.remember_me?.message}</FieldError>
          </div>
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
