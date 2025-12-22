import { createServerClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'

import { env } from '@/lib/env'

export const createSupabaseServerClient = (req: Request, resHeaders: Headers): SupabaseClient => {
  return createServerClient(env.supabase.url, env.supabase.anonKey, {
    cookies: {
      getAll: () => {
        const cookieHeader = req.headers.get('cookie') ?? ''
        return cookieHeader.split('; ').map((cookie) => {
          const [name, ...rest] = cookie.split('=')
          return { name, value: decodeURIComponent(rest.join('=')) }
        })
      },
      setAll: (cookies) => {
        for (const cookie of cookies) {
          const serialized = `${cookie.name}=${encodeURIComponent(cookie.value)}; Path=/; HttpOnly; SameSite=Lax`
          resHeaders.append('Set-Cookie', serialized)
        }
      },
    },
  })
}
