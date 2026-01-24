import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useFormSubmit } from '@/hooks/use-form-submit'
import { AuthSocialLogin } from '@/modules/authentication/components/auth-social-login'
import { AuthForm } from '@/modules/authentication/components/form/auth-form'
import { AUTH_CONTENT_MAP } from '@/modules/authentication/configs/auth-content-map'
import { signUpSchema, type SignUpSchema } from '@/modules/authentication/schemas/auth.schemas'
import { authService } from '@/modules/authentication/services/auth.service'
import { ROUTE_PATHS } from '@/routes/configs/route-paths'

const AuthSignUpPage = () => {
  const { submit, isPending } = useFormSubmit({ uniqueId: 'auth-sign-up' })
  const navigate = useNavigate()
  const content = AUTH_CONTENT_MAP.signUp

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
  })

  const handleSignUp = async (data: SignUpSchema) => {
    await submit(() => authService.signUp(data.email, data.password), {
      onSuccess: () => {
        navigate(ROUTE_PATHS.AUTH.VERIFY_EMAIL, {
          state: { email: data.email, type: 'signup' }
        })
      },
      onError: () => {
        form.resetField('password')
        form.resetField('confirmPassword')
      }
    })
  }

  const handleGoogleSignUp = async () => {
    await submit(() => authService.signInWithGoogle(ROUTE_PATHS.APP.DASHBOARD), {
      skipRateLimit: true
    })
  }

  return (
    <>
      <AuthSocialLogin
        text={content.social}
        separator={content.separator}
        isPending={isPending}
        onGoogleClick={handleGoogleSignUp}
      />

      <AuthForm
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
        ]}
      />
    </>
  )
}

export default AuthSignUpPage
