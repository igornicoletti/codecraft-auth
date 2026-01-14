import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { useRateLimit } from '@/hooks/use-rate-limit'
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
  skipRateLimit?: boolean
}

export const useFormSubmit = <T = unknown>() => {
  const [isPending, setIsPending] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const navigate = useNavigate()
  const isMountedRef = useRef(true)

  const { checkRateLimit, recordAttempt, reset } = useRateLimit({
    maxAttempts: 5,
    windowMs: 60000,
    blockDurationMs: 300000,
  })

  useEffect(() => {
    isMountedRef.current = true

    return () => {
      isMountedRef.current = false
    }
  }, [])

  const submit = useCallback(async (action: () => Promise<ServiceResponse<T>>, options?: SubmitOptions<T>): Promise<ServiceResponse<T> | undefined> => {
    if (!isMountedRef.current) return

    if (!options?.skipRateLimit) {
      const rateLimitStatus = checkRateLimit()

      if (rateLimitStatus.isBlocked) {
        const minutesRemaining = rateLimitStatus.resetAt
          ? Math.ceil((rateLimitStatus.resetAt - Date.now()) / 60000)
          : 5

        toast.error(
          `Muitas tentativas. Tente novamente em ${minutesRemaining} minuto${minutesRemaining > 1 ? 's' : ''}.`
        )
        return {
          success: false,
          data: null,
          error: new Error('Rate limit exceeded'),
        }
      }
    }

    setIsPending(true)
    setIsSuccess(false)

    let shouldResetPending = true

    try {
      const result = await action()

      if (!isMountedRef.current) return result

      if (!result.success) {
        if (!options?.skipRateLimit) {
          recordAttempt()
        }

        const errorDesc = options?.errorMessage ?? getAuthErrorMessage(result.error)
        toast.error(errorDesc)
        options?.onError?.(result.error)
        return result
      }

      if (!options?.skipRateLimit) {
        reset()
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
      if (import.meta.env.DEV) {
        console.error('[FormSubmit] Critical Error:', error)
      }

      if (!options?.skipRateLimit) {
        recordAttempt()
      }

      if (isMountedRef.current) {
        toast.error(getAuthErrorMessage(error))
        options?.onError?.(error)
      }

      return { success: false, data: null, error }
    } finally {
      if (shouldResetPending && isMountedRef.current) {
        setIsPending(false)
      }
    }
  }, [navigate, checkRateLimit, recordAttempt, reset])

  return { submit, isPending, isSuccess }
}
