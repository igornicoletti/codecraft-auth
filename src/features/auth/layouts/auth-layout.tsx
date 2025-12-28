// src/features/auth/layouts/auth-layout.tsx
import { useMemo, useState } from 'react'
import { Link, matchPath, Outlet, useLocation } from 'react-router-dom'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AUTH_CONTENT } from '@/features/auth/constants/auth-content'
import { PATHS } from '@/routes/config'

export interface AuthLayoutContext {
  setTitle: (title: string) => void
  setDescription: (desc: string) => void
}

export const AuthLayout = () => {
  const location = useLocation()
  const [customTitle, setCustomTitle] = useState<string | null>(null)
  const [customDescription, setCustomDescription] = useState<string | null>(null)

  const content = useMemo(() => {
    const pathMap = [
      { path: PATHS.AUTH.LOGIN, content: AUTH_CONTENT.login },
      { path: PATHS.AUTH.REGISTER, content: AUTH_CONTENT.register },
      { path: PATHS.AUTH.FORGOT_PASSWORD, content: AUTH_CONTENT.forgotPassword },
      { path: PATHS.AUTH.UPDATE_PASSWORD, content: AUTH_CONTENT.updatePassword },
    ]

    const active = pathMap.find((item) => matchPath({ path: item.path, end: true }, location.pathname))

    return active ? active.content : AUTH_CONTENT.login
  }, [location.pathname])

  return (
    <main className='flex min-h-svh flex-col'>
      <div className='flex flex-1 items-center justify-center py-12'>
        <div className='w-full max-w-md'>
          <Card className='bg-transparent border-none md:bg-card md:bg-linear-to-b from-secondary/50'>
            <CardHeader>
              <CardTitle>{customTitle ?? content.title}</CardTitle>
              <CardDescription>{customDescription ?? content.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <Outlet context={{
                setTitle: setCustomTitle,
                setDescription: setCustomDescription,
              } satisfies AuthLayoutContext} />
            </CardContent>

            <CardFooter>
              <p className='text-sm text-muted-foreground'>
                {content.actions?.question}{' '}
                <Link to={content.actions.link} className='text-primary font-medium underline-offset-4 hover:underline'>
                  {content.actions.label}
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  )
}
