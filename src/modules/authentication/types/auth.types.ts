import type { AuthError, Session, User } from '@supabase/supabase-js'

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
