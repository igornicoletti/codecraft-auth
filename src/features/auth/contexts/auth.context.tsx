import type { Session, User } from '@supabase/supabase-js'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

import { supabase } from '@/lib/supabase'

interface AuthProviderState {
  user: User | null
  session: Session | null
  loading: boolean
}

const AuthProviderContext = createContext<AuthProviderState | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeAuth = async () => {
      const minimumDelay = new Promise((resolve) => setTimeout(resolve, 800))

      try {
        const [{ data }] = await Promise.all([
          supabase.auth.getSession(),
          minimumDelay
        ])

        setSession(data.session)
        setUser(data.session?.user ?? null)
      } catch (error) {
        console.error('Erro ao inicializar auth:', error)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthProviderContext.Provider value={{ user, session, loading }}>
      {children}
    </AuthProviderContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthProviderContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
