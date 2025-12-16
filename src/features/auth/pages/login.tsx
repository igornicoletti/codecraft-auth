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
import { loginSchema, type LoginInput } from '@/features/auth/schemas/auth.schema'
import { authService } from '@/features/auth/services/auth.service'
import { useToast } from '@/hooks/use-toast'

export const LoginPage = () => {
  const { success, error } = useToast()
  const navigate = useNavigate()

  const { loginPage, messages } = AUTH_COPY

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (data: LoginInput) => {
    try {
      await authService.signIn(data.email, data.password)
      navigate('/dashboard')
      success(messages.success, { description: messages.loginSuccess })
    } catch (err) {
      error(messages.failed, { description: err instanceof Error ? err.message : messages.loginError })
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
    <div className='min-h-screen flex items-center justify-center'>
      <Card className='relative max-w-md w-full bg-linear-to-b from-muted/50 dark:from-transparent to-card overflow-hidden'>
        <CardHeader>
          <CardTitle>{loginPage.title}</CardTitle>
          <CardDescription>{loginPage.description}</CardDescription>
        </CardHeader>

        <CardContent>
          <AuthForm
            form={form}
            onSubmit={onSubmit}
            submitText={loginPage.submitButton}
            isLoading={isSubmitting}
            fields={formFields} />
        </CardContent>

        <CardFooter>
          <Link
            to={loginPage.forgotPassword.link}
            className='text-sm text-primary hover:underline'>
            {loginPage.forgotPassword.question}
          </Link>

          <p className='text-sm text-center text-muted-foreground'>
            {loginPage.signUp.question}
            <Link
              to={loginPage.signUp.link}
              className='ml-1 text-primary hover:underline'>
              {loginPage.signUp.label}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
