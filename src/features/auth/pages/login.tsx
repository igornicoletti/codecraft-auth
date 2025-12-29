// src/features/auth/pages/login.tsx
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { AuthForm } from '@/features/auth/components/auth-form'
import { AuthSocial } from '@/features/auth/components/auth-social'
import { AUTH_CONTENT } from '@/features/auth/constants/auth-content'
import { useAuthSubmit } from '@/features/auth/hooks/use-auth-submit'
import { loginSchema, type LoginInput } from '@/features/auth/schemas/auth.schema'
import { authService } from '@/features/auth/services/auth.service'

export const LoginPage = () => {
  const { handleSubmit, isPending } = useAuthSubmit<LoginInput>()
  const { fields, forgot, separator, social, submit } = AUTH_CONTENT.login

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (data: LoginInput) => {
    await handleSubmit((vals) =>
      authService.signIn(vals.email, vals.password), data, '/dashboard'
    )
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
      label: fields.emailLabel,
      placeholder: fields.emailPlaceholder,
      type: 'email',
      autoComplete: 'username',
    },
    {
      name: 'password' as const,
      label: fields.passwordLabel,
      placeholder: fields.passwordPlaceholder,
      type: 'password',
      autoComplete: 'current-password',
    },
  ]

  return (
    <>
      <AuthSocial
        text={social}
        separatorText={separator}
        isPending={isPending}
        onGoogleClick={handleGoogleLogin} />

      <AuthForm
        form={form}
        onSubmit={onSubmit}
        submitText={submit}
        isLoading={isPending}
        fields={formFields} />

      <Button asChild variant='link'>
        <Link to={forgot.link}>{forgot.question}</Link>
      </Button>
    </>
  )
}
