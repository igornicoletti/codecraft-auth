import { AuthError, type EmailOtpType } from '@supabase/supabase-js'

import { supabase } from '@/lib/supabase'
import type { SessionResult, SignInResult, SignUpResult, VoidResult } from '@/modules/authentication/types/auth.types'

// Utilitário para sanitização básica contra XSS
const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

const makeAuthError = (
  name: string,
  message: string,
  status = 400
): AuthError => {
  const error = new AuthError(message, status)
  error.name = name
  return error
}

const sanitizeEmail = (email: string): string => email.trim().toLowerCase()

const getRedirectUrl = (path: string): string | undefined => {
  if (typeof window === 'undefined') return undefined
  try {
    const url = new URL(path, window.location.origin)
    return url.toString()
  } catch {
    if (import.meta.env.DEV) console.warn('[Auth] URL de redirecionamento inválida')
    return undefined
  }
}

export const authService = {
  signUp: async (
    email: string,
    password: string,
    fullName?: string,
    redirectPath?: string
  ): Promise<SignUpResult> => {
    // Sanitização de XSS no Input
    const sanitizedFullName = fullName ? escapeHtml(fullName.trim()) : undefined

    const { data, error } = await supabase.auth.signUp({
      email: sanitizeEmail(email),
      password,
      options: {
        data: sanitizedFullName ? { full_name: sanitizedFullName } : undefined,
        emailRedirectTo: redirectPath ? getRedirectUrl(redirectPath) : undefined,
      },
    })

    if (error) return { success: false, data: null, error }
    if (!data.user) return { success: false, data: null, error: makeAuthError('SignUpError', 'Falha ao criar usuário', 500) }

    return { success: true, data: data.user, error: null }
  },

  signIn: async (email: string, password: string): Promise<SignInResult> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: sanitizeEmail(email),
      password,
    })

    if (error) return { success: false, data: null, error }
    if (!data.session) return { success: false, data: null, error: makeAuthError('SignInError', 'Sessão não criada', 500) }

    return { success: true, data: data.session, error: null }
  },

  signInWithGoogle: async (redirectPath: string): Promise<VoidResult> => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: getRedirectUrl(redirectPath) },
    })

    if (error) return { success: false, data: null, error }
    return { success: true, data: undefined, error: null }
  },

  signOut: async (): Promise<VoidResult> => {
    const { error } = await supabase.auth.signOut()
    if (error) return { success: false, data: null, error }
    return { success: true, data: undefined, error: null }
  },

  sendPasswordReset: async (email: string, redirectPath: string): Promise<VoidResult> => {
    const redirectUrl = getRedirectUrl(redirectPath)
    if (!redirectUrl) return { success: false, data: null, error: makeAuthError('InvalidRedirect', 'URL inválida', 400) }

    const { error } = await supabase.auth.resetPasswordForEmail(sanitizeEmail(email), {
      redirectTo: redirectUrl,
    })

    // Prevenção de Enumeração de Usuários: Retorna sucesso mesmo se falhar por "user not found"
    if (error) {
      // Supabase pode retornar erros diferentes dependendo da config, mas geralmente expõe se o user não existe
      // Aqui engolimos o erro para proteger a privacidade
      console.warn('[Auth] Erro suprimido na recuperação:', error.message)
      // Retornamos sucesso falso-positivo
      return { success: true, data: undefined, error: null }
    }

    return { success: true, data: undefined, error: null }
  },

  updatePassword: async (newPassword: string): Promise<VoidResult> => {
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) return { success: false, data: null, error }
    return { success: true, data: undefined, error: null }
  },

  getSession: async (): Promise<SessionResult> => {
    const { data, error } = await supabase.auth.getSession()
    if (error) return { success: false, data: null, error }
    if (!data.session) return { success: false, data: null, error: makeAuthError('NoSession', 'Sem sessão ativa', 401) }

    return { success: true, data: data.session, error: null }
  },

  verifyOtp: async (email: string, token: string, type: EmailOtpType = 'signup'): Promise<SessionResult> => {
    const { data, error } = await supabase.auth.verifyOtp({
      email: sanitizeEmail(email),
      token: token.trim(),
      type,
    })

    if (error) return { success: false, data: null, error }
    if (data.session) return { success: true, data: data.session, error: null }

    const sessionCheck = await supabase.auth.getSession()
    if (sessionCheck.data.session) return { success: true, data: sessionCheck.data.session, error: null }

    return { success: false, data: null, error: makeAuthError('VerifyError', 'Verificação falhou', 400) }
  },

  resendOtp: async (email: string, type: 'signup' | 'recovery' = 'signup'): Promise<VoidResult> => {
    const sanitizedEmail = sanitizeEmail(email)

    if (type === 'recovery') {
      return authService.sendPasswordReset(sanitizedEmail, '/auth/update-password')
    }

    const { error } = await supabase.auth.resend({ type: 'signup', email: sanitizedEmail })

    // Prevenção de Enumeração de Usuários
    if (error) {
      // Log apenas interno (não mostrar na UI)
      console.warn('[Auth] Resend OTP falhou (seguro):', error.message)
      // Retorna sucesso para não revelar se o email existe ou não
      return { success: true, data: undefined, error: null }
    }

    return { success: true, data: undefined, error: null }
  },
}
