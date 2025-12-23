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

export const LoginPage = () => {
  const { loginPage } = AUTH_CONTENT
  const { handleSubmit: authSubmit } = useAuthSubmit<LoginInput>()

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (data: LoginInput) => {
    await authSubmit((vals) => authService.signIn(vals.email, vals.password), data, 'signIn', '/dashboard')
  }

  const handleGoogleLogin = async () => {
    try {
      await authService.signInWithGoogle()
    } catch (err) {
      console.error('Google Auth Error:', err)
    }
  }

  const formFields = [
    {
      name: 'email' as const,
      label: loginPage.fields.emailLabel,
      placeholder: loginPage.fields.emailPlaceholder,
      type: 'email',
      autoComplete: 'username',
    },
    {
      name: 'password' as const,
      label: loginPage.fields.passwordLabel,
      placeholder: loginPage.fields.passwordPlaceholder,
      type: 'password',
      autoComplete: 'current-password',
    },
  ]

  return (
    <main className='flex min-h-svh w-full items-center justify-center p-4'>
      <div className='w-full max-w-md flex flex-col gap-4 md:gap-6'>
        <Card className='w-full bg-linear-to-t from-muted/50 to-card'>
          <CardHeader>
            <CardTitle>{loginPage.title}</CardTitle>
            <CardDescription>{loginPage.description}</CardDescription>
          </CardHeader>

          <CardContent>
            <Button
              type='button'
              variant='secondary'
              className='w-full'
              onClick={handleGoogleLogin}
              disabled={isSubmitting}>
              Continue with Google
            </Button>

            <div className='flex items-center justify-center gap-2 overflow-hidden'>
              <Separator className='shrink' />
              <span className='text-sm text-muted-foreground min-w-fit'>or</span>
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
            <Button asChild size='sm' variant='link'>
              <Link to={loginPage.forgotPassword.link}>
                {loginPage.forgotPassword.question}
              </Link>
            </Button>
            <div className='flex items-baseline gap-1'>
              <p className='text-sm text-muted-foreground'>
                {loginPage.signUp.question}
              </p>
              <Button asChild size='sm' variant='link'>
                <Link to={loginPage.signUp.link}>
                  {loginPage.signUp.label}
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
