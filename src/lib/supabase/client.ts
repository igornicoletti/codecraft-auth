import { env } from '@/lib/env'
import { createBrowserClient } from '@supabase/ssr'

export const supabase = createBrowserClient(
  env.supabase.url,
  env.supabase.anonKey,
  {
    cookies: {
      getAll: () => {
        return document.cookie
          .split('; ')
          .map((cookie) => {
            const [name, ...rest] = cookie.split('=')
            return { name, value: decodeURIComponent(rest.join('=')) }
          })
      },
      setAll: (cookies) => {
        for (const cookie of cookies) {
          document.cookie = `${cookie.name}=${encodeURIComponent(cookie.value)}; path=/; SameSite=Lax`
        }
      },
    },
  }
)
