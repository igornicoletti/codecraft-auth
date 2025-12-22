import { env } from '@/lib/env'
import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'

let browserClient: SupabaseClient | null = null

if (typeof window !== 'undefined') {
  browserClient = createBrowserClient(env.supabase.url, env.supabase.anonKey, {
    cookies: {
      getAll() {
        return document.cookie.split('; ').map((cookie) => {
          const [name, value] = cookie.split('=')
          return { name, value }
        })
      },
      setAll(cookies) {
        for (const { name, value, options } of cookies) {
          document.cookie = `${name}=${value}; path=${options?.path ?? '/'}`
        }
      },
    },
  })
}

export function getSupabaseClient(): SupabaseClient {
  if (!browserClient) {
    throw new Error('Supabase client is only available in the browser environment.')
  }
  return browserClient
}
