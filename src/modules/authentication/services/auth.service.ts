import { AuthError, type EmailOtpType } from '@supabase/supabase-js'

import { supabase } from '@/lib/supabase'
import type { SessionResult, SignInResult, SignUpResult, UserResult, VoidResult } from '@/modules/authentication/types/auth.types'

const makeAuthError = (
  name: string,
  message: string,
  status = 400,
  code = 'custom_error'
): AuthError => {
  const error = new AuthError(message, status, code)
  error.name = name
  return error
}

const sanitizeEmail = (email: string): string => {
  return email.trim().toLowerCase().replace(/[<>'"]/g, '')
}

const sanitizeName = (name: string): string => {
  return name.trim().replace(/[<>'"]/g, '')
}

const resolveRedirectUrl = (path: string): string | undefined => {
  if (typeof window === 'undefined') return undefined
  try {
    const url = new URL(path, window.location.origin)
    if (url.origin !== window.location.origin) {
      if (import.meta.env.DEV) console.warn('[Auth] Redirect URL origin mismatch')
      return undefined
    }
    return url.toString()
  } catch {
    if (import.meta.env.DEV) console.error('[Auth] Invalid redirect URL')
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
    const sanitizedEmail = sanitizeEmail(email)
    const sanitizedName = fullName ? sanitizeName(fullName) : undefined

    const { data, error } = await supabase.auth.signUp({
      email: sanitizedEmail,
      password,
      options: {
        data: sanitizedName ? { full_name: sanitizedName } : undefined,
        emailRedirectTo: redirectPath ? resolveRedirectUrl(redirectPath) : undefined,
      },
    })

    if (error) return { success: false, data: null, error }
    if (!data.user) {
      return {
        success: false,
        data: null,
        error: makeAuthError('SignUpError', 'User creation failed', 500),
      }
    }

    return { success: true, data: data.user, error: null }
  },

  signIn: async (email: string, password: string): Promise<SignInResult> => {
    const sanitizedEmail = sanitizeEmail(email)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: sanitizedEmail,
      password,
    })

    if (error) return { success: false, data: null, error }
    if (!data.session) {
      return {
        success: false,
        data: null,
        error: makeAuthError('SignInError', 'Session creation failed', 500),
      }
    }

    return { success: true, data: data.session, error: null }
  },

  signInWithGoogle: async (redirectPath: string): Promise<VoidResult> => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: resolveRedirectUrl(redirectPath) },
    })

    if (error) return { success: false, data: null, error }
    return { success: true, data: undefined, error: null }
  },

  signOut: async (): Promise<VoidResult> => {
    const { error } = await supabase.auth.signOut()
    if (error) return { success: false, data: null, error }
    return { success: true, data: undefined, error: null }
  },

  sendPasswordReset: async (
    email: string,
    redirectPath: string
  ): Promise<VoidResult> => {
    const sanitizedEmail = sanitizeEmail(email)
    const redirectUrl = resolveRedirectUrl(redirectPath)

    if (!redirectUrl) {
      return {
        success: false,
        data: null,
        error: makeAuthError('InvalidRedirectError', 'Invalid redirect URL', 400),
      }
    }

    const { error } = await supabase.auth.resetPasswordForEmail(sanitizedEmail, {
      redirectTo: redirectUrl,
    })

    if (error) return { success: false, data: null, error }
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

    if (!data.session) {
      return {
        success: false,
        data: null,
        error: makeAuthError('AuthSessionMissingError', 'No active session', 401),
      }
    }

    return { success: true, data: data.session, error: null }
  },

  verifyOtp: async (
    email: string,
    token: string,
    type: EmailOtpType = 'signup'
  ): Promise<SessionResult> => {
    if (!email) {
      return {
        success: false,
        data: null,
        error: makeAuthError('ValidationError', 'Email is required for verification.', 400),
      }
    }

    const sanitizedEmail = sanitizeEmail(email)
    const sanitizedToken = token?.trim() ?? ''
    const { data, error } = await supabase.auth.verifyOtp({
      email: sanitizedEmail,
      token: sanitizedToken,
      type,
    })

    if (error) return { success: false, data: null, error }

    if (data.session) return { success: true, data: data.session, error: null }

    const { data: sessionData } = await supabase.auth.getSession()
    if (sessionData.session)
      return { success: true, data: sessionData.session, error: null }

    return {
      success: false,
      data: null,
      error: makeAuthError(
        'VerificationError',
        'Verification successful but session not established',
        200
      ),
    }
  },

  resendOtp: async (
    email: string,
    type: 'signup' | 'recovery' = 'signup'
  ): Promise<VoidResult> => {
    if (!email) {
      return {
        success: false,
        data: null,
        error: makeAuthError('ValidationError', 'Email not provided.', 400),
      }
    }

    const sanitizedEmail = sanitizeEmail(email)

    if (type === 'recovery') {
      const { error } = await supabase.auth.resetPasswordForEmail(sanitizedEmail)
      if (error) return { success: false, data: null, error }
      return { success: true, data: undefined, error: null }
    }

    const { error } = await supabase.auth.resend({ type: 'signup', email: sanitizedEmail })
    if (error) return { success: false, data: null, error }
    return { success: true, data: undefined, error: null }
  },

  getCurrentUser: async (): Promise<UserResult> => {
    const { data, error } = await supabase.auth.getUser()
    if (error) return { success: false, data: null, error }
    return { success: true, data: data.user, error: null }
  },

  refreshSession: async (): Promise<SessionResult> => {
    const { data, error } = await supabase.auth.refreshSession()
    if (error) return { success: false, data: null, error }

    if (!data.session) {
      return {
        success: false,
        data: null,
        error: makeAuthError(
          'AuthSessionRefreshError',
          'Failed to refresh session',
          401
        ),
      }
    }

    return { success: true, data: data.session, error: null }
  },
}
