import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AuthForm } from '@/features/auth/components/auth-form'
import { AUTH_COPY } from '@/features/auth/constants/auth-copy'
import { updatePasswordSchema, type UpdatePasswordInput } from '@/features/auth/schemas/auth.schema'
import { authService } from '@/features/auth/services/auth.service'
import { useToast } from '@/hooks/use-toast'

export const UpdatePasswordPage = () => {
  const { success, error } = useToast()
  const navigate = useNavigate()

  const { updatePasswordPage, messages } = AUTH_COPY

  const form = useForm<UpdatePasswordInput>({
    resolver: zodResolver(updatePasswordSchema),
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (data: UpdatePasswordInput) => {
    try {
      await authService.updatePassword(data.password)
      success(messages.success, { description: messages.passwordUpdateSuccess })
      navigate('/login')
    } catch (err) {
      error(messages.failed, { description: err instanceof Error ? err.message : messages.passwordUpdateError })
    }
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
    <div className='min-h-screen flex items-center justify-center'>
      <Card className='relative max-w-md w-full bg-linear-to-b from-muted/50 dark:from-transparent to-card overflow-hidden'>
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
            fields={formFields}
          />
        </CardContent>

        <CardFooter>
          <Link
            to={updatePasswordPage.signIn.link}
            className='text-sm text-primary hover:underline'>
            {updatePasswordPage.signIn.label}
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
