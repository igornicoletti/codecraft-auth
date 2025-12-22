import { getSupabaseClient } from '@/lib/supabase/client'

export const authService = {
  async signInWithGoogle() {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
        queryParams: { access_type: 'offline', prompt: 'consent' },
      },
    })
    if (error) throw error
    return data
  },

  async signIn(email: string, password: string) {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  },

  async signUp(email: string, password: string) {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    return data
  },

  async signOut() {
    const supabase = getSupabaseClient()
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async resetPassword(email: string) {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) throw error
    return data
  },

  async updatePassword(newPassword: string) {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) throw error
    return data
  },

  async getSession() {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.auth.getSession()
    if (error) throw error
    return data.session
  },

  async getUser() {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.auth.getUser()
    if (error) throw error
    return data.user
  },
}
