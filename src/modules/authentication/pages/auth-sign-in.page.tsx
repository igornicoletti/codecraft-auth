import { zodResolver } from '@hookform/resolvers/zod'
import type { Session } from '@supabase/supabase-js'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { AuthForm, AuthSocialLogin } from '@/modules/authentication/components'
import { AUTH_CONTENT_MAP } from '@/modules/authentication/configs/auth-content-map'
import { useAuthSubmit } from '@/modules/authentication/hooks/use-auth-submit'
import { signInSchema, type SignInSchema } from '@/modules/authentication/schemas/auth.schemas'
import { authService } from '@/modules/authentication/services/auth.service'
import { ROUTE_PATHS } from '@/routes/configs/route-paths'

const AuthSignInPage = () => {
  const { handleSubmit, isPending } = useAuthSubmit<SignInSchema, Session>()
  const { handleSubmit: handleGoogleSubmit, isPending: isGooglePending } = useAuthSubmit()

  const { fields, forgot, separator, social, submit } = AUTH_CONTENT_MAP.signIn

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  })

  const handleSignIn = async (data: SignInSchema) => {
    await handleSubmit((formData) => authService.signIn(formData.email, formData.password), data, ROUTE_PATHS.APP.DASHBOARD)
  }

  const handleSignInWithGoogle = async () => {
    await handleGoogleSubmit(() => authService.signInWithGoogle(), undefined)
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
        isPending={isGooglePending}
        onGoogleClick={handleSignInWithGoogle} />
      <AuthForm
        form={form}
        onSubmit={handleSignIn}
        submitText={submit}
        isLoading={isPending}
        fields={formFields} />
      <Button asChild variant='link'>
        <Link to={forgot.link}>{forgot.question}</Link>
      </Button>
    </>
  )
}

export default AuthSignInPage
