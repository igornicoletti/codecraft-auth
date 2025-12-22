import { useNavigate } from 'react-router-dom'

import { AUTH_ERROR_MAP, AUTH_MESSAGES } from '@/features/auth/constants/auth-messages'
import { useToast } from '@/hooks/use-toast'

type AuthActionKey = keyof typeof AUTH_MESSAGES.actions

export const useAuthSubmit = <T>() => {
  const { success, error: errorToast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (action: (data: T) => Promise<any>, data: T, actionKey: AuthActionKey, redirectTo?: string) => {
    const config = AUTH_MESSAGES.actions[actionKey]

    try {
      await action(data)
      success(AUTH_MESSAGES.titles.success, { description: config.success })

      if (redirectTo) navigate(redirectTo)
    } catch (err: any) {
      const description = AUTH_ERROR_MAP[err?.message] || err?.message || config.defaultError

      errorToast(AUTH_MESSAGES.titles.error, { description })
    }
  }

  return { handleSubmit }
}
