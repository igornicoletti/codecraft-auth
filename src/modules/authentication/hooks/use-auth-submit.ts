import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { AUTH_ERROR_MESSAGES } from '@/modules/authentication/configs/auth-error-map'

export const useAuthSubmit = <T extends Record<string, any>>() => {
  const navigate = useNavigate()
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = async (
    action: (data: T) => Promise<unknown>,
    data: T,
    redirectTo?: string
  ): Promise<void> => {
    setIsPending(true)
    try {
      await action(data)
      if (redirectTo) navigate(redirectTo)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Ocorreu um erro inesperado'
      toast.error(AUTH_ERROR_MESSAGES[message] || message)
    } finally {
      setIsPending(false)
    }
  }

  return { handleSubmit, isPending }
}
