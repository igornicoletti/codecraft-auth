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
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: getRedirectUrl(ROUTE_PATHS.APP.DASHBOARD),
      },
    })
    return { data: data.user, error }
  },

  async signIn(email: string, password: string): Promise<AuthServiceResponse<Session>> {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    return { data: data.session, error }
  },

  async signInWithGoogle(): Promise<AuthServiceResponse> {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: getRedirectUrl(ROUTE_PATHS.APP.DASHBOARD),
      },
    })
    return { data: null, error }
  },

  async signOut(): Promise<AuthServiceResponse> {
    const { error } = await supabase.auth.signOut()
    return { data: null, error }
  },

  async sendPasswordReset(email: string): Promise<AuthServiceResponse> {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: getRedirectUrl(ROUTE_PATHS.AUTH.UPDATE_PASSWORD),
    })
    return { data: null, error }
  },

  async updatePassword(newPassword: string): Promise<AuthServiceResponse> {
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    return { data: null, error }
  },

  async resendVerificationEmail(email: string): Promise<AuthServiceResponse> {
    const { error } = await supabase.auth.resend({ type: 'signup', email })
    return { data: null, error }
  },

  async getSession(): Promise<AuthServiceResponse<Session>> {
    const { data, error } = await supabase.auth.getSession()
    return { data: data.session, error }
  },

  async getCurrentUser(): Promise<AuthServiceResponse<User>> {
    const { data, error } = await supabase.auth.getUser()
    return { data: data.user, error }
  },
}
