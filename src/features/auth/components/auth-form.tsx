// src/features/auth/components/auth-form.tsx
import type { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Spinner } from '@/components/ui/spinner'
import { AuthField } from '@/features/auth/components/auth-field'

export interface AuthFieldConfig<T extends FieldValues> {
  name: FieldPath<T>
  label: string
  type?: string
  placeholder?: string
  autoComplete?: string
}

interface AuthFormProps<T extends FieldValues> {
  form: UseFormReturn<T>
  onSubmit: (data: T) => void | Promise<void>
  fields: AuthFieldConfig<T>[]
  submitText?: string
  isLoading?: boolean
}

export const AuthForm = <T extends FieldValues>({
  form,
  onSubmit,
  fields,
  submitText = 'Enviar',
  isLoading = false,
}: AuthFormProps<T>) => (
  <Form {...form}>
    <form
      noValidate
      onSubmit={form.handleSubmit(onSubmit)}
      className='space-y-4'>
      {fields.map((field) => (
        <AuthField
          key={field.name}
          control={form.control}
          name={field.name}
          label={field.label}
          type={field.type}
          placeholder={field.placeholder}
          autoComplete={field.autoComplete}
          disabled={isLoading}
        />
      ))}
      <Button disabled={isLoading} type='submit' className='w-full'>
        {isLoading ? <Spinner /> : submitText}
      </Button>
    </form>
  </Form>
)
