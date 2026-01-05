import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { AUTH_ERROR_MESSAGES } from '@/modules/authentication/configs/auth-error-map'
import type { AuthServiceResponse } from '@/modules/authentication/services/auth.service'

type AuthAction<T, R> = (data: T) => Promise<AuthServiceResponse<R>>

export const useAuthSubmit = <T, R = void>() => {
  const navigate = useNavigate()
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = async (
    action: AuthAction<T, R>,
    data: T,
    redirectTo?: string
  ): Promise<void> => {
    setIsPending(true)

    try {
      const { error } = await action(data)

      if (error) {
        const translatedMessage = AUTH_ERROR_MESSAGES[error.message] || error.message
        toast.error(translatedMessage)
        return
      }

      if (redirectTo) {
        navigate(redirectTo)
      }
    } catch (err) {
      console.error('Unexpected auth error:', err)
      toast.error('Ocorreu um erro inesperado. Tente novamente.')
    } finally {
      setIsPending(false)
    }
  }

  return { handleSubmit, isPending }
}
