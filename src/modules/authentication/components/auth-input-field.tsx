import { Controller, type FieldValues, type Path, type UseFormReturn } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export interface AuthInputFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>
  name: Path<T>
  label: string
  placeholder?: string
  type?: string
  autoComplete?: string
  disabled?: boolean
}

export const AuthInputField = <T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  type = 'text',
  autoComplete,
  disabled,
}: AuthInputFieldProps<T>) => {
  const {
    control,
    formState: { errors },
  } = form

  const errorMessage = errors[name]?.message as string | undefined

  return (
    <div className="space-y-2">
      <Label htmlFor={String(name)}>{label}</Label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input
            id={String(name)}
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            disabled={disabled}
            className={cn(errorMessage && 'border-destructive')}
            {...field}
          />
        )}
      />
      {errorMessage && (
        <p className="text-sm text-destructive">{errorMessage}</p>
      )}
    </div>
  )
}
