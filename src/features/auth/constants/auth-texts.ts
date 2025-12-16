export const AUTH_TEXTS = {
  login: {
    title: "Sign in to your account",
    subtitle: "Or",
    subtitleLink: "create a new account",
    submit: "Sign in",
    submitting: "Signing in...",
    emailLabel: "Email address",
    emailPlaceholder: "name@example.com",
    passwordLabel: "Password",
    passwordPlaceholder: "••••••••",
    forgotPasswordLink: "Forgot your password?",
  },
  register: {
    title: "Create your account",
    subtitle: "Or",
    subtitleLink: "sign in to your account",
    submit: "Create account",
    submitting: "Creating account...",
    emailLabel: "Email address",
    emailPlaceholder: "name@example.com",
    passwordLabel: "Password",
    passwordPlaceholder: "••••••••",
    confirmPasswordLabel: "Confirm password",
    confirmPasswordPlaceholder: "••••••••",
    successTitle: "Check your email",
    successMessage:
      "We've sent you a confirmation link. Please check your email to verify your account.",
  },
  forgotPassword: {
    title: "Reset your password",
    description:
      "Enter your email address and we'll send you a link to reset your password.",
    submit: "Send reset link",
    submitting: "Sending...",
    emailLabel: "Email address",
    emailPlaceholder: "name@example.com",
    backToLogin: "Back to sign in",
    successTitle: "Check your email",
    successMessage:
      "We've sent you a password reset link. Please check your email.",
  },
} as const;
