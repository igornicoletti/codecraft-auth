import type { AuthError, Session, User } from '@supabase/supabase-js'

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

export type AuthSuccess<T> = {
  success: true
  data: T
  error: null
}

export type AuthFailure = {
  success: false
  data: null
  error: AuthError
}

export type AuthResult<T = void> = AuthSuccess<T> | AuthFailure

export type SignInResult = AuthResult<Session>
export type SignUpResult = AuthResult<User>
export type SessionResult = AuthResult<Session>
export type UserResult = AuthResult<User>
export type VoidResult = AuthResult<void>
