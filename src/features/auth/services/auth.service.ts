// src/features/auth/services/auth.service.ts
import type { AuthResponse, UserResponse } from '@supabase/supabase-js'

import { supabase } from '@/lib/supabase'

export const authService = {
  async signInWithGoogle(): Promise<void> {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
        queryParams: { access_type: 'offline', prompt: 'consent' },
      },
    })
    if (error) throw error
  },

  async signIn(email: string, password: string): Promise<AuthResponse['data']> {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  },

  async signUp(email: string, password: string): Promise<AuthResponse['data']> {
    const { data, error } = await supabase.auth.signUp({
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
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async resetPassword(email: string): Promise<void> {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    })
    if (error) throw error
  },

  async updatePassword(password: string): Promise<UserResponse['data']> {
    const { data, error } = await supabase.auth.updateUser({ password })
    if (error) throw error
    return data
  },
}
