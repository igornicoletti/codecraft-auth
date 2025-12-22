import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AuthForm } from '@/features/auth/components/auth-form'
import { AUTH_CONTENT } from '@/features/auth/constants/auth-content'
import { useAuthSubmit } from '@/features/auth/hooks/use-auth-submit'
import { updatePasswordSchema, type UpdatePasswordInput } from '@/features/auth/schemas/auth.schema'
import { authService } from '@/services/auth.service'

export const UpdatePasswordPage = () => {
  const { updatePasswordPage } = AUTH_CONTENT
  const { handleSubmit: authSubmit } = useAuthSubmit<UpdatePasswordInput>()

  const form = useForm<UpdatePasswordInput>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (data: UpdatePasswordInput) => {
    await authSubmit((vals) => authService.updatePassword(vals.password), data, 'updatePassword', '/login')
  }

  const formFields = [
    {
      name: 'password' as const,
      label: updatePasswordPage.fields.passwordLabel,
      placeholder: updatePasswordPage.fields.passwordPlaceholder,
      type: 'password',
      autoComplete: 'new-password',
    },
    {
      name: 'confirmPassword' as const,
      label: updatePasswordPage.fields.confirmPasswordLabel,
      placeholder: updatePasswordPage.fields.confirmPasswordPlaceholder,
      type: 'password',
      autoComplete: 'new-password',
    },
  ]

  return (
    <main className='flex min-h-svh w-full items-center justify-center p-4'>
      <div className='w-full max-w-md flex flex-col gap-4 md:gap-6'>
        <Card className='w-full bg-linear-to-t from-muted/50 to-card'>
          <CardHeader>
            <CardTitle>{updatePasswordPage.title}</CardTitle>
            <CardDescription>{updatePasswordPage.description}</CardDescription>
          </CardHeader>

          <CardContent>
            <AuthForm
              form={form}
              onSubmit={onSubmit}
              submitText={updatePasswordPage.submitButton}
              isLoading={isSubmitting}
              fields={formFields} />
          </CardContent>

          <CardFooter>
            <Button asChild size='sm' variant='link'>
              <Link to={updatePasswordPage.signIn.link}>
                {updatePasswordPage.signIn.label}
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
