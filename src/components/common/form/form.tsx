import type { FieldValues } from 'react-hook-form'

import { GenericFormField } from '@/components/common/form/form-field'
import type { FormProps } from '@/components/common/form/types'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Spinner } from '@/components/ui/spinner'

export const GenericForm = <T extends FieldValues>({ form, onSubmit, fields, submitText, isLoading }: FormProps<T>) => (
  <Form {...form}>
    <form noValidate onSubmit={form.handleSubmit(onSubmit)} className='grid gap-6'>
      {fields.map((field) => (
        <GenericFormField key={field.name} control={form.control} config={field} />
      ))}
      <Button type='submit' disabled={isLoading}>
        {isLoading && <Spinner />}
        {submitText}
      </Button>
    </form>
  </Form>
)
