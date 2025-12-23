import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AuthForm } from '@/features/auth/components/auth-form'
import { AUTH_CONTENT } from '@/features/auth/constants/auth-content'
import { useAuthSubmit } from '@/features/auth/hooks/use-auth-submit'
import { forgotPasswordSchema, type ForgotPasswordInput } from '@/features/auth/schemas/auth.schema'
import { authService } from '@/features/auth/services/auth.service'

export const ForgotPasswordPage = () => {
  const { forgotPasswordPage } = AUTH_CONTENT

  const { handleSubmit: authSubmit } = useAuthSubmit<ForgotPasswordInput>()

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (data: ForgotPasswordInput) => {
    await authSubmit((vals) => authService.resetPassword(vals.email), data, 'forgotPassword')
  }
  const formFields = [
    {
      name: 'email' as const,
      label: forgotPasswordPage.fields.emailLabel,
      placeholder: forgotPasswordPage.fields.emailPlaceholder,
      type: 'email',
      autoComplete: 'email',
    },
  ]

  return (
    <main className='flex min-h-svh w-full items-center justify-center p-4'>
      <div className='w-full max-w-md flex flex-col gap-4 md:gap-6'>
        <Card className='w-full bg-linear-to-t from-muted/50 to-card'>
          <CardHeader>
            <CardTitle>{forgotPasswordPage.title}</CardTitle>
            <CardDescription>{forgotPasswordPage.description}</CardDescription>
          </CardHeader>

          <CardContent>
            <AuthForm
              form={form}
              onSubmit={onSubmit}
              submitText={forgotPasswordPage.submitButton}
              isLoading={isSubmitting}
              fields={formFields} />
          </CardContent>

          <CardFooter>
            <div className='flex items-baseline gap-1'>
              <p className='text-sm text-muted-foreground'>
                {forgotPasswordPage.signIn.question}
              </p>
              <Button asChild size='sm' variant='link'>
                <Link to={forgotPasswordPage.signIn.link}>
                  {forgotPasswordPage.signIn.label}
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
