import type { FieldValues } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'
import { AuthFormField } from '@/modules/authentication/components/form/auth-form-field'
import type { FormProps } from '@/modules/authentication/types/auth-form.types'

export const AuthForm = <T extends FieldValues>({
  form,
  onSubmit,
  fields,
  submitText,
  isLoading,
  className
}: FormProps<T>) => (
  <Form {...form}>
    <form
      noValidate
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn('grid gap-6', className)}>
      {fields.map((field) => (
        <AuthFormField key={field.name} control={form.control} config={field} />
      ))}
      <Button type='submit' disabled={isLoading} className="w-full">
        {isLoading && <Spinner />}
        {submitText}
      </Button>
    </form>
  </Form>
)
