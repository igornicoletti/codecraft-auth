import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthForm } from "@/features/auth/components/AuthForm";
import { AUTH_TEXTS } from "@/features/auth/constants/auth-texts";
import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from "../schemas/auth.schema";
import { authService } from "../services/auth.service";

export function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: ForgotPasswordInput) => {
    try {
      setError(null);
      await authService.resetPassword(data.email);
      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to send reset email"
      );
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              {AUTH_TEXTS.forgotPassword.successTitle}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              {AUTH_TEXTS.forgotPassword.successMessage}
            </p>
            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="text-sm font-medium hover:underline"
              >
                {AUTH_TEXTS.forgotPassword.backToLogin}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            {AUTH_TEXTS.forgotPassword.title}
          </CardTitle>
          <CardDescription className="text-center">
            {AUTH_TEXTS.forgotPassword.description}
          </CardDescription>
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
            submitText={AUTH_TEXTS.forgotPassword.submit}
            isLoading={isSubmitting}
            fields={[
              {
                name: "email",
                label: AUTH_TEXTS.forgotPassword.emailLabel,
                placeholder: AUTH_TEXTS.forgotPassword.emailPlaceholder,
                type: "email",
                autoComplete: "username",
              },
            ]}
          />

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm font-medium hover:underline"
            >
              {AUTH_TEXTS.forgotPassword.backToLogin}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
