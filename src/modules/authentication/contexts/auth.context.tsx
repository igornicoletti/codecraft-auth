import type { Session, User } from '@supabase/supabase-js'
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

import { supabase } from '@/lib/supabase'
import { authService } from '@/modules/authentication/services/auth.service'

interface AuthContextData {
  user: User | null
  session: Session | null
  isLoading: boolean
  isAuthenticated: boolean
  isEmailVerified: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextData | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const initSession = async () => {
      try {
        const { data, error } = await authService.getSession()
        if (!isMounted) return
        if (error) console.error('[AuthContext] getSession error:', error)
        setSession(data)
        setUser(data?.user ?? null)
      } catch (err) {
        console.error('[AuthContext] Unexpected error:', err)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    initSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      if (!isMounted) return
      setSession(currentSession)
      setUser(currentSession?.user ?? null)
      if (event === 'USER_UPDATED') {
        const { data: updatedUser } = await authService.getCurrentUser()
        if (updatedUser) setUser(updatedUser)
      }
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  const isEmailVerified = useMemo(() => {
    if (!user?.email_confirmed_at) return false
    const confirmedAt = new Date(user.email_confirmed_at)
    return confirmedAt instanceof Date && !isNaN(confirmedAt.getTime())
  }, [user])

  const isSessionValid = useMemo(() => {
    if (!session?.expires_at) return false
    return Date.now() / 1000 < session.expires_at
  }, [session])

  useEffect(() => {
    const refreshIfNeeded = async () => {
      if (!isSessionValid && session) {
        const { data, error } = await supabase.auth.refreshSession()
        if (!error && data?.session) {
          setSession(data.session)
          setUser(data.session.user)
        }
      }
    }
    refreshIfNeeded()
  }, [isSessionValid, session])

  const signOut = async () => {
    try {
      const { error } = await authService.signOut()
      if (error) console.error('[signOut] error:', error)
    } finally {
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
