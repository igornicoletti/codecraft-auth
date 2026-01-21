import { AUTH_ERROR_MESSAGES } from '@/modules/authentication/configs/auth-error-map'

interface ErrorWithMessage {
  message: string
}

const isErrorWithMessage = (error: unknown): error is ErrorWithMessage => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  )
}

const toErrorMessage = (error: unknown): string => {
  if (typeof error === 'string') {
    return error
  }

  if (isErrorWithMessage(error)) {
    return error.message
  }

  try {
    return JSON.stringify(error)
  } catch {
    return 'Erro desconhecido'
  }
}

export const getAuthErrorMessage = (error: unknown): string => {
  const originalMessage = toErrorMessage(error)

  if (AUTH_ERROR_MESSAGES[originalMessage]) {
    return AUTH_ERROR_MESSAGES[originalMessage]
  }

  const entry = Object.entries(AUTH_ERROR_MESSAGES).find(([key]) =>
    originalMessage.toLowerCase().includes(key.toLowerCase())
  )

  if (entry) {
    return entry[1]
  }

  if (import.meta.env.DEV) {
    return originalMessage
  }

  return 'Ocorreu um erro. Por favor, tente novamente.'
}
