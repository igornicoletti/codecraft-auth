import type { AuthError, Session, User } from '@supabase/supabase-js'

/**
 * Discriminated union type for successful authentication responses.
 */
export type AuthSuccess<T> = {
  success: true
  data: T
  error: null
}

/**
 * Discriminated union type for failed authentication responses.
 */
export type AuthFailure = {
  success: false
  data: null
  error: AuthError
}

/**
 * Generic authentication result type using discriminated unions.
 * This allows for proper type narrowing in consuming code.
 */
export type AuthResult<T = void> = AuthSuccess<T> | AuthFailure

/**
 * Helper type guard to check if an auth result is successful.
 * 
 * @param result - The auth result to check
 * @returns True if the result is successful
 */
export function isAuthSuccess<T>(result: AuthResult<T>): result is AuthSuccess<T> {
  return result.success === true
}

/**
 * Helper type guard to check if an auth result is a failure.
 * 
 * @param result - The auth result to check
 * @returns True if the result is a failure
 */
export function isAuthFailure<T>(result: AuthResult<T>): result is AuthFailure {
  return result.success === false
}

/**
 * Specific auth result types for common operations.
 */
export type SignInResult = AuthResult<Session>
export type SignUpResult = AuthResult<User>
export type SessionResult = AuthResult<Session>
export type UserResult = AuthResult<User>
export type VoidResult = AuthResult<void>
