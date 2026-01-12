import type { Session, User } from '@supabase/supabase-js'
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

import { supabase } from '@/lib/supabase'
import { authService } from '@/modules/authentication/services/auth.service'

export type AuthStatus =
  | 'loading'
  | 'anonymous'
  | 'email_unverified'
  | 'password_recovery'
  | 'authenticated'

export interface AuthContextData {
  user: User | null
  session: Session | null
  authStatus: AuthStatus
  isLoading: boolean
  isAuthenticated: boolean
  isEmailVerified: boolean
  isPasswordRecovery: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextData | undefined>(undefined)

const resolveAuthStatus = (session: Session | null): AuthStatus => {
  if (!session) return 'anonymous'

  const user = session.user

  if (user?.recovery_sent_at) return 'password_recovery'
  if (!user?.email_confirmed_at) return 'email_unverified'

  return 'authenticated'
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function bootstrap() {
      try {
        const { data, error } = await authService.getSession()

        if (!isMounted) return

        if (error && error.status !== 401) {
          console.error('[Auth] Session bootstrap error:', error)
        }

        setSession(data)
        setUser(data?.user ?? null)
      } catch (err) {
        console.error('[Auth] Unexpected bootstrap error:', err)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    bootstrap()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
      if (!isMounted) return

      setSession(currentSession)
      setUser(currentSession?.user ?? null)
      setIsLoading(false)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  const authStatus = useMemo<AuthStatus>(() => {
    if (isLoading) return 'loading'
    return resolveAuthStatus(session)
  }, [isLoading, session])

  const isAuthenticated = authStatus === 'authenticated'
  const isEmailVerified = authStatus === 'authenticated'
  const isPasswordRecovery = authStatus === 'password_recovery'

  const signOut = async () => {
    try {
      await authService.signOut()
    } catch (error) {
      console.error('[Auth] Sign out error:', error)
    } finally {
      setSession(null)
      setUser(null)
    }
  }

  const value = useMemo<AuthContextData>(() => ({
    user,
    session,
    authStatus,
    isLoading,
    isAuthenticated,
    isEmailVerified,
    isPasswordRecovery,
    signOut,
  }), [user, session, authStatus, isLoading, isAuthenticated, isEmailVerified, isPasswordRecovery])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
