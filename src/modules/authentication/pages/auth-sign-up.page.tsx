import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { GenericForm } from '@/components/common/form/form'
import { useFormSubmit } from '@/hooks/use-form-submit'
import { AuthSocialLogin } from '@/modules/authentication/components/auth-social-login'
import { AUTH_CONTENT_MAP } from '@/modules/authentication/configs/auth-content-map'
import { signUpSchema, type SignUpSchema } from '@/modules/authentication/schemas/auth.schemas'
import { authService } from '@/modules/authentication/services/auth.service'
import { ROUTE_PATHS } from '@/routes/configs/route-paths'

const AuthSignUpPage = () => {
  const content = AUTH_CONTENT_MAP.signUp

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const { submit, isPending } = useFormSubmit()

  async function handleSignUp(data: SignUpSchema) {
    await submit(() => authService.signUp(data.email, data.password).then((res) => {
      if (!res.success) { throw res.error }
    }))
  }

  async function handleGoogleSignUp() {
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
        onGoogleClick={handleGoogleSignUp} />

      <GenericForm
        form={form}
        onSubmit={handleSignUp}
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
            autoComplete: 'new-password',
          },
          {
            name: 'confirmPassword',
            label: content.fields.confirmPasswordLabel,
            placeholder: content.fields.confirmPasswordPlaceholder,
            type: 'password',
            autoComplete: 'new-password',
          },
        ]} />
    </>
  )
}

export default AuthSignUpPage
