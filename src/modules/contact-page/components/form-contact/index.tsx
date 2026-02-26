'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Field, FieldLabel, FieldError,
} from '@/components/ui/field'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import endpoints from '@/configs/endpoints'
import CF7Request from '@/fetches/cf7Request'
import { cn } from '@/lib/utils'

export default function FormContact({ locale }: { locale: string }) {

  const translateContactForm = useTranslations('ContactForm')
  const messages = {
    fullnameRequired: translateContactForm('fullnameRequired'),
    fullNameInvalid: translateContactForm('fullNameInvalid'),
    emailRequired: translateContactForm('emailRequired'),
    emailInvalid: translateContactForm('emailInvalid'),
    companysizeRequired: translateContactForm('companysizeRequired'),
    companysizeInvalid: translateContactForm('companysizeInvalid'),
    fieldRequired: translateContactForm('fieldRequired'),
    fieldInvalid: translateContactForm('fieldInvalid'),
    noteRequired: translateContactForm('noteRequired'),
    noteInvalid: translateContactForm('noteInvalid'),
  }

  const formSchema = z.object({
    fullname: z.string().min(1, {
      message: messages.fullnameRequired,
    }),
    email: z
      .string()
      .min(1, {
        message: messages.emailRequired,
      })
      .email({
        message: messages.emailInvalid,
      }),
    companyName: z.string().optional(),
    companysize: z
      .string()
      .min(1, {
        message: messages.companysizeRequired,
      }),
    field: z
      .string()
      .min(1, {
        message: messages.fieldRequired,
      }),
    note: z
      .string()
      .min(1, {
        message: messages.noteRequired,
      }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: '',
      email: '',
      companyName: '',
      companysize: '',
      field: '',
      note: '',
    },
    mode: 'onBlur',
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const request = new CF7Request(values)
      const cf7Form =
        locale === 'vi'
          ? endpoints.contact.form_contact_vi
          : endpoints.contact.form_contact_en

      const response = await request.send({
        id: cf7Form.id,
        unitTag: cf7Form.unit_tag,
      })

      if (response?.invalid_fields?.length === 0) {
        toast.success(translateContactForm('submitSuccess'))
        form.reset()
      } else {
        toast.error(translateContactForm('submitFailed'))
      }
    } catch (error) {
      console.error('Form submission error', error)
      toast.error(translateContactForm('submitFailedMessage'))
    }
  }

  const fieldClassName = 'gap-[0.10417rem]'
  const labelClassName = 'flex pb-[0.20833rem] gap-[0.10417rem] text-[#090909] font-open-sans text-[0.83333rem] leading-[150%] tracking-[-0.01667rem] '
  const inputClassName = 'h-[2.91667rem] p-[0.83333rem_0.625rem] rounded-[0.41667rem] border border-[rgba(9,9,9,0.08)] bg-[#F0F0F0] backdrop-blur-sm placeholder:text-[rgba(9,9,9,0.40)] placeholder:font-open-sans placeholder:text-[0.83333rem] placeholder:leading-[150%] placeholder:tracking-[-0.01667rem] shadow-none outline-none ring-0 focus:ring-0 focus-visible:shadow-none focus-visible:outline-none focus-visible:ring-0'

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[1.66667rem]">

        <div className="grid grid-cols-2 gap-[1.04167rem]">
          <Field className={fieldClassName}>
            <FieldLabel className={labelClassName}>
              {translateContactForm('fullname')}
              <span className='text-[#D32F2F]'>*</span>
            </FieldLabel>
            <Input
              placeholder={translateContactForm('placeholderFullname')}
              className={inputClassName}
              {...form.register('fullname')}
            />
            <FieldError>{form.formState.errors.fullname?.message}</FieldError>
          </Field>

          <Field className={fieldClassName}>
            <FieldLabel className={labelClassName}>
              {translateContactForm('email')}
              <span className='text-[#D32F2F]'>*</span>
            </FieldLabel>
            <Input
              type="email"
              placeholder={translateContactForm('placeholderEmail')}
              className={inputClassName}
              {...form.register('email')}
            />
            <FieldError>{form.formState.errors.email?.message}</FieldError>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-[1.04167rem]">
          <Field className={fieldClassName}>
            <FieldLabel className={labelClassName}>
              {translateContactForm('companyName')}
            </FieldLabel>
            <Input
              placeholder={translateContactForm('placeholderCompanyName')}
              className={inputClassName}
              {...form.register('companyName')}
            />
            <FieldError>{form.formState.errors.companyName?.message}</FieldError>
          </Field>

          <Field className={fieldClassName}>
            <FieldLabel className={labelClassName}>
              {translateContactForm('companysize')}
              <span className='text-[#D32F2F]'>*</span>
            </FieldLabel>
            <Input
              placeholder={translateContactForm('placeholderCompanysize')}
              className={inputClassName}
              {...form.register('companysize')}
            />
            <FieldError>{form.formState.errors.companysize?.message}</FieldError>
          </Field>
        </div>

        <Field className={fieldClassName}>
          <FieldLabel className={labelClassName}>
            {translateContactForm('field')}
            <span className='text-[#D32F2F]'>*</span>
          </FieldLabel>
          <Select
            value={form.watch('field')}
            onValueChange={(value) => form.setValue('field', value, { shouldValidate: true })}
          >
            <SelectTrigger className={cn(inputClassName, 'data-[placeholder]:text-[rgba(9,9,9,0.40)]')}>
              <SelectValue placeholder={translateContactForm('placeholderField')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Linh vực 1</SelectItem>
              <SelectItem value="option2">Linh vực 2</SelectItem>
              <SelectItem value="option3">Linh vực 3</SelectItem>
            </SelectContent>
          </Select>
          <FieldError>{form.formState.errors.field?.message}</FieldError>
        </Field>

        <Field className={fieldClassName}>
          <FieldLabel className={labelClassName}>
            {translateContactForm('note')}
            <span className='text-[#D32F2F]'>*</span>
          </FieldLabel>
          <Textarea
            className={cn(inputClassName, 'h-[7.13542rem]')}
            placeholder={translateContactForm('placeholderNote')}
            {...form.register('note')}
          />
          <FieldError>{form.formState.errors.note?.message}</FieldError>
        </Field>

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className='w-full h-[2.60417rem] flex-center rounded-[5.20833rem] bg-[radial-gradient(298.39%_130.99%_at_6.62%_16.15%,#CA2A2A_15.19%,#D32F2F_53.77%,#FF6E6E_100%))] shadow-[0_0_2px_0_rgba(0,0,0,0.10),0_1px_8px_0_rgba(0,0,0,0.10)] backdrop-blur-[6px] text-white font-open-sans text-[0.72917rem] leading-[150%]'
        >
          {form.formState.isSubmitting ? translateContactForm('submitLoading') : translateContactForm('submit')}
        </Button>
      </form>
    </Form>
  )
}