import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { AuthForm, AuthSocialLogin } from '@/modules/authentication/components'
import { AUTH_CONTENT_MAP } from '@/modules/authentication/configs/auth-content-map'
import { useAuthSubmit } from '@/modules/authentication/hooks/use-auth-submit'
import { loginSchema, type LoginInput } from '@/modules/authentication/schemas/authentication-schemas'
import { authenticationService } from '@/modules/authentication/services/authentication-service'
import { ROUTE_PATHS } from '@/routes/configs/route-paths'

const AuthSignInPage = () => {
  const { handleSubmit, isPending } = useAuthSubmit<LoginInput>()

  const { fields, forgot, separator, social, submit } = AUTH_CONTENT_MAP.signIn

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (data: LoginInput) => {
    await handleSubmit(
      (vals) => authenticationService.signIn(vals.email, vals.password),
      data,
      ROUTE_PATHS.APP.DASHBOARD
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
      autoComplete: 'current-password',
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

      <Button asChild variant="link">
        <Link to={forgot.link}>{forgot.question}</Link>
      </Button>
    </>
  )
}

export default AuthSignInPage
