import type { AuthError } from '@supabase/supabase-js'

import { supabase } from '@/lib/supabase'
import type { SessionResult, SignInResult, SignUpResult, UserResult, VoidResult } from '@/modules/authentication/types/auth.types'

const resolveRedirectUrl = (path: string) => {
  if (typeof window === 'undefined') return undefined
  return `${window.location.origin}${path}`
}

export const authService = {
  signUp: async (email: string, password: string, fullName?: string, redirectPath?: string): Promise<SignUpResult> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: redirectPath ? resolveRedirectUrl(redirectPath) : undefined
      }
    })

    if (error) return { success: false, data: null, error }
    return { success: true, data: data.user!, error: null }
  },

  signIn: async (email: string, password: string): Promise<SignInResult> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) return { success: false, data: null, error }
    return { success: true, data: data.session!, error: null }
  },

  signInWithGoogle: async (redirectPath: string): Promise<VoidResult> => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: resolveRedirectUrl(redirectPath)
      }
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
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: resolveRedirectUrl(redirectPath)
    })

    if (error) return { success: false, data: null, error }
    return { success: true, data: undefined, error: null }
  },

  updatePassword: async (newPassword: string): Promise<VoidResult> => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    })

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
        error: {
          name: 'AuthSessionMissingError',
          message: 'No active session',
          status: 401,
        } as AuthError,
      }
    }

    return { success: true, data: data.session, error: null }
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
        error: {
          name: 'AuthSessionRefreshError',
          message: 'Failed to refresh session',
          status: 401,
        } as AuthError,
      }
    }

    return { success: true, data: data.session, error: null }
  },
}
