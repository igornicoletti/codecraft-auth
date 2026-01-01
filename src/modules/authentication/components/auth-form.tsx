import { type FieldValues, type Path, type UseFormReturn } from 'react-hook-form'

import { Button } from '@/components/ui/button'
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
}: AuthFormProps<T>) => {
  const { handleSubmit } = form

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
      noValidate
    >
      {fields.map((field) => (
        <AuthInputField
          key={String(field.name)}
          form={form}
          name={field.name}
          label={field.label}
          placeholder={field.placeholder}
          type={field.type}
          autoComplete={field.autoComplete}
          disabled={isLoading}
        />
      ))}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? <Spinner /> : submitText}
      </Button>
    </form>
  )
}
