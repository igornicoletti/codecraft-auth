import { env } from '@/lib/env'
import { createServerClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'

export const createSupabaseServerClient = (req: Request, resHeaders: Headers): SupabaseClient =>
  createServerClient(env.supabase.url, env.supabase.anonKey, {
    cookies: {
      getAll() {
        const cookieHeader = req.headers.get('cookie') ?? ''
        return cookieHeader.split('; ').map((cookie) => {
          const [name, ...rest] = cookie.split('=')
          return { name, value: decodeURIComponent(rest.join('=')) }
        })
      },
      setAll(cookies) {
        for (const { name, value } of cookies) {
          resHeaders.append(
            'Set-Cookie',
            `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax`
          )
        }
      },
    },
  })
