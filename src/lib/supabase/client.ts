import { env } from '@/lib/env'
import { createBrowserClient } from '@supabase/ssr'

export const supabase = createBrowserClient(
  env.supabase.url,
  env.supabase.anonKey,
  {
    cookies: {
      get(name) {
        if (typeof document === 'undefined') return null
        const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
        return match ? decodeURIComponent(match[2]) : null
      },
    },
  }
)
