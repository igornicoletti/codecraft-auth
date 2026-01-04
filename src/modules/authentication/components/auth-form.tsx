import { type FieldValues, type Path, type UseFormReturn } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Spinner } from '@/components/ui/spinner'
import { AuthInputField } from '@/modules/authentication/components'

export interface AuthFormField<T extends FieldValues> {
  name: Path<T>
  label: string
  placeholder?: string
  type?: string
  autoComplete?: string
}

export interface AuthFormProps<T extends FieldValues> {
  form: UseFormReturn<T>
  onSubmit: (values: T) => Promise<void>
  fields: AuthFormField<T>[]
  submitText: string
  isLoading?: boolean
}

export const AuthForm = <T extends FieldValues>({
  form,
  onSubmit,
  fields,
  submitText,
  isLoading = false,
}: AuthFormProps<T>) => (
  <Form {...form}>
    <form noValidate onSubmit={form.handleSubmit(onSubmit)} className='grid gap-6'>
      {fields.map((field) => (
        <AuthInputField
          key={field.name}
          control={form.control}
          name={field.name}
          label={field.label}
          type={field.type}
          placeholder={field.placeholder}
          autoComplete={field.autoComplete}
          disabled={isLoading} />
      ))}

      <Button disabled={isLoading} type='submit'>
        {isLoading ? <Spinner /> : submitText}
      </Button>
    </form>
  </Form>
)
