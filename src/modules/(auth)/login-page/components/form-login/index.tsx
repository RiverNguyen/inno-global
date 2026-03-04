'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'nextjs-toploader/app'
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
import { Link } from '@/i18n/navigation'

export default function FormLogin() {
  const t = useTranslations('LoginPage')
  const router = useRouter()
  const locale = useLocale()

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
      router.push(locale === 'vi' ? '/' : '/en')
      form.reset()
      return
    }

    toast.error(res?.message ?? t('error'))
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='xsm:space-y-[0.83rem] space-y-[1.0375rem]'
      >
        <Field className='gap-0 space-y-[0.3125rem]'>
          <FieldLabel
            className='xsm:text-[0.72rem] xsm:tracking-[-0.01458rem] text-[0.83rem] leading-[1.5] tracking-[-0.0167rem] text-[#090909]'
            htmlFor='username'
          >
            {t('username')}
            <span className='xsm:translate-x-[-0.3rem] translate-x-[-0.15rem] text-[#D32F2F]'>*</span>
          </FieldLabel>
          <Input
            id='username'
            disabled={form.formState.isSubmitting}
            placeholder={t('placeholderUsername')}
            className='xsm:h-[2.083rem] xsm:p-[0.72rem_0.625rem] xsm:rounded-[0.41rem] xsm:bg-[#f0f0f0] xsm:placeholder:text-[0.625rem] h-[2.91667rem] rounded-[0.4167rem] border-[#090909]/8 bg-white p-[0.83rem_0.625rem] text-[0.83rem] leading-[1.5] tracking-[-0.0167rem] shadow-none placeholder:text-[#090909]/40 focus-visible:ring-0 focus-visible:ring-offset-0'
            {...form.register('username')}
          />

          <FieldError className='xsm:text-[0.625rem]'>{form.formState.errors.username?.message}</FieldError>
        </Field>
        <Field className='gap-0 space-y-[0.3125rem]'>
          <FieldLabel
            className='xsm:text-[0.72rem] xsm:tracking-[-0.01458rem] text-[0.83rem] leading-[1.5] tracking-[-0.0167rem] text-[#090909]'
            htmlFor='password'
          >
            {t('password')}
            <span className='xsm:translate-x-[-0.3rem] translate-x-[-0.15rem] text-[#D32F2F]'>*</span>
          </FieldLabel>
          <PasswordInput
            id='password'
            disabled={form.formState.isSubmitting}
            placeholder={t('placeholderPassword')}
            className='xsm:h-[2.083rem] xsm:p-[0.72rem_0.625rem] xsm:rounded-[0.41rem] xsm:bg-[#f0f0f0] xsm:placeholder:text-[0.625rem] h-[2.91667rem] rounded-[0.4167rem] border-[#090909]/8 bg-white p-[0.83rem_0.625rem] text-[0.83rem] leading-[1.5] tracking-[-0.0167rem] shadow-none placeholder:text-[#090909]/40 focus-visible:ring-0 focus-visible:ring-offset-0'
            {...form.register('password')}
          />
          <FieldError className='xsm:text-[0.625rem]'>{form.formState.errors.password?.message}</FieldError>
        </Field>
        <Field>
          <div className='xsm:pl-[0.3rem] flex flex-row items-center justify-between pl-[0.42rem]'>
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
                    className='xsm:size-4 xsm:rounded-[0.25rem] size-[1.25rem] data-[state=checked]:border-[#D32F2F] data-[state=checked]:bg-transparent data-[state=checked]:text-[#D32F2F]'
                  />
                )}
              />
              <FieldLabel
                className='xsm:text-[0.72rem] text-[0.83rem] leading-[1.5] tracking-[-0.0167rem] text-[#090909]'
                htmlFor='remember_me'
              >
                {t('rememberMe')}
              </FieldLabel>
            </div>
            <Link
              href={locale === 'vi' ? '/quen-mat-khau' : '/forgot-password'}
              className='xsm:text-[0.72rem] text-[0.83rem] leading-[1.5] tracking-[-0.0167rem] text-[#090909]'
            >
              {t('forgotPassword')}
            </Link>
            <FieldError className='xsm:text-[0.625rem]'>{form.formState.errors.remember_me?.message}</FieldError>
          </div>
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
