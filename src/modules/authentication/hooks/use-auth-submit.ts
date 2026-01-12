import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { AUTH_ERROR_MESSAGES } from '@/modules/authentication/configs/auth-error-map'
import type { AuthResult } from '@/modules/authentication/types/auth.types'

export type AuthAction<TInput, TOutput> = (data: TInput) => Promise<AuthResult<TOutput>>

export type AuthSubmitResult<T> =
  | { success: true; data: T }
  | { success: false; error: string }

interface SubmitOptions<TInput, TOutput> {
  action: AuthAction<TInput, TOutput>
  data?: TInput
  redirectTo?: string
  successMessage?: string
}

export const useAuthSubmit = <TInput = any, TOutput = any>() => {
  const navigate = useNavigate()
  const [isPending, setIsPending] = useState(false)

  const submit = async ({
    action,
    data,
    redirectTo,
    successMessage,
  }: SubmitOptions<TInput, TOutput>): Promise<AuthSubmitResult<TOutput>> => {
    setIsPending(true)

    try {
      const result = await action(data as TInput)

      if (!result.success) {
        const errorKey = result.error.message as keyof typeof AUTH_ERROR_MESSAGES
        const translatedMessage = AUTH_ERROR_MESSAGES[errorKey] || result.error.message

        toast.error(translatedMessage)
        return { success: false, error: result.error.message }
      }

      if (successMessage) {
        toast.success(successMessage)
      }

      if (redirectTo) {
        navigate(redirectTo)
      }

      return { success: true, data: result.data }
    } catch (err) {
      console.error('Unexpected auth error:', err)
      const genericError = 'Ocorreu um erro inesperado. Tente novamente.'
      toast.error(genericError)
      return { success: false, error: genericError }
    } finally {
      setIsPending(false)
    }
  }

  return { submit, isPending }
}
