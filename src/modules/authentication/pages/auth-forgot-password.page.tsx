import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useOutletContext } from 'react-router-dom'

import { AuthForm } from '@/modules/authentication/components'
import { AUTH_CONTENT_MAP } from '@/modules/authentication/configs/auth-content-map'
import { useAuthSubmit } from '@/modules/authentication/hooks/use-auth-submit'
import type { AuthLayoutContext } from '@/modules/authentication/layouts/authentication-layout'
import { forgotPasswordSchema, type ForgotPasswordInput } from '@/modules/authentication/schemas/authentication-schemas'
import { authenticationService } from '@/modules/authentication/services/authentication-service'

const AuthForgotPasswordPage = () => {
  const { handleSubmit, isPending } = useAuthSubmit<ForgotPasswordInput>()
  const { setDescription } = useOutletContext<AuthLayoutContext>()

  const [isEmailSent, setIsEmailSent] = useState(false)

  const { fields, submit, message } = AUTH_CONTENT_MAP.forgotPassword

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

  const onSubmit = async (data: ForgotPasswordInput) => {
    await handleSubmit(async (vals) => {
      await authenticationService.sendPasswordReset(vals.email)
      setIsEmailSent(true)
      setDescription(message)
    }, data)
  }

  const formFields = [
    {
      name: 'email' as const,
      label: fields.emailLabel,
      placeholder: fields.emailPlaceholder,
      type: 'email',
      autoComplete: 'email',
    },
  ]

  if (isEmailSent) return null

  return (
    <AuthForm
      form={form}
      onSubmit={onSubmit}
      fields={formFields}
      submitText={submit}
      isLoading={isPending}
    />
  )
}

export default AuthForgotPasswordPage
