// src/features/auth/pages/update-password.tsx
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AuthForm } from '@/features/auth/components/auth-form'
import { AUTH_CONTENT } from '@/features/auth/constants/auth-content'
import { useAuth } from '@/features/auth/contexts/auth.context'
import { useAuthSubmit } from '@/features/auth/hooks/use-auth-submit'
import { updatePasswordSchema, type UpdatePasswordInput } from '@/features/auth/schemas/auth.schema'
import { authService } from '@/features/auth/services/auth.service'

export const UpdatePasswordPage = () => {
  const { updatePasswordPage } = AUTH_CONTENT
  const { user } = useAuth()
  const { handleSubmit: authSubmit } = useAuthSubmit<UpdatePasswordInput>()

  const userIdentifier = user?.user_metadata?.display_name || user?.email?.split('@')[0] || ''

  const form = useForm<UpdatePasswordInput>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: { password: '', confirmPassword: '' }
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (data: UpdatePasswordInput) => {
    await authSubmit((vals) => authService.updatePassword(vals.password), data, '/login')
  }

  const formFields = [{
    name: 'password' as const,
    label: updatePasswordPage.fields.passwordLabel,
    placeholder: updatePasswordPage.fields.passwordPlaceholder,
    type: 'password',
    autoComplete: 'new-password',
  }, {
    name: 'confirmPassword' as const,
    label: updatePasswordPage.fields.confirmPasswordLabel,
    placeholder: updatePasswordPage.fields.confirmPasswordPlaceholder,
    type: 'password',
    autoComplete: 'new-password',
  }]

  return (
    <main className='flex min-h-svh flex-col'>
      <div className='flex flex-1 items-center justify-center py-12'>
        <div className='w-full max-w-md'>
          <Card className='bg-transparent border-none md:bg-card md:bg-linear-to-b from-secondary/50'>
            <CardHeader>
              <CardTitle>{`${updatePasswordPage.title} @${userIdentifier}`}</CardTitle>
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
              <Button asChild variant='link'>
                <Link to={updatePasswordPage.actions.link}>
                  {updatePasswordPage.actions.label}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  )
}
