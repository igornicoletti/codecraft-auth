import { createAppServerRouter } from '@/features/route/router.server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { AuthProvider } from '@/providers/auth-provider'
import { renderToReadableStream } from 'react-dom/server'
import { RouterProvider } from 'react-router-dom'

export default async function handleRequest(req: Request) {
  const headers = new Headers()
  const supabase = createSupabaseServerClient(req, headers)
  const { data } = await supabase.auth.getSession()

  const context = {
    loaderData: { root: { user: data.session?.user ?? null } },
    basename: '/',
    location: new URL(req.url).pathname,
    matches: [],
  } as any

  const router = createAppServerRouter(context)

  const stream = await renderToReadableStream(
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>,
    {
      bootstrapScripts: ['/assets/entry.client.js'],
    }
  )

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/html',
      ...Object.fromEntries(headers.entries()),
    },
  })
}
