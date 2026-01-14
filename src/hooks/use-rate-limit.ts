import { useCallback, useRef } from 'react'

interface RateLimitConfig {
  maxAttempts: number
  windowMs: number
  blockDurationMs?: number
}

interface RateLimitResult {
  isBlocked: boolean
  remainingAttempts: number
  resetAt: number | null
}

export const useRateLimit = (config: RateLimitConfig) => {
  const attemptsRef = useRef<number[]>([])
  const blockedUntilRef = useRef<number | null>(null)

  const checkRateLimit = useCallback((): RateLimitResult => {
    const now = Date.now()

    if (blockedUntilRef.current && now < blockedUntilRef.current) {
      return {
        isBlocked: true,
        remainingAttempts: 0,
        resetAt: blockedUntilRef.current,
      }
    }

    if (blockedUntilRef.current && now >= blockedUntilRef.current) {
      blockedUntilRef.current = null
      attemptsRef.current = []
    }

    attemptsRef.current = attemptsRef.current.filter(
      (timestamp) => now - timestamp < config.windowMs
    )

    const remainingAttempts = Math.max(0, config.maxAttempts - attemptsRef.current.length)

    return {
      isBlocked: false,
      remainingAttempts,
      resetAt: attemptsRef.current.length > 0
        ? attemptsRef.current[0] + config.windowMs
        : null,
    }
  }, [config.maxAttempts, config.windowMs])

  const recordAttempt = useCallback((): RateLimitResult => {
    const now = Date.now()
    attemptsRef.current.push(now)

    attemptsRef.current = attemptsRef.current.filter(
      (timestamp) => now - timestamp < config.windowMs
    )

    if (attemptsRef.current.length >= config.maxAttempts) {
      blockedUntilRef.current = now + (config.blockDurationMs || config.windowMs)

      return {
        isBlocked: true,
        remainingAttempts: 0,
        resetAt: blockedUntilRef.current,
      }
    }

    return checkRateLimit()
  }, [config.maxAttempts, config.windowMs, config.blockDurationMs, checkRateLimit])

  const reset = useCallback(() => {
    attemptsRef.current = []
    blockedUntilRef.current = null
  }, [])

  return { checkRateLimit, recordAttempt, reset }
}
