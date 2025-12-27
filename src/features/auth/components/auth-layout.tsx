// src/features/auth/layouts/auth-layout.tsx
import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AUTH_CONTENT } from '@/features/auth/constants/auth-content'

export interface AuthLayoutContext {
  setTitle: (title: string) => void
  setDescription: (desc: string) => void
}

export const AuthLayout = () => {
  const location = useLocation()

  const [customTitle, setCustomTitle] = useState<string | null>(null)
  const [customDescription, setCustomDescription] = useState<string | null>(null)

  const getContentByPath = (path: string) => {
    const normalized = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path
    if (normalized.includes('/login')) return AUTH_CONTENT.login
    if (normalized.includes('/register')) return AUTH_CONTENT.register
    if (normalized.includes('/forgot-password')) return AUTH_CONTENT.forgotPassword
    if (normalized.includes('/update-password')) return AUTH_CONTENT.updatePassword
    return AUTH_CONTENT.login
  }

  const content = getContentByPath(location.pathname)

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
              <Outlet context={{ setTitle: setCustomTitle, setDescription: setCustomDescription } satisfies AuthLayoutContext} />
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
