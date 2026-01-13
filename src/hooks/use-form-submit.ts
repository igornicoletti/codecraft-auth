import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { getAuthErrorMessage } from '@/modules/authentication/utils/auth-error-resolver'

export type ServiceResponse<T> =
  | { success: true; data: T; error: null }
  | { success: false; data: null; error: unknown }

interface UseFormSubmitOptions<T> {
  onSuccess?: (data: T) => void
  onError?: (error: unknown) => void
  redirectTo?: string
  successMessage?: string
  errorMessage?: string
}

export const useFormSubmit = <T>(options?: UseFormSubmitOptions<T>) => {
  const [isPending, setIsPending] = useState(false)
  const navigate = useNavigate()

  const submit = async (
    action: () => Promise<ServiceResponse<T>>
  ): Promise<ServiceResponse<T> | undefined> => {
    setIsPending(true)

    try {
      const result = await action()

      if (!result.success) {
        const errorDescription = options?.errorMessage
          ? options.errorMessage
          : getAuthErrorMessage(result.error)

        toast.error(errorDescription)

        options?.onError?.(result.error)
        return result
      }

      if (options?.successMessage) {
        toast.success(options.successMessage)
      }

      options?.onSuccess?.(result.data)

      if (options?.redirectTo) {
        navigate(options.redirectTo)
      }

      return result

    } catch (error) {
      console.error('[FormSubmit] Critical Error:', error)
      const errorDescription = getAuthErrorMessage(error)

      toast.error(errorDescription)

      options?.onError?.(error)
      return { success: false, data: null, error }

    } finally {
      setIsPending(false)
    }
  }

  return { submit, isPending }
}
