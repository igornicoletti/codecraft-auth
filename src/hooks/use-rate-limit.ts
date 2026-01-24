import { useCallback, useEffect, useState } from 'react'

interface RateLimitConfig {
  maxAttempts: number
  windowMs: number
  blockDurationMs?: number
  uniqueId: string
}

interface RateLimitResult {
  isBlocked: boolean
  remainingAttempts: number
  resetAt: number | null
}

interface StoredRateLimit {
  attempts: number[]
  blockedUntil: number | null
}

export const useRateLimit = (config: RateLimitConfig) => {
  const storageKey = `rate-limit-${config.uniqueId}`

  // Carrega estado inicial do localStorage
  const getStoredState = (): StoredRateLimit => {
    try {
      const item = localStorage.getItem(storageKey)
      return item ? JSON.parse(item) : { attempts: [], blockedUntil: null }
    } catch {
      return { attempts: [], blockedUntil: null }
    }
  }

  const [state, setState] = useState<StoredRateLimit>(getStoredState)

  // Salva no localStorage sempre que o estado mudar
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state))
  }, [state, storageKey])

  const checkRateLimit = useCallback((): RateLimitResult => {
    const now = Date.now()
    const { attempts, blockedUntil } = state

    // Verifica bloqueio ativo
    if (blockedUntil && now < blockedUntil) {
      return {
        isBlocked: true,
        remainingAttempts: 0,
        resetAt: blockedUntil,
      }
    }

    // Se o tempo de bloqueio expirou, limpa
    if (blockedUntil && now >= blockedUntil) {
      const newState = { attempts: [], blockedUntil: null }
      setState(newState)
      return { isBlocked: false, remainingAttempts: config.maxAttempts, resetAt: null }
    }

    // Filtra tentativas antigas fora da janela
    const validAttempts = attempts.filter((timestamp) => now - timestamp < config.windowMs)

    // Se houve limpeza de tentativas expiradas, atualiza estado
    if (validAttempts.length !== attempts.length) {
      setState(prev => ({ ...prev, attempts: validAttempts }))
    }

    const remainingAttempts = Math.max(0, config.maxAttempts - validAttempts.length)

    return {
      isBlocked: false,
      remainingAttempts,
      resetAt: validAttempts.length > 0 ? validAttempts[0] + config.windowMs : null,
    }
  }, [config.maxAttempts, config.windowMs, state])

  const recordAttempt = useCallback((): RateLimitResult => {
    const now = Date.now()
    let { attempts, blockedUntil } = state // Pega estado atualizado

    // Limpeza preliminar
    attempts = attempts.filter((timestamp) => now - timestamp < config.windowMs)

    // Adiciona nova tentativa
    attempts.push(now)

    let isBlocked = false
    let resetAt: number | null = attempts.length > 0 ? attempts[0] + config.windowMs : null

    if (attempts.length >= config.maxAttempts) {
      blockedUntil = now + (config.blockDurationMs || config.windowMs)
      isBlocked = true
      resetAt = blockedUntil
    }

    // Atualiza estado e storage
    setState({ attempts, blockedUntil })

    return {
      isBlocked,
      remainingAttempts: Math.max(0, config.maxAttempts - attempts.length),
      resetAt,
    }
  }, [config.maxAttempts, config.windowMs, config.blockDurationMs, state])

  const reset = useCallback(() => {
    const newState = { attempts: [], blockedUntil: null }
    setState(newState)
    localStorage.removeItem(storageKey)
  }, [storageKey])

  return { checkRateLimit, recordAttempt, reset }
}
