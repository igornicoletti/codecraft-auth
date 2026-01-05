import { zodResolver } from '@hookform/resolvers/zod'
import type { User } from '@supabase/supabase-js'
import { useForm } from 'react-hook-form'

import { AuthForm, AuthSocialLogin } from '@/modules/authentication/components'
import { AUTH_CONTENT_MAP } from '@/modules/authentication/configs/auth-content-map'
import { useAuthSubmit } from '@/modules/authentication/hooks/use-auth-submit'
import { signUpSchema, type SignUpSchema } from '@/modules/authentication/schemas/auth.schemas'
import { authService } from '@/modules/authentication/services/auth.service'
import { ROUTE_PATHS } from '@/routes/configs/route-paths'

const AuthSignUpPage = () => {
  const { handleSubmit, isPending } = useAuthSubmit<SignUpSchema, User>()
  const { handleSubmit: handleGoogleSubmit, isPending: isGooglePending } = useAuthSubmit()

  const { fields, separator, social, submit } = AUTH_CONTENT_MAP.signUp

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
  })

  const handleSignUp = async (data: SignUpSchema) => {
    await handleSubmit((formData) => authService.signUp(formData.email, formData.password), data, ROUTE_PATHS.AUTH.VERIFY_EMAIL)
  }

  const handleSignUpWithGoogle = async () => {
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
        isPending={isGooglePending}
        onGoogleClick={handleSignUpWithGoogle} />
      <AuthForm
        form={form}
        onSubmit={handleSignUp}
        submitText={submit}
        isLoading={isPending}
        fields={formFields} />
    </>
  )
}

export default AuthSignUpPage
