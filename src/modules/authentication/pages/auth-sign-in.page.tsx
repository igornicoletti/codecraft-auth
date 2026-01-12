import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { GenericForm } from '@/components/common/form/form'
import { Button } from '@/components/ui/button'
import { useFormSubmit } from '@/hooks/use-form-submit'
import { AuthSocialLogin } from '@/modules/authentication/components/auth-social-login'
import { AUTH_CONTENT_MAP } from '@/modules/authentication/configs/auth-content-map'
import { signInSchema, type SignInSchema } from '@/modules/authentication/schemas/auth.schemas'
import { authService } from '@/modules/authentication/services/auth.service'
import { ROUTE_PATHS } from '@/routes/configs/route-paths'

const AuthSignInPage = () => {
  const navigate = useNavigate()
  const content = AUTH_CONTENT_MAP.signIn

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { submit, isPending } = useFormSubmit({
    onSuccess: () => navigate(ROUTE_PATHS.APP.DASHBOARD)
  })

  async function handleSignIn(data: SignInSchema) {
    await submit(() => authService.signIn(data.email, data.password).then((res) => {
      if (!res.success) { throw res.error }
    }))
  }

  async function handleGoogleSignIn() {
    await submit(() => authService.signInWithGoogle(ROUTE_PATHS.APP.DASHBOARD).then((res) => {
      if (!res.success) { throw res.error }
    }))
  }

  return (
    <>
      <AuthSocialLogin
        text={content.social}
        separatorText={content.separator}
        isPending={isPending}
        onGoogleClick={handleGoogleSignIn} />

      <GenericForm
        form={form}
        onSubmit={handleSignIn}
        submitText={content.submit}
        isLoading={isPending}
        fields={[
          {
            name: 'email',
            label: content.fields.emailLabel,
            placeholder: content.fields.emailPlaceholder,
            type: 'email',
            autoComplete: 'email',
          },
          {
            name: 'password',
            label: content.fields.passwordLabel,
            placeholder: content.fields.passwordPlaceholder,
            type: 'password',
            autoComplete: 'current-password',
          },
        ]} />

      <Button asChild variant="link">
        <Link to={content.forgot.link}>
          {content.forgot.question}
        </Link>
      </Button>
    </>
  )
}

export default AuthSignInPage
