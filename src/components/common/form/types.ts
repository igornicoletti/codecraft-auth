import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'

export type FieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'textarea'
  | 'date'

export interface FormFieldConfig<T extends FieldValues> {
  name: Path<T>
  label: string
  placeholder?: string
  description?: string
  type?: FieldType
  disabled?: boolean
  autoComplete?: string
}

export interface FormProps<T extends FieldValues> {
  form: UseFormReturn<T>
  onSubmit: (data: T) => Promise<void>
  fields: FormFieldConfig<T>[]
  submitText?: string
  isLoading?: boolean
}
