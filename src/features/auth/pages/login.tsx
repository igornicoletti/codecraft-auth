import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AuthForm } from "@/features/auth/components/AuthForm"
import { AUTH_TEXTS } from "@/features/auth/constants/auth-texts"
import { loginSchema, type LoginInput } from "../schemas/auth.schema"
import { authService } from "../services/auth.service"

export function LoginPage() {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (data: LoginInput) => {
    try {
      setError(null)
      await authService.signIn(data.email, data.password)
      navigate("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign in")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            {AUTH_TEXTS.login.title}
          </CardTitle>
          <p className="text-center text-sm text-muted-foreground">
            {AUTH_TEXTS.login.subtitle}{" "}
            <Link to="/register" className="font-medium hover:underline">
              {AUTH_TEXTS.login.subtitleLink}
            </Link>
          </p>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <AuthForm
            form={form}
            onSubmit={onSubmit}
            submitText={AUTH_TEXTS.login.submit}
            isLoading={isSubmitting}
            fields={[
              {
                name: "email",
                label: AUTH_TEXTS.login.emailLabel,
                placeholder: AUTH_TEXTS.login.emailPlaceholder,
                type: "email",
                autoComplete: "username",
              },
              {
                name: "password",
                label: AUTH_TEXTS.login.passwordLabel,
                placeholder: AUTH_TEXTS.login.passwordPlaceholder,
                type: "password",
                autoComplete: "current-password",
              },
            ]}
          />

          <div className="mt-4 text-center">
            <Link
              to="/forgot-password"
              className="text-sm font-medium hover:underline"
            >
              {AUTH_TEXTS.login.forgotPasswordLink}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
