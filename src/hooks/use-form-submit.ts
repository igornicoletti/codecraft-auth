import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { getAuthErrorMessage } from '@/modules/authentication/utils/auth-error-resolver'

export type ServiceResponse<T> =
  | { success: true; data: T; error: null }
  | { success: false; data: null; error: unknown }

export interface SubmitOptions<T> {
  onSuccess?: (data: T) => void
  onError?: (error: unknown) => void
  redirectTo?: string
  successMessage?: string
  errorMessage?: string
}

export const useFormSubmit = <T = unknown>() => {
  const [isPending, setIsPending] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const navigate = useNavigate()

  const submit = useCallback(async (action: () => Promise<ServiceResponse<T>>, options?: SubmitOptions<T>): Promise<ServiceResponse<T> | undefined> => {
    setIsPending(true)
    setIsSuccess(false)

    let shouldResetPending = true

    try {
      const result = await action()

      if (!result.success) {
        const errorDesc = options?.errorMessage ?? getAuthErrorMessage(result.error)
        toast.error(errorDesc)
        options?.onError?.(result.error)
        return result
      }

      setIsSuccess(true)

      if (options?.successMessage) {
        toast.success(options.successMessage)
      }

      options?.onSuccess?.(result.data)

      if (options?.redirectTo) {
        shouldResetPending = false
        navigate(options.redirectTo, { replace: true })
      }

      return result
    } catch (error) {
      console.error('[FormSubmit] Critical Error:', error)
      toast.error(getAuthErrorMessage(error))
      options?.onError?.(error)
      return { success: false, data: null, error }
    } finally {
      if (shouldResetPending) {
        setIsPending(false)
      }
    }
  }, [navigate])

  return { submit, isPending, isSuccess }
}
