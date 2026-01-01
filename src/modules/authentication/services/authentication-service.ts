import type { AuthResponse, UserResponse } from '@supabase/supabase-js'

import { supabaseClient } from '@/lib/supabase'
import { ROUTE_PATHS } from '@/routes/configs/route-paths'

export const authenticationService = {
  async signInWithGoogle(): Promise<void> {
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}${ROUTE_PATHS.APP.DASHBOARD}`,
        queryParams: { access_type: 'offline', prompt: 'consent' },
      },
    })
    if (error) throw error
  },

  async signIn(email: string, password: string): Promise<AuthResponse['data']> {
    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  },

  async signUp(email: string, password: string): Promise<AuthResponse['data']> {
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: { email_confirmed: true },
      },
    })
    if (error) throw error
    return data
  },

  async signOut(): Promise<void> {
    const { error } = await supabaseClient.auth.signOut()
    if (error) throw error
  },

  async sendPasswordReset(email: string): Promise<void> {
    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}${ROUTE_PATHS.AUTH.UPDATE_PASSWORD}`,
    })
    if (error) throw error
  },

  async updatePassword(password: string): Promise<UserResponse['data']> {
    const { data, error } = await supabaseClient.auth.updateUser({ password })
    if (error) throw error
    return data
  },
}
