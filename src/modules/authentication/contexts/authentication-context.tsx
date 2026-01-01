import type { Session, User } from '@supabase/supabase-js'
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

import { supabaseClient } from '@/lib/supabase'
import { authenticationService } from '@/modules/authentication/services/authentication-service'

interface AuthenticationContextValue {
  user: User | null
  session: Session | null
  isLoading: boolean
  signOut: () => Promise<void>
}

const AuthenticationContext = createContext<AuthenticationContextValue | undefined>(undefined)

export const AuthenticationProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const initializeAuth = async () => {
      try {
        const { data } = await supabaseClient.auth.getSession()
        if (mounted) {
          setSession(data.session)
          setUser(data.session?.user ?? null)
        }
      } catch (error) {
        console.error('Authentication initialization failed:', error)
      } finally {
        if (mounted) setIsLoading(false)
      }
    }

    initializeAuth()

    const { data: listener } = supabaseClient.auth.onAuthStateChange((_event, newSession) => {
      if (mounted) {
        setSession(newSession)
        setUser(newSession?.user ?? null)
        setIsLoading(false)
      }
    })

    return () => {
      mounted = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    try {
      await authenticationService.signOut()
      setUser(null)
      setSession(null)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const value = useMemo(
    () => ({ user, session, isLoading, signOut }),
    [user, session, isLoading]
  )

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  )
}

export const useAuthentication = (): AuthenticationContextValue => {
  const context = useContext(AuthenticationContext)
  if (!context) {
    throw new Error('useAuthentication must be used within AuthenticationProvider')
  }
  return context
}
