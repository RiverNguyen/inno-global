'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { changePassword } from '@/actions/changePassword'
import { logoutAll } from '@/actions/logoutAll'
import ButtonRed from '@/components/custom/ButtonRed'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Form } from '@/components/ui/form'
import { PasswordInput } from '@/components/ui/password-input'
import BackButton from '@/modules/(auth)/dashboard/_components/back-button'

export default function FormChangePassword() {
  const t = useTranslations('ChangePasswordPage')

  const formSchema = z
    .object({
      current_password: z.string().min(1, t('validateCurrentPassword')),
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
      current_password: '',
      new_password: '',
      confirm_password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await changePassword(values)

    if (res?.success) {
      toast.success(t('success'))
      form.reset()
      await logoutAll('/')
    } else {
      toast.error(res?.message ?? t('error'))
    }
  }

  return (
    <>
      <h1 className='lg:hidden text-[#333] text-[0.83rem] font-semibold leading-[1.5] pt-[3.54rem] flex items-center'>
        <BackButton className='translate-y-[0.05rem]' />
        {t('title')}
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-[1.51rem] xsm:mt-[2.29rem] xsm:space-y-[1.04rem]'
        >
          <Field className='gap-0 space-y-[0.3125rem]'>
            <FieldLabel
              className='xsm:text-[0.72rem] xsm:tracking-[-0.01458rem] text-[0.83rem] leading-[1.5] tracking-[-0.0167rem] text-[#090909]'
              htmlFor='current_password'
            >
              {t('labelCurrentPassword')}
              <span className='xsm:translate-x-[-0.3rem] translate-x-[-0.15rem] text-[#D32F2F]'>*</span>
            </FieldLabel>
            <PasswordInput
              id='current_password'
              disabled={form.formState.isSubmitting}
              placeholder={t('placeholderCurrentPassword')}
              className='xsm:h-[2.083rem] xsm:p-[0.72rem_0.625rem] xsm:rounded-[0.41rem] xsm:placeholder:text-[0.625rem] h-[2.91667rem] rounded-[0.4167rem] border-[#090909]/8 bg-[#f0f0f0] p-[0.83rem_0.625rem] text-[0.83rem] leading-[1.5] tracking-[-0.0167rem] shadow-none placeholder:text-[#090909]/40 focus-visible:ring-0 focus-visible:ring-offset-0'
              {...form.register('current_password')}
            />
            <FieldError className='xsm:text-[0.625rem]'>{form.formState.errors.current_password?.message}</FieldError>
          </Field>
          <Field className='gap-0 space-y-[0.3125rem]'>
            <FieldLabel
              className='xsm:text-[0.72rem] xsm:tracking-[-0.01458rem] text-[0.83rem] leading-[1.5] tracking-[-0.0167rem] text-[#090909]'
              htmlFor='new_password'
            >
              {t('labelPassword')}
              <span className='xsm:translate-x-[-0.3rem] translate-x-[-0.15rem] text-[#D32F2F]'>*</span>
            </FieldLabel>
            <PasswordInput
              id='new_password'
              disabled={form.formState.isSubmitting}
              placeholder={t('placeholderPassword')}
              className='xsm:h-[2.083rem] xsm:p-[0.72rem_0.625rem] xsm:rounded-[0.41rem] xsm:placeholder:text-[0.625rem] h-[2.91667rem] rounded-[0.4167rem] border-[#090909]/8 bg-[#f0f0f0] p-[0.83rem_0.625rem] text-[0.83rem] leading-[1.5] tracking-[-0.0167rem] shadow-none placeholder:text-[#090909]/40 focus-visible:ring-0 focus-visible:ring-offset-0'
              {...form.register('new_password')}
            />
            <FieldError className='xsm:text-[0.625rem]'>{form.formState.errors.new_password?.message}</FieldError>
          </Field>
          <Field className='gap-0 space-y-[0.3125rem]'>
            <FieldLabel
              className='xsm:text-[0.72rem] xsm:tracking-[-0.01458rem] text-[0.83rem] leading-[1.5] tracking-[-0.0167rem] text-[#090909]'
              htmlFor='confirmPassword'
            >
              {t('labelConfirmPassword')}
              <span className='xsm:translate-x-[-0.3rem] translate-x-[-0.15rem] text-[#D32F2F]'>*</span>
            </FieldLabel>
            <PasswordInput
              id='confirmPassword'
              disabled={form.formState.isSubmitting}
              placeholder={t('placeholderConfirmPassword')}
              className='xsm:h-[2.083rem] xsm:p-[0.72rem_0.625rem] xsm:rounded-[0.41rem] xsm:placeholder:text-[0.625rem] h-[2.91667rem] rounded-[0.4167rem] border-[#090909]/8 bg-[#f0f0f0] p-[0.83rem_0.625rem] text-[0.83rem] leading-[1.5] tracking-[-0.0167rem] shadow-none placeholder:text-[#090909]/40 focus-visible:ring-0 focus-visible:ring-offset-0'
              {...form.register('confirm_password')}
            />
            <FieldError className='xsm:text-[0.625rem]'>{form.formState.errors.confirm_password?.message}</FieldError>
          </Field>

          <ButtonRed
            type='submit'
            className={`xsm:mt-[0.156rem] xsm:h-[2.083rem] xsm:w-full h-[2.6rem] min-w-[8rem] text-[0.73rem] leading-[1.5] ${form.formState.isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
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
    </>
  )
}
