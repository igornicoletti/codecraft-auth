import type { Session, User } from '@supabase/supabase-js'
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

import { supabase } from '@/lib/supabase'
import { authService } from '@/modules/authentication/services/auth.service'
import type { AuthContextData, AuthStatus } from '@/modules/authentication/types/auth.types'

const AuthContext = createContext<AuthContextData | undefined>(undefined)

const getStatus = (isLoading: boolean, session: Session | null): AuthStatus => {
  if (isLoading) return 'loading'
  if (!session || !session.user) return 'anonymous'

  const { user } = session
  if (user.recovery_sent_at) return 'password_recovery'
  if (!user.email_confirmed_at) return 'email_unverified'

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
      if (import.meta.env.DEV) console.error('[Auth] Erro ao sair:', error)
    } finally {
      setSession(null)
      setUser(null)
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (isMounted) {
        setSession(currentSession)
        setUser(currentSession?.user ?? null)
        setIsLoading(false)
      }
    })

    const initAuth = async () => {
      try {
        const result = await authService.getSession()
        if (isMounted) {
          if (result.success) {
            setSession(result.data)
            setUser(result.data.user)
          }
        }
      } catch (err) {
        if (import.meta.env.DEV) console.error('[Auth] Erro na inicialização:', err)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    void initAuth()

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  const authStatus = useMemo(() => getStatus(isLoading, session), [isLoading, session])

  const contextValue = useMemo<AuthContextData>(() => ({
    user,
    session,
    authStatus,
    isLoading,
    isAuthenticated: authStatus === 'authenticated',
    isEmailVerified: authStatus === 'authenticated',
    isPasswordRecovery: authStatus === 'password_recovery',
    signOut,
  }), [user, session, authStatus, isLoading, signOut])

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
