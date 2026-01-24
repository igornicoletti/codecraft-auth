import { zodResolver } from '@hookform/resolvers/zod'
import type { EmailOtpType } from '@supabase/supabase-js'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useFormSubmit } from '@/hooks/use-form-submit'
import { AuthForm } from '@/modules/authentication/components/form/auth-form'
import { AUTH_CONTENT_MAP } from '@/modules/authentication/configs/auth-content-map'
import { verifyEmailSchema, type VerifyEmailSchema } from '@/modules/authentication/schemas/auth.schemas'
import { authService } from '@/modules/authentication/services/auth.service'
import { ROUTE_PATHS } from '@/routes/configs/route-paths'

interface VerifyPageState {
  email?: string
  type?: EmailOtpType
}

const AuthVerifyEmailPage = () => {
  const { submit, isPending } = useFormSubmit({ uniqueId: 'auth-verify-email' })
  const location = useLocation()
  const navigate = useNavigate()

  // Recupera estado da navegação anterior
  const state = location.state as VerifyPageState | null
  const email = state?.email
  const type = state?.type ?? 'signup'

  const content = AUTH_CONTENT_MAP.verifyEmail

  const form = useForm<VerifyEmailSchema>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: { token: '' },
  })

  useEffect(() => {
    if (!email) {
      navigate(ROUTE_PATHS.AUTH.SIGN_IN, { replace: true })
    }
  }, [email, navigate])

  const handleVerify = async (data: VerifyEmailSchema) => {
    if (!email) return

    await submit(() => authService.verifyOtp(email, data.token, type), {
      onSuccess: () => {
        if (type === 'recovery') {
          navigate(ROUTE_PATHS.AUTH.UPDATE_PASSWORD, { replace: true })
        } else {
          navigate(ROUTE_PATHS.APP.DASHBOARD, { replace: true })
        }
      }
    })
  }

  const handleResendCode = async () => {
    if (!email) return
    const resendType = type === 'recovery' ? 'recovery' : 'signup'

    await submit(() => authService.resendOtp(email, resendType), {
      successMessage: 'Se o e-mail existir, um novo código foi enviado.',
      skipRateLimit: false,
    })
  }

  if (!email) return null

  return (
    <>
      <AuthForm
        form={form}
        onSubmit={handleVerify}
        submitText={content.submit}
        isLoading={isPending}
        fields={[
          {
            name: 'token',
            label: content.fields.otpLabel,
            type: 'otp',
            autoComplete: 'one-time-code'
          },
        ]}
      />

      <div className='text-sm text-muted-foreground text-center'>
        <span>{content.resend.text}{' '}</span>
        <Button
          variant='link'
          className='p-0 h-auto'
          onClick={handleResendCode}
          disabled={isPending}>
          {content.resend.label}
        </Button>
      </div>
    </>
  )
}

export default AuthVerifyEmailPage
