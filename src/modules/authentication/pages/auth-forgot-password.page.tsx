import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useOutletContext } from 'react-router-dom'

import { AuthForm } from '@/modules/authentication/components'
import { AUTH_CONTENT_MAP } from '@/modules/authentication/configs/auth-content-map'
import { useAuthSubmit } from '@/modules/authentication/hooks/use-auth-submit'
import type { AuthLayoutContext } from '@/modules/authentication/layouts/auth.layout'
import { forgotPasswordSchema, type ForgotPasswordSchema } from '@/modules/authentication/schemas/auth.schemas'
import { authService } from '@/modules/authentication/services/auth.service'

const AuthForgotPasswordPage = () => {
  const { handleSubmit, isPending } = useAuthSubmit<ForgotPasswordSchema>()
  const { setDescription, setTitle } = useOutletContext<AuthLayoutContext>()
  const [emailSent, setEmailSent] = useState(false)

  const { customDescription, customTitle, fields, submit } = AUTH_CONTENT_MAP.forgotPassword

  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

  const handleForgotPassword = async (data: ForgotPasswordSchema) => {
    const result = await handleSubmit((formData) => authService.sendPasswordReset(formData.email), data) as { error?: unknown } | undefined

    if (!result?.error) {
      setEmailSent(true)
      setTitle(customTitle)
      setDescription(customDescription)
    }
  }

  useEffect(() => {
    return () => {
      setTitle(null)
      setDescription(null)
    }
  }, [setTitle, setDescription])

  const formFields = [
    {
      name: 'email' as const,
      label: fields.emailLabel,
      placeholder: fields.emailPlaceholder,
      type: 'email',
      autoComplete: 'email',
    },
  ]

  if (emailSent) return null

  return (
    <AuthForm
      form={form}
      onSubmit={handleForgotPassword}
      fields={formFields}
      submitText={submit}
      isLoading={isPending} />
  )
}

export default AuthForgotPasswordPage
