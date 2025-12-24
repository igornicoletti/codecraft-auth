import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
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
  const [isEmailSent, setIsEmailSent] = useState(false)

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (data: ForgotPasswordInput) => {
    await authSubmit(async (vals) => {
      await authService.resetPassword(vals.email)
      setIsEmailSent(true)
    }, data)
  }

  const formFields = [{
    name: 'email' as const,
    label: forgotPasswordPage.fields.emailLabel,
    placeholder: forgotPasswordPage.fields.emailPlaceholder,
    type: 'email',
    autoComplete: 'email',
  }]

  return (
    <main className='flex min-h-svh flex-col'>
      <div className='flex flex-1 items-center justify-center py-12'>
        <div className='w-full max-w-md'>
          <Card className='bg-transparent border-none md:bg-card md:bg-linear-to-b from-secondary/50'>
            <CardHeader>
              <CardTitle>{forgotPasswordPage.title}</CardTitle>
              <CardDescription>
                {isEmailSent ? forgotPasswordPage.message : forgotPasswordPage.description}
              </CardDescription>
            </CardHeader>
            {!isEmailSent && (
              <CardContent>
                <AuthForm
                  form={form}
                  onSubmit={onSubmit}
                  submitText={forgotPasswordPage.submitButton}
                  isLoading={isSubmitting}
                  fields={formFields} />
              </CardContent>
            )}
            <CardFooter>
              <Button asChild variant='link'>
                <Link to={forgotPasswordPage.actions.link}>
                  {forgotPasswordPage.actions.label}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  )
}
