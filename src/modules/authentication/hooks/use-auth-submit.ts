import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { AUTH_ERROR_MESSAGES } from '@/modules/authentication/configs/auth-error-map'
import type { AuthResult } from '@/modules/authentication/types/auth.types'

/**
 * Type for authentication actions that return AuthResult.
 */
type AuthAction<TInput, TOutput> = (data: TInput) => Promise<AuthResult<TOutput>>

/**
 * Result type for auth submission with proper type discrimination.
 */
export type AuthSubmitResult<T> = 
  | { success: true; data: T }
  | { success: false; error: string }

/**
 * Hook for handling authentication form submissions with proper error handling.
 * Returns typed results for better type safety in consuming components.
 * 
 * @returns Object with handleSubmit function and isPending state
 */
export const useAuthSubmit = <TInput = void, TOutput = void>() => {
  const navigate = useNavigate()
  const [isPending, setIsPending] = useState(false)

  /**
   * Handles auth form submission with error handling and optional redirect.
   * 
   * @param action - The authentication action to perform
   * @param data - The form data to submit
   * @param redirectTo - Optional path to redirect to on success
   * @returns Promise with typed result
   */
  const handleSubmit = async (
    action: AuthAction<TInput, TOutput>,
    data: TInput,
    redirectTo?: string
  ): Promise<AuthSubmitResult<TOutput>> => {
    setIsPending(true)

    try {
      const result = await action(data)

      if (!result.success) {
        const translatedMessage = AUTH_ERROR_MESSAGES[result.error.message] || result.error.message
        toast.error(translatedMessage)
        return { success: false, error: result.error.message }
      }

      if (redirectTo) {
        navigate(redirectTo)
      }

      return { success: true, data: result.data }
    } catch (err) {
      console.error('Unexpected auth error:', err)
      const errorMessage = 'Ocorreu um erro inesperado. Tente novamente.'
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setIsPending(false)
    }
  }

  return { handleSubmit, isPending }
}
