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
    authService.getSession().then(({ data }) => {
      setSession(data)
      setUser(data?.user ?? null)
      setIsLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        setSession(currentSession)
        setUser(currentSession?.user ?? null)

        if (event === 'USER_UPDATED') {
          const { data: updatedUser } = await authService.getCurrentUser()
          setUser(updatedUser)
        }

        setIsLoading(false)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    await authService.signOut()
  }

  const value = useMemo(() => ({
    user,
    session,
    isLoading,
    isAuthenticated: !!user,
    isEmailVerified: !!user?.email_confirmed_at,
    signOut,
  }), [user, session, isLoading])

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
