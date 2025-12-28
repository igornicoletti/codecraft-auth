// src/features/auth/hooks/use-auth-submit.ts
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { AUTH_ERROR_MAP } from '@/features/auth/constants/auth-messages'

export const useAuthSubmit = <T>() => {
  const navigate = useNavigate()
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = async (
    action: (data: T) => Promise<unknown>,
    data: T,
    redirectTo?: string
  ) => {
    setIsPending(true)
    try {
      await action(data)
      if (redirectTo) navigate(redirectTo)
    } catch (err: any) {
      const errorMessage = err?.message || 'Ocorreu um erro inesperado'
      const friendlyError = AUTH_ERROR_MAP[errorMessage] || errorMessage

      toast.error(friendlyError)
    } finally {
      setIsPending(false)
    }
  }

  return { handleSubmit, isPending }
}
