// src/features/auth/pages/register.tsx
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { AuthForm } from '@/features/auth/components/auth-form'
import { AuthSocial } from '@/features/auth/components/auth-social'
import { AUTH_CONTENT } from '@/features/auth/constants/auth-content'
import { useAuthSubmit } from '@/features/auth/hooks/use-auth-submit'
import { registerSchema, type RegisterInput } from '@/features/auth/schemas/auth.schema'
import { authService } from '@/features/auth/services/auth.service'

export const RegisterPage = () => {
  const { handleSubmit, isPending } = useAuthSubmit<RegisterInput>()
  const { fields, separator, social, submit } = AUTH_CONTENT.register

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
  })

  const onSubmit = async (data: RegisterInput) => {
    await handleSubmit((vals) =>
      authService.signUp(vals.email, vals.password), data, '/login'
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
      autoComplete: 'new-password',
    },
    {
      name: 'confirmPassword' as const,
      label: fields.confirmPasswordLabel,
      placeholder: fields.confirmPasswordPlaceholder,
      type: 'password',
      autoComplete: 'new-password',
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
    </>
  )
}
