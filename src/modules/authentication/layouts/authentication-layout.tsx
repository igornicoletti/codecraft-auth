import { useMemo } from 'react'
import { Link, matchPath, Outlet, useLocation } from 'react-router-dom'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AUTH_CONTENT_MAP } from '@/modules/authentication/configs/auth-content-map'
import { ROUTE_PATHS } from '@/routes/configs/route-paths'

export const AuthenticationLayout = () => {
  const location = useLocation()

  const content = useMemo(() => {
    const pathMap = [
      { path: ROUTE_PATHS.AUTH.SIGN_IN, content: AUTH_CONTENT_MAP.signIn },
      { path: ROUTE_PATHS.AUTH.SIGN_UP, content: AUTH_CONTENT_MAP.signUp },
      { path: ROUTE_PATHS.AUTH.FORGOT_PASSWORD, content: AUTH_CONTENT_MAP.forgotPassword },
      { path: ROUTE_PATHS.AUTH.UPDATE_PASSWORD, content: AUTH_CONTENT_MAP.updatePassword },
      { path: ROUTE_PATHS.AUTH.VERIFY_EMAIL, content: AUTH_CONTENT_MAP.verifyEmail },
    ]

    const active = pathMap.find((item) => matchPath({
      path: item.path,
      end: true
    }, location.pathname))

    return active ? active.content : AUTH_CONTENT_MAP.signIn
  }, [location.pathname])

  return (
    <main className='flex min-h-svh flex-col'>
      <div className='flex flex-1 items-center justify-center py-12'>
        <div className='w-full max-w-md'>
          <Card className='bg-transparent border-none md:bg-card md:bg-linear-to-b from-secondary/50'>
            <CardHeader>
              <CardTitle>{content.title}</CardTitle>
              <CardDescription>{content.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Outlet />
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

export default AuthenticationLayout
