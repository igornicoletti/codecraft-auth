// src/features/auth/pages/tsx
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { AuthForm } from '@/features/auth/components/auth-form'
import { AUTH_CONTENT } from '@/features/auth/constants/auth-content'
import { useAuthSubmit } from '@/features/auth/hooks/use-auth-submit'
import { loginSchema, type LoginInput } from '@/features/auth/schemas/auth.schema'
import { authService } from '@/features/auth/services/auth.service'

export const LoginPage = () => {
  const { handleSubmit, isPending } = useAuthSubmit<LoginInput>()

  const { fields, forgotPassword, separator, social, submitButton } = AUTH_CONTENT.login

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  })

  const onSubmit = async (data: LoginInput) => {
    await handleSubmit((vals) =>
      authService.signIn(vals.email, vals.password),
      data,
      '/dashboard'
    )
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
    label: fields.emailLabel,
    placeholder: fields.emailPlaceholder,
    type: 'email',
    autoComplete: 'username',
  }, {
    name: 'password' as const,
    label: fields.passwordLabel,
    placeholder: fields.passwordPlaceholder,
    type: 'password',
    autoComplete: 'current-password',
  }]

  return (
    <>
      <Button
        variant='secondary'
        className='w-full'
        onClick={handleGoogleLogin}
        disabled={isPending}>
        {social}
      </Button>
      <div className='flex items-center justify-center gap-2 overflow-hidden'>
        <Separator className='shrink' />
        <span className='text-sm text-muted-foreground min-w-fit'>{separator}</span>
        <Separator className='shrink' />
      </div>
      <AuthForm
        form={form}
        onSubmit={onSubmit}
        submitText={submitButton}
        isLoading={isPending}
        fields={formFields} />
      <Button asChild variant='link' className='w-full'>
        <Link to={forgotPassword.link}>
          {forgotPassword.question}
        </Link>
      </Button>
    </>
  )
}
