import { useState } from 'react'

export type SubmitResult<T> =
  | { success: true; data: T }
  | { success: false; error: unknown }

interface UseFormSubmitOptions<T> {
  onSuccess?: (data: T) => void
  onError?: (error: unknown) => void
}

export const useFormSubmit = <T>(options?: UseFormSubmitOptions<T>) => {
  const [isPending, setIsPending] = useState(false)

  const submit = async (action: () => Promise<T>): Promise<SubmitResult<T>> => {
    setIsPending(true)

    try {
      const data = await action()
      options?.onSuccess?.(data)

      return { success: true, data }
    } catch (error) {
      console.error('[FormSubmit]', error)
      options?.onError?.(error)

      return { success: false, error }
    } finally {
      setIsPending(false)
    }
  }

  return { submit, isPending }
}
