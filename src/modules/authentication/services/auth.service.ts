import type { AuthError } from '@supabase/supabase-js'

import { supabase } from '@/lib/supabase'
import type {
  AuthResult,
  SessionResult,
  SignInResult,
  SignUpResult,
  UserResult,
  VoidResult
} from '@/modules/authentication/types/auth.types'
import { ROUTE_PATHS } from '@/routes/configs/route-paths'

/**
 * Configuration for retry behavior on network failures.
 */
const RETRY_CONFIG = {
  maxRetries: 3,
  initialDelayMs: 1000,
  maxDelayMs: 5000,
  timeoutMs: 10000,
} as const

/**
 * Gets the redirect URL for authentication flows.
 * Uses window.location.origin in browser, with fallback for SSR.
 *
 * @param path - The path to redirect to
 * @returns The full redirect URL
 */
const getRedirectUrl = (path: string): string => {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}${path}`
  }
  // Fallback for SSR or testing environments
  return `http://localhost:5173${path}`
}

/**
 * Implements exponential backoff for retries.
 *
 * @param attempt - The current attempt number (0-indexed)
 * @returns The delay in milliseconds
 */
const getRetryDelay = (attempt: number): number => {
  const delay = RETRY_CONFIG.initialDelayMs * Math.pow(2, attempt)
  return Math.min(delay, RETRY_CONFIG.maxDelayMs)
}

/**
 * Wraps an async operation with retry logic for network failures.
 *
 * @param operation - The async operation to retry
 * @param maxRetries - Maximum number of retry attempts
 * @returns The result of the operation
 */
async function withRetry<T>(
  operation: () => Promise<AuthResult<T>>,
  maxRetries: number = RETRY_CONFIG.maxRetries
): Promise<AuthResult<T>> {
  let lastError: AuthResult<T> | null = null

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const result = await Promise.race([
        operation(),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Request timeout')), RETRY_CONFIG.timeoutMs)
        ),
      ])

      // If successful or non-retryable error, return immediately
      if (result.success || !isRetryableError(result.error.message)) {
        return result
      }

      lastError = result

      // Don't delay after the last attempt
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, getRetryDelay(attempt)))
      }
    } catch (err) {
      // Handle timeout or unexpected errors
      if (attempt === maxRetries) {
        return {
          success: false,
          data: null,
          error: {
            message: err instanceof Error ? err.message : 'Unknown error',
            status: 0,
            name: 'NetworkError',
          } as AuthError,
        }
      }
      await new Promise(resolve => setTimeout(resolve, getRetryDelay(attempt)))
    }
  }

  return lastError!
}

/**
 * Determines if an error is retryable (network-related).
 *
 * @param errorMessage - The error message to check
 * @returns True if the error should be retried
 */
function isRetryableError(errorMessage: string): boolean {
  const retryableErrors = [
    'Network error',
    'fetch failed',
    'Failed to fetch',
    'Request timeout',
    'rate limit exceeded',
  ]
  return retryableErrors.some(msg =>
    errorMessage.toLowerCase().includes(msg.toLowerCase())
  )
}

/**
 * Authentication service with retry logic and proper error handling.
 * All methods return discriminated union types for type-safe error handling.
 */
export const authService = {
  /**
   * Signs up a new user with email and password.
   *
   * @param email - User's email address
   * @param password - User's password
   * @param fullName - Optional full name for user metadata
   * @returns SignUpResult with user data or error
   */
  async signUp(email: string, password: string, fullName?: string): Promise<SignUpResult> {
    return withRetry(async () => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: getRedirectUrl(ROUTE_PATHS.APP.DASHBOARD),
        },
      })

      if (error) {
        return { success: false, data: null, error }
      }

      return { success: true, data: data.user!, error: null }
    })
  },

  /**
   * Signs in a user with email and password.
   *
   * @param email - User's email address
   * @param password - User's password
   * @returns SignInResult with session data or error
   */
  async signIn(email: string, password: string): Promise<SignInResult> {
    return withRetry(async () => {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })

      if (error) {
        return { success: false, data: null, error }
      }

      return { success: true, data: data.session!, error: null }
    })
  },

  /**
   * Signs in a user with Google OAuth.
   *
   * @returns VoidResult indicating success or error
   */
  async signInWithGoogle(): Promise<VoidResult> {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: getRedirectUrl(ROUTE_PATHS.APP.DASHBOARD) },
    })

    if (error) {
      return { success: false, data: null, error }
    }

    return { success: true, data: undefined as void, error: null }
  },

  /**
   * Signs out the current user.
   *
   * @returns VoidResult indicating success or error
   */
  async signOut(): Promise<VoidResult> {
    const { error } = await supabase.auth.signOut()

    if (error) {
      return { success: false, data: null, error }
    }

    return { success: true, data: undefined as void, error: null }
  },

  /**
   * Sends a password reset email to the user.
   *
   * @param email - User's email address
   * @returns VoidResult indicating success or error
   */
  async sendPasswordReset(email: string): Promise<VoidResult> {
    return withRetry(async () => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: getRedirectUrl(ROUTE_PATHS.AUTH.UPDATE_PASSWORD),
      })

      if (error) {
        return { success: false, data: null, error }
      }

      return { success: true, data: undefined as void, error: null }
    })
  },

  /**
   * Updates the current user's password.
   *
   * @param newPassword - The new password
   * @returns VoidResult indicating success or error
   */
  async updatePassword(newPassword: string): Promise<VoidResult> {
    const { error } = await supabase.auth.updateUser({ password: newPassword })

    if (error) {
      return { success: false, data: null, error }
    }

    return { success: true, data: undefined as void, error: null }
  },

  /**
   * Resends the verification email to the user.
   *
   * @param email - User's email address
   * @returns VoidResult indicating success or error
   */
  async resendVerificationEmail(email: string): Promise<VoidResult> {
    return withRetry(async () => {
      const { error } = await supabase.auth.resend({ type: 'signup', email })

      if (error) {
        return { success: false, data: null, error }
      }

      return { success: true, data: undefined as void, error: null }
    })
  },

  /**
   * Gets the current session.
   *
   * @returns SessionResult with session data or error
   */
  async getSession(): Promise<SessionResult> {
    const { data, error } = await supabase.auth.getSession()

    if (error) {
      return { success: false, data: null, error }
    }

    if (!data.session) {
      return {
        success: false,
        data: null,
        error: {
          message: 'No session found',
          status: 401,
          name: 'AuthSessionMissingError',
        } as AuthError,
      }
    }

    return { success: true, data: data.session, error: null }
  },

  /**
   * Gets the current user.
   *
   * @returns UserResult with user data or error
   */
  async getCurrentUser(): Promise<UserResult> {
    const { data, error } = await supabase.auth.getUser()

    if (error) {
      return { success: false, data: null, error }
    }

    return { success: true, data: data.user, error: null }
  },

  /**
   * Refreshes the current session.
   *
   * @returns SessionResult with refreshed session or error
   */
  async refreshSession(): Promise<SessionResult> {
    const { data, error } = await supabase.auth.refreshSession()

    if (error) {
      return { success: false, data: null, error }
    }

    if (!data.session) {
      return {
        success: false,
        data: null,
        error: {
          message: 'Failed to refresh session',
          status: 401,
          name: 'AuthSessionMissingError',
        } as AuthError,
      }
    }

    return { success: true, data: data.session, error: null }
  },
}
