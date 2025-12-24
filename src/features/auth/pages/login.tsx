// src/features/auth/pages/login.tsx
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { AuthForm } from '@/features/auth/components/auth-form'
import { AUTH_CONTENT } from '@/features/auth/constants/auth-content'
import { useAuthSubmit } from '@/features/auth/hooks/use-auth-submit'
import { loginSchema, type LoginInput } from '@/features/auth/schemas/auth.schema'
import { authService } from '@/features/auth/services/auth.service'
import { APP_PATHS } from '@/routes/paths'

export const LoginPage = () => {
  const { loginPage } = AUTH_CONTENT
  const { handleSubmit: authSubmit } = useAuthSubmit<LoginInput>()

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (data: LoginInput) => {
    await authSubmit((vals) =>
      authService.signIn(vals.email, vals.password),
      data,
      APP_PATHS.DASHBOARD.ROOT
    )
  }

  const handleGoogleLogin = async () => {
    try {
      await authService.signInWithGoogle()
    } catch (err) {
      console.error('Google Auth Error:', err)
    }
  }

  const formFields = [{
    name: 'email' as const,
    label: loginPage.fields.emailLabel,
    placeholder: loginPage.fields.emailPlaceholder,
    type: 'email',
    autoComplete: 'username',
  }, {
    name: 'password' as const,
    label: loginPage.fields.passwordLabel,
    placeholder: loginPage.fields.passwordPlaceholder,
    type: 'password',
    autoComplete: 'current-password',
  }]

  return (
    <main className='flex min-h-svh flex-col'>
      <div className='flex flex-1 items-center justify-center py-12'>
        <div className='w-full max-w-md'>
          <Card className='bg-transparent border-none md:bg-card md:bg-linear-to-b from-secondary/50'>
            <CardHeader>
              <CardTitle>{loginPage.title}</CardTitle>
              <CardDescription>{loginPage.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant='secondary'
                className='w-full'
                onClick={handleGoogleLogin}
                disabled={isSubmitting}>
                {loginPage.social}
              </Button>
              <div className='flex items-center justify-center gap-2 overflow-hidden'>
                <Separator className='shrink' />
                <span className='text-sm text-muted-foreground min-w-fit'>ou</span>
                <Separator className='shrink' />
              </div>
              <AuthForm
                form={form}
                onSubmit={onSubmit}
                submitText={loginPage.submitButton}
                isLoading={isSubmitting}
                fields={formFields} />
            </CardContent>
            <CardFooter>
              <Button asChild variant='link'>
                <Link to={loginPage.forgotPassword.link}>
                  {loginPage.forgotPassword.question}
                </Link>
              </Button>
              <p className='text-sm text-muted-foreground'>
                {loginPage.actions.question}{' '}
                <Link to={loginPage.actions.link} className='text-primary font-medium underline-offset-4 hover:underline'>
                  {loginPage.actions.label}
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  )
}
