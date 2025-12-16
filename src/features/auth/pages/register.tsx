import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthForm } from "@/features/auth/components/AuthForm";
import { AUTH_TEXTS } from "@/features/auth/constants/auth-texts";
import { registerSchema, type RegisterInput } from "../schemas/auth.schema";
import { authService } from "../services/auth.service";

export function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: RegisterInput) => {
    try {
      setError(null);
      await authService.signUp(data.email, data.password);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign up");
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              {AUTH_TEXTS.register.successTitle}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              {AUTH_TEXTS.register.successMessage}
            </p>
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
            {AUTH_TEXTS.register.title}
          </CardTitle>
          <p className="text-center text-sm text-muted-foreground">
            {AUTH_TEXTS.register.subtitle}{" "}
            <Link to="/login" className="font-medium hover:underline">
              {AUTH_TEXTS.register.subtitleLink}
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
            submitText={AUTH_TEXTS.register.submit}
            isLoading={isSubmitting}
            fields={[
              {
                name: "email",
                label: AUTH_TEXTS.register.emailLabel,
                placeholder: AUTH_TEXTS.register.emailPlaceholder,
                type: "email",
                autoComplete: "username",
              },
              {
                name: "password",
                label: AUTH_TEXTS.register.passwordLabel,
                placeholder: AUTH_TEXTS.register.passwordPlaceholder,
                type: "password",
                autoComplete: "new-password",
              },
              {
                name: "confirmPassword",
                label: AUTH_TEXTS.register.confirmPasswordLabel,
                placeholder: AUTH_TEXTS.register.confirmPasswordPlaceholder,
                type: "password",
                autoComplete: "new-password",
              },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
}
