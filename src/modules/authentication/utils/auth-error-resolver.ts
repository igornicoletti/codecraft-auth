import { AUTH_ERROR_MESSAGES } from '@/modules/authentication/configs/auth-error-map'

export function getAuthErrorMessage(error: unknown): string {
  let originalMessage = 'Unknown error'

  if (typeof error === 'string') {
    originalMessage = error
  } else if (error && typeof error === 'object' && 'message' in error) {
    originalMessage = (error as any).message
  }

  if (AUTH_ERROR_MESSAGES[originalMessage]) {
    return AUTH_ERROR_MESSAGES[originalMessage]
  }

  for (const key in AUTH_ERROR_MESSAGES) {
    if (originalMessage.toLowerCase().includes(key.toLowerCase())) {
      return AUTH_ERROR_MESSAGES[key]
    }
  }

  return originalMessage
}
