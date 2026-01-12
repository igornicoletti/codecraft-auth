import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import type { Control, ControllerRenderProps, FieldValues } from 'react-hook-form'

import type { FormFieldConfig } from '@/components/common/form/types'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import { Textarea } from '@/components/ui/textarea'

interface Props<T extends FieldValues> {
  control: Control<T>
  config: FormFieldConfig<T>
}

export const GenericFormField = <T extends FieldValues>({ control, config }: Props<T>) => {
  const [isVisible, setIsVisible] = useState(false)

  const renderInput = (field: ControllerRenderProps<T>) => {
    switch (config.type) {
      case 'textarea':
        return (
          <Textarea
            {...field}
            placeholder={config.placeholder}
            disabled={config.disabled}
            className='resize-none' />
        )

      case 'password':
        return (
          <InputGroup>
            <InputGroupInput
              {...field}
              type={isVisible ? 'text' : 'password'}
              placeholder={config.placeholder}
              disabled={config.disabled} />
            <InputGroupAddon align='inline-end'>
              <InputGroupButton
                type='button'
                variant='link'
                onClick={() => setIsVisible((v) => !v)}
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
            type={config.type ?? 'text'}
            placeholder={config.placeholder}
            disabled={config.disabled} />
        )
    }
  }

  return (
    <FormField
      control={control}
      name={config.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{config.label}</FormLabel>
          <FormControl>{renderInput(field)}</FormControl>
          {config.description && (
            <FormDescription>{config.description}</FormDescription>
          )}
          <FormMessage className='text-xs text-right' />
        </FormItem>
      )}
    />
  )
}
