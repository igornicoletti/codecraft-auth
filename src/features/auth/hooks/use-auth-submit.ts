import { useNavigate } from 'react-router-dom'

import { useToast } from '@/hooks/use-toast'

interface UseAuthSubmitOptions {
  onSuccess?: () => void
  successMessage: string
  successDescription?: string
  errorMessage: string
  redirectPath?: string
}

export const useAuthSubmit = <T>() => {
  const { success, error } = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (
    action: (data: T) => Promise<void> | Promise<any>,
    data: T,
    options: UseAuthSubmitOptions
  ) => {
    try {
      await action(data)

      success(options.successMessage, {
        description: options.successDescription
      })

      if (options.redirectPath) {
        navigate(options.redirectPath)
      }

      if (options.onSuccess) {
        options.onSuccess()
      }
    } catch (err) {
      error(options.errorMessage, {
        description: err instanceof Error ? err.message : 'An error occurred'
      })
    }
  }

  return { handleSubmit }
}
