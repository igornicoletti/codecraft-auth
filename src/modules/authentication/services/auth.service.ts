import type { AuthError, Session, User } from '@supabase/supabase-js'

import { supabase } from '@/lib/supabase'
import { ROUTE_PATHS } from '@/routes/configs/route-paths'

export interface AuthServiceResponse<T = void> {
  data: T | null
  error: AuthError | null
}

const getRedirectUrl = (path: string) => `${window.location.origin}${path}`

export const authService = {
  async signUp(email: string, password: string, fullName?: string): Promise<AuthServiceResponse<User>> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: getRedirectUrl(ROUTE_PATHS.APP.DASHBOARD),
        },
      })
      return { data: data.user, error }
    } catch (err) {
      return { data: null, error: err as AuthError }
    }
  },

  async signIn(email: string, password: string): Promise<AuthServiceResponse<Session>> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      return { data: data.session, error }
    } catch (err) {
      return { data: null, error: err as AuthError }
    }
  },

  async signInWithGoogle(): Promise<AuthServiceResponse> {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: getRedirectUrl(ROUTE_PATHS.APP.DASHBOARD) },
      })
      return { data: null, error }
    } catch (err) {
      return { data: null, error: err as AuthError }
    }
  },

  async signOut(): Promise<AuthServiceResponse> {
    try {
      const { error } = await supabase.auth.signOut()
      return { data: null, error }
    } catch (err) {
      return { data: null, error: err as AuthError }
    }
  },

  async sendPasswordReset(email: string): Promise<AuthServiceResponse> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: getRedirectUrl(ROUTE_PATHS.AUTH.UPDATE_PASSWORD),
      })
      return { data: null, error }
    } catch (err) {
      return { data: null, error: err as AuthError }
    }
  },

  async updatePassword(newPassword: string): Promise<AuthServiceResponse> {
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword })
      return { data: null, error }
    } catch (err) {
      return { data: null, error: err as AuthError }
    }
  },

  async resendVerificationEmail(email: string): Promise<AuthServiceResponse> {
    try {
      const { error } = await supabase.auth.resend({ type: 'signup', email })
      return { data: null, error }
    } catch (err) {
      return { data: null, error: err as AuthError }
    }
  },

  async getSession(): Promise<AuthServiceResponse<Session>> {
    try {
      const { data, error } = await supabase.auth.getSession()
      return { data: data.session ?? null, error }
    } catch (err) {
      return { data: null, error: err as AuthError }
    }
  },

  async getCurrentUser(): Promise<AuthServiceResponse<User>> {
    try {
      const { data, error } = await supabase.auth.getUser()
      return { data: data.user, error }
    } catch (err) {
      return { data: null, error: err as AuthError }
    }
  },
}
