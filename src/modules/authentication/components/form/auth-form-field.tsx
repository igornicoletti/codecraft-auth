import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { Eye, EyeOff } from 'lucide-react'
import { useId, useState } from 'react'
import type { Control, ControllerRenderProps, FieldValues } from 'react-hook-form'

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { Textarea } from '@/components/ui/textarea'
import type { FormFieldConfig } from '@/modules/authentication/types/auth-form.types'

interface Props<T extends FieldValues> {
  control: Control<T>
  config: FormFieldConfig<T>
}

export const AuthFormField = <T extends FieldValues>({ control, config }: Props<T>) => {
  const [isVisible, setIsVisible] = useState(false)
  const uniqueId = useId()
  const fieldId = `${uniqueId}-${String(config.name)}`

  const renderInput = (field: ControllerRenderProps<T>) => {
    switch (config.type) {
      case 'otp':
        return (
          <InputOTP
            {...field}
            id={fieldId}
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            disabled={config.disabled}>
            <InputOTPGroup className="justify-center flex-1 w-full gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <InputOTPSlot key={index} index={index} className="flex-1 border-none" />
              ))}
            </InputOTPGroup>
          </InputOTP>
        )

      case 'textarea':
        return (
          <Textarea
            {...field}
            id={fieldId}
            placeholder={config.placeholder}
            disabled={config.disabled}
            autoComplete={config.autoComplete}
            className='resize-none min-h-24 border-none'
          />
        )

      case 'password':
        return (
          <InputGroup className='border-none'>
            <InputGroupInput
              {...field}
              id={fieldId}
              type={isVisible ? 'text' : 'password'}
              placeholder={config.placeholder}
              disabled={config.disabled}
              autoComplete={config.autoComplete ?? 'current-password'}
            />
            <InputGroupAddon align='inline-end'>
              <InputGroupButton
                type='button'
                variant='ghost'
                onClick={() => setIsVisible((prev) => !prev)}
                aria-label={isVisible ? 'Ocultar senha' : 'Mostrar senha'}>
                {isVisible ? <EyeOff /> : <Eye />}
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        )

      default:
        return (
          <Input
            {...field}
            id={fieldId}
            type={config.type ?? 'text'}
            placeholder={config.placeholder}
            disabled={config.disabled}
            autoComplete={config.autoComplete}
            className='border-none'
          />
        )
    }
  }

  return (
    <FormField
      control={control}
      name={config.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={fieldId}>{config.label}</FormLabel>
          <FormControl>
            {renderInput(field)}
          </FormControl>
          {config.description && (
            <FormDescription>{config.description}</FormDescription>
          )}
          <FormMessage className='text-xs text-right font-medium' />
        </FormItem>
      )}
    />
  )
}
