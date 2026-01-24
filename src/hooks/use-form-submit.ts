import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
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

interface UseFormSubmitConfig {
  uniqueId?: string
}

export const useFormSubmit = <T = unknown>(config?: UseFormSubmitConfig) => {
  const [isPending, setIsPending] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const navigate = useNavigate()
  const location = useLocation() // Usado para gerar ID único baseado na rota
  const isMountedRef = useRef(true)

  // Gera um ID único se não for informado, baseado na rota atual (ex: /auth/login)
  // Isso impede que tentativas falhas no login bloqueiem o cadastro
  const rateLimitId = config?.uniqueId ?? `form-submit-${location.pathname}`

  const { checkRateLimit, recordAttempt, reset } = useRateLimit({
    maxAttempts: 5,
    windowMs: 60000, // 1 minuto
    blockDurationMs: 300000, // 5 minutos de bloqueio
    uniqueId: rateLimitId,
  })

  useEffect(() => {
    isMountedRef.current = true

    return () => {
      isMountedRef.current = false
    }
  }, [])

  const submit = useCallback(async (action: () => Promise<ServiceResponse<T>>, options?: SubmitOptions<T>): Promise<ServiceResponse<T> | undefined> => {
    if (!isMountedRef.current) return

    // Verifica Rate Limit antes de executar
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
        // Registra falha no rate limit
        if (!options?.skipRateLimit) {
          recordAttempt()
        }

        const errorDesc = options?.errorMessage ?? getAuthErrorMessage(result.error)
        toast.error(errorDesc)
        options?.onError?.(result.error)
        return result
      }

      // Sucesso: Limpa o rate limit para não punir usuário legítimo
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

      // Erro não tratado também conta como tentativa falha
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
