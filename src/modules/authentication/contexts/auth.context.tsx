import type { Session, User } from '@supabase/supabase-js'
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

import { supabase } from '@/lib/supabase'
import { authService } from '@/modules/authentication/services/auth.service'

export interface AuthContextData {
  user: User | null
  session: Session | null
  isLoading: boolean
  isAuthenticated: boolean
  isEmailVerified: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextData | undefined>(undefined)

/**
 * Provides authentication state and methods to the application.
 * Synchronizes with Supabase auth events and manages session persistence.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    /**
     * Initializes the session on mount and sets up the auth listener.
     */
    const initializeAuth = async () => {
      try {
        // Initial session check
        const { data, error } = await authService.getSession()

        if (isMounted) {
          if (error && error.status !== 401) {
            console.error('[AuthContext] Session initialization error:', error)
          }
          setSession(data)
          setUser(data?.user ?? null)
        }
      } catch (err) {
        console.error('[AuthContext] Unexpected initialization error:', err)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    initializeAuth()

    // Listen for auth changes (sign in, sign out, token refresh, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      if (!isMounted) return

      setSession(currentSession)
      setUser(currentSession?.user ?? null)

      // Refresh user data if profile is updated
      if (event === 'USER_UPDATED') {
        const { data: updatedUser } = await authService.getCurrentUser()
        if (updatedUser) setUser(updatedUser)
      }

      setIsLoading(false)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  /**
   * Computed property to check if the user's email is verified.
   */
  const isEmailVerified = useMemo(() => !!user?.email_confirmed_at, [user])

  /**
   * Signs out the user and clears local state.
   */
  const signOut = async () => {
    try {
      await authService.signOut()
    } catch (error) {
      console.error('[AuthContext] Sign out error:', error)
    } finally {
      // Always clear state even if the network request fails
      setUser(null)
      setSession(null)
    }
  }

  const value = useMemo(() => ({
    user,
    session,
    isLoading,
    isAuthenticated: !!user,
    isEmailVerified,
    signOut,
  }), [user, session, isLoading, isEmailVerified])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
