import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { AuthForm } from '@/features/auth/components/auth-form'
import { AUTH_CONTENT } from '@/features/auth/constants/auth-content'
import { useAuthSubmit } from '@/features/auth/hooks/use-auth-submit'
import { registerSchema, type RegisterInput } from '@/features/auth/schemas/auth.schema'
import { authService } from '@/features/auth/services/auth.service'

export const RegisterPage = () => {
  const { registerPage } = AUTH_CONTENT
  const { handleSubmit: authSubmit } = useAuthSubmit<RegisterInput>()

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' }
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (data: RegisterInput) => {
    await authSubmit((vals) => authService.signUp(vals.email, vals.password), data, 'signUp', '/login')
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
    label: registerPage.fields.emailLabel,
    placeholder: registerPage.fields.emailPlaceholder,
    type: 'email',
    autoComplete: 'username',
  }, {
    name: 'password' as const,
    label: registerPage.fields.passwordLabel,
    placeholder: registerPage.fields.passwordPlaceholder,
    type: 'password',
    autoComplete: 'new-password',
  }, {
    name: 'confirmPassword' as const,
    label: registerPage.fields.confirmPasswordLabel,
    placeholder: registerPage.fields.confirmPasswordPlaceholder,
    type: 'password',
    autoComplete: 'new-password',
  }]

  return (
    <main className='flex min-h-svh w-full items-center justify-center p-4'>
      <div className='w-full max-w-md flex flex-col gap-4 md:gap-6'>
        <Card className='bg-linear-to-b from-secondary/50'>
          <CardHeader>
            <CardTitle>{registerPage.title}</CardTitle>
            <CardDescription>{registerPage.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              type='button'
              variant='secondary'
              className='w-full'
              onClick={handleGoogleLogin}
              disabled={isSubmitting}>
              {registerPage.social}
            </Button>
            <div className='flex items-center justify-center gap-2 overflow-hidden'>
              <Separator className='shrink' />
              <span className='text-sm text-muted-foreground min-w-fit'>ou</span>
              <Separator className='shrink' />
            </div>
            <AuthForm
              form={form}
              onSubmit={onSubmit}
              submitText={registerPage.submitButton}
              isLoading={isSubmitting}
              fields={formFields} />
          </CardContent>
          <CardFooter>
            <p className='text-sm text-muted-foreground'>
              {registerPage.actions.question}{' '}
              <Link to={registerPage.actions.link} className='text-primary underline-offset-4 hover:underline'>
                {registerPage.actions.label}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
