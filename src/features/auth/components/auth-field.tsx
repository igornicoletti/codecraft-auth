// src/features/auth/components/auth-field.tsx
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'

interface AuthFieldProps<T extends FieldValues> {
  control: Control<T>
  name: FieldPath<T>
  label: string
  placeholder?: string
  type?: string
  autoComplete?: string
  disabled?: boolean
}

export const AuthField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  autoComplete,
  disabled,
}: AuthFieldProps<T>) => {
  const [isVisible, setIsVisible] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && isVisible ? 'text' : type

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {isPassword ? (
              <InputGroup>
                <InputGroupInput
                  {...field}
                  type={inputType}
                  placeholder={placeholder}
                  autoComplete={autoComplete}
                  disabled={disabled}
                  aria-invalid={!!fieldState.error}
                />
                <InputGroupAddon align='inline-end'>
                  <InputGroupButton
                    type='button'
                    variant='ghost'
                    disabled={disabled}
                    onClick={() => setIsVisible((v) => !v)}>
                    {isVisible ? <EyeOff /> : <Eye />}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            ) : (
              <Input
                {...field}
                type={inputType}
                placeholder={placeholder}
                autoComplete={autoComplete}
                disabled={disabled}
                aria-invalid={!!fieldState.error}
              />
            )}
          </FormControl>
          <FormMessage className='text-xs text-right' />
        </FormItem>
      )}
    />
  )
}
