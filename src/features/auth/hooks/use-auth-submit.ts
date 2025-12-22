import { useNavigate } from 'react-router-dom'

import { AUTH_CONTENT } from '@/features/auth/constants/auth-content'
import { useToast } from '@/hooks/use-toast'

interface UseAuthSubmitProps<T> {
  action: (data: T) => Promise<any>
  successMessage: string
  errorMessage: string
  redirectTo?: string
}

export const useAuthSubmit = <T>() => {
  const { success, error } = useToast()
  const navigate = useNavigate()

  const { messages } = AUTH_CONTENT

  const handleSubmit = async ({
    action,
    successMessage,
    errorMessage,
    redirectTo,
  }: UseAuthSubmitProps<T>, data: T) => {
    try {
      await action(data)

      success(messages.success, { description: successMessage })

      if (redirectTo) {
        navigate(redirectTo)
      }
    } catch (err) {
      const description = err instanceof Error ? err.message : errorMessage
      error(messages.failed, { description })
      throw err
    }
  }

  return { handleSubmit }
}
