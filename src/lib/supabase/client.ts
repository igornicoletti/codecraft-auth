import { env } from '@/lib/env'
import { createBrowserClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

const isServer = typeof window === 'undefined'

if (!env.supabase.url || !env.supabase.anonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = isServer
  ? createClient(env.supabase.url, env.supabase.anonKey, {
    auth: {
      persistSession: false,
    },
  })
  : createBrowserClient(env.supabase.url, env.supabase.anonKey, {
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
