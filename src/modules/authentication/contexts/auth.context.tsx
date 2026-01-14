import type { Session, User } from '@supabase/supabase-js'
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

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

  const { user } = session

  if (user?.recovery_sent_at) return 'password_recovery'
  if (!user?.email_confirmed_at) return 'email_unverified'

  return 'authenticated'
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const signOut = useCallback(async () => {
    try {
      await authService.signOut()
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('[Auth] Sign out error:', error)
      }
    } finally {
      setSession(null)
      setUser(null)
    }
  }, [])

  useEffect(() => {
    let isMounted = true
    let subscription: ReturnType<typeof supabase.auth.onAuthStateChange>['data']['subscription'] | null = null
    let bootstrapCompleted = false

    const setupAuthListener = () => {
      const { data } = supabase.auth.onAuthStateChange((_event, currentSession) => {
        if (!isMounted) return

        setSession(currentSession)
        setUser(currentSession?.user ?? null)

        if (bootstrapCompleted && isLoading) {
          setIsLoading(false)
        }
      })

      subscription = data.subscription
    }

    const bootstrap = async () => {
      try {
        const result = await authService.getSession()

        if (!isMounted) return

        if (result.success && result.data) {
          setSession(result.data)
          setUser(result.data.user)
        } else {
          setSession(null)
          setUser(null)
        }
      } catch (err) {
        if (import.meta.env.DEV) {
          console.error('[Auth] Bootstrap error:', err)
        }

        if (isMounted) {
          setSession(null)
          setUser(null)
        }
      } finally {
        bootstrapCompleted = true
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    setupAuthListener()
    void bootstrap()

    return () => {
      isMounted = false
      subscription?.unsubscribe()
    }
  }, [isLoading])

  const authStatus = useMemo<AuthStatus>(() =>
    isLoading ? 'loading' : resolveAuthStatus(session),
    [isLoading, session])

  const value = useMemo<AuthContextData>(() => ({
    user,
    session,
    authStatus,
    isLoading,
    isAuthenticated: authStatus === 'authenticated',
    isEmailVerified: authStatus === 'authenticated',
    isPasswordRecovery: authStatus === 'password_recovery',
    signOut,
  }), [user, session, authStatus, isLoading, signOut])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
