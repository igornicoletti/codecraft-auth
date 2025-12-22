import { env } from '@/lib/env'
import type { CookieOptions } from '@supabase/ssr'
import { createServerClient } from '@supabase/ssr'

export const createSupabaseServerClient = (req: Request, resHeaders: Headers) => {
  const cookies = new Map<string, string>()

  const cookieHeader = req.headers.get('cookie')
  if (cookieHeader) {
    cookieHeader.split(';').forEach((cookie) => {
      const [name, value] = cookie.trim().split('=')
      cookies.set(name, decodeURIComponent(value))
    })
  }

  return createServerClient(
    env.supabase.url,
    env.supabase.anonKey,
    {
      cookies: {
        get(name) {
          return cookies.get(name)
        },
        set(name, value, options: CookieOptions) {
          let cookie = `${name}=${encodeURIComponent(value)}`
          if (options?.path) cookie += `; Path=${options.path}`
          if (options?.maxAge) cookie += `; Max-Age=${options.maxAge}`
          if (options?.secure) cookie += `; Secure`
          if (options?.sameSite) cookie += `; SameSite=${options.sameSite}`
          resHeaders.append('Set-Cookie', cookie)
        },
        remove(name, options: CookieOptions) {
          resHeaders.append(
            'Set-Cookie',
            `${name}=; Path=${options?.path || '/'}; Max-Age=0`
          )
        },
      },
    }
  )
}
