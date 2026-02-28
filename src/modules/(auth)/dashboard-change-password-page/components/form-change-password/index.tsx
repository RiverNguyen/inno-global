'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import ButtonRed from '@/components/custom/ButtonRed'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Form } from '@/components/ui/form'
import { PasswordInput } from '@/components/ui/password-input'

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

  async function onSubmit() {}

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full space-y-[1.0375rem]'
      >
        <Field className='gap-0 space-y-[0.3125rem]'>
          <FieldLabel
            className='xsm:text-[0.72rem] xsm:tracking-[-0.01458rem] text-[0.83rem] leading-[1.5] tracking-[-0.0167rem] text-[#090909]'
            htmlFor='password'
          >
            {t('labelPassword')}
            <span className='xsm:translate-x-[-0.3rem] translate-x-[-0.15rem] text-[#D32F2F]'>*</span>
          </FieldLabel>
          <PasswordInput
            id='password'
            disabled={form.formState.isSubmitting}
            placeholder={t('placeholderPassword')}
            className='xsm:h-[2.083rem] xsm:p-[0.72rem_0.625rem] xsm:rounded-[0.41rem] xsm:bg-[#f0f0f0] xsm:placeholder:text-[0.625rem] h-[2.91667rem] rounded-[0.4167rem] border-[#090909]/8 bg-white p-[0.83rem_0.625rem] text-[0.83rem] leading-[1.5] tracking-[-0.0167rem] shadow-none placeholder:text-[#090909]/40 focus-visible:ring-0 focus-visible:ring-offset-0'
            {...form.register('new_password')}
          />

          <FieldError className='xsm:text-[0.625rem]'>{form.formState.errors.new_password?.message}</FieldError>
        </Field>
        <Field className='gap-0 space-y-[0.3125rem]'>
          <FieldLabel
            className='xsm:text-[0.72rem] xsm:tracking-[-0.01458rem] text-[0.83rem] leading-[1.5] tracking-[-0.0167rem] text-[#090909]'
            htmlFor='password'
          >
            {t('labelPassword')}
            <span className='xsm:translate-x-[-0.3rem] translate-x-[-0.15rem] text-[#D32F2F]'>*</span>
          </FieldLabel>
          <PasswordInput
            id='password'
            disabled={form.formState.isSubmitting}
            placeholder={t('placeholderPassword')}
            className='xsm:h-[2.083rem] xsm:p-[0.72rem_0.625rem] xsm:rounded-[0.41rem] xsm:bg-[#f0f0f0] xsm:placeholder:text-[0.625rem] h-[2.91667rem] rounded-[0.4167rem] border-[#090909]/8 bg-white p-[0.83rem_0.625rem] text-[0.83rem] leading-[1.5] tracking-[-0.0167rem] shadow-none placeholder:text-[#090909]/40 focus-visible:ring-0 focus-visible:ring-offset-0'
            {...form.register('new_password')}
          />

          <FieldError className='xsm:text-[0.625rem]'>{form.formState.errors.new_password?.message}</FieldError>
        </Field>
        <Field className='gap-0 space-y-[0.3125rem]'>
          <FieldLabel
            className='xsm:text-[0.72rem] xsm:tracking-[-0.01458rem] text-[0.83rem] leading-[1.5] tracking-[-0.0167rem] text-[#090909]'
            htmlFor='password'
          >
            {t('labelConfirmPassword')}
            <span className='xsm:translate-x-[-0.3rem] translate-x-[-0.15rem] text-[#D32F2F]'>*</span>
          </FieldLabel>
          <PasswordInput
            id='confirmPassword'
            disabled={form.formState.isSubmitting}
            placeholder={t('placeholderConfirmPassword')}
            className='xsm:h-[2.083rem] xsm:p-[0.72rem_0.625rem] xsm:rounded-[0.41rem] xsm:bg-[#f0f0f0] xsm:placeholder:text-[0.625rem] h-[2.91667rem] rounded-[0.4167rem] border-[#090909]/8 bg-white p-[0.83rem_0.625rem] text-[0.83rem] leading-[1.5] tracking-[-0.0167rem] shadow-none placeholder:text-[#090909]/40 focus-visible:ring-0 focus-visible:ring-offset-0'
            {...form.register('confirm_password')}
          />
          <FieldError className='xsm:text-[0.625rem]'>{form.formState.errors.confirm_password?.message}</FieldError>
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
