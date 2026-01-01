import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { AuthForm, AuthSocialLogin } from '@/modules/authentication/components'
import { AUTH_CONTENT_MAP } from '@/modules/authentication/configs/auth-content-map'
import { useAuthSubmit } from '@/modules/authentication/hooks/use-auth-submit'
import { registerSchema, type RegisterInput } from '@/modules/authentication/schemas/authentication-schemas'
import { authenticationService } from '@/modules/authentication/services/authentication-service'
import { ROUTE_PATHS } from '@/routes/configs/route-paths'

const AuthSignUpPage = () => {
  const { handleSubmit, isPending } = useAuthSubmit<RegisterInput>()

  const { fields, separator, social, submit } = AUTH_CONTENT_MAP.signUp

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
  })

  const onSubmit = async (data: RegisterInput) => {
    await handleSubmit(
      (vals) => authenticationService.signUp(vals.email, vals.password),
      data,
      ROUTE_PATHS.AUTH.SIGN_IN
    )
  }

  const handleGoogleLogin = async () => {
    try {
      await authenticationService.signInWithGoogle()
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
      <AuthSocialLogin
        text={social}
        separatorText={separator}
        isPending={isPending}
        onGoogleClick={handleGoogleLogin}
      />

      <AuthForm
        form={form}
        onSubmit={onSubmit}
        submitText={submit}
        isLoading={isPending}
        fields={formFields}
      />
    </>
  )
}

export default AuthSignUpPage
