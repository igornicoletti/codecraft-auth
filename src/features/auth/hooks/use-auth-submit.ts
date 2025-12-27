// src/features/auth/hooks/use-auth-submit.ts
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { AUTH_ERROR_MAP } from '@/features/auth/constants/auth-messages'
import { useState } from 'react'

export const useAuthSubmit = <T>() => {
  const navigate = useNavigate()
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = async (action: (data: T) => Promise<any>, data: T, redirectTo?: string) => {
    setIsPending(true)

    try {
      await action(data)
      if (redirectTo) navigate(redirectTo)
    } catch (err: unknown) {
      const error = AUTH_ERROR_MAP[(err as Error)?.message] || (err as Error)?.message
      toast.error(error)
    } finally {
      setIsPending(false)
    }
  }

  return { handleSubmit, isPending }
}
