import { AUTH_ERROR_MESSAGES } from '@/modules/authentication/configs/auth-error-map'

export const getAuthErrorMessage = (error: unknown): string => {
  let originalMessage = 'Unknown error'

  if (typeof error === 'string') {
    originalMessage = error
  } else if (error && typeof error === 'object' && 'message' in error) {
    originalMessage = (error as any).message
  }

  if (AUTH_ERROR_MESSAGES[originalMessage]) {
    return AUTH_ERROR_MESSAGES[originalMessage]
  }

  const entry = Object.entries(AUTH_ERROR_MESSAGES).find(([key]) =>
    originalMessage.toLowerCase().includes(key.toLowerCase())
  )

  return entry ? entry[1] : originalMessage
}
