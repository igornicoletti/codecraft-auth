import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'

import { GenericForm } from '@/components/common/form/form'
import { Button } from '@/components/ui/button'
import { useFormSubmit } from '@/hooks/use-form-submit'
import { AUTH_CONTENT_MAP } from '@/modules/authentication/configs/auth-content-map'
import { verifyEmailSchema, type VerifyEmailSchema } from '@/modules/authentication/schemas/auth.schemas'
import { authService } from '@/modules/authentication/services/auth.service'
import { ROUTE_PATHS } from '@/routes/configs/route-paths'

const AuthVerifyEmailPage = () => {
  const { submit, isPending } = useFormSubmit()
  const location = useLocation()
  const navigate = useNavigate()

  const email = location.state?.email as string
  const content = AUTH_CONTENT_MAP.verifyEmail

  const form = useForm<VerifyEmailSchema>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      token: '',
    },
  })

  useEffect(() => {
    if (!email) {
      navigate(ROUTE_PATHS.AUTH.SIGN_IN, { replace: true })
    }
  }, [email, navigate])

  const handleVerify = async (data: VerifyEmailSchema) => {
    if (!email) return

    await submit(() => authService.verifyOtp(email, data.token, 'signup'), {
      redirectTo: ROUTE_PATHS.APP.DASHBOARD,
    })
  }

  const handleResendCode = async () => {
    if (!email) return

    await submit(() => authService.resendOtp(email, 'signup'), {
      successMessage: 'Novo código enviado para seu e-mail.',
      skipRateLimit: false,
    })
  }

  return (
    <>
      <GenericForm
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

      <Button
        variant='link'
        onClick={handleResendCode}
        disabled={isPending}>
        Não recebeu o código? Reenviar
      </Button>
    </>
  )
}

export default AuthVerifyEmailPage
