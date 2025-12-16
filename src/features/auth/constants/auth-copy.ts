export const AUTH_COPY = {
  loginPage: {
    title: "Sign in to your account",
    description: 'Welcome back. Please sign in to continue.',
    fields: {
      emailLabel: "Email address",
      emailPlaceholder: "name@example.com",
      passwordLabel: "Password",
      passwordPlaceholder: "••••••••",
    },
    submitButton: "Sign In",
    forgotPassword: {
      question: "Forgot your password?",
      link: "/forgot-password",
    },
    signUp: {
      question: "Don’t have an account?",
      label: "Sign Up",
      link: "/register",
    },
  },
  registerPage: {
    title: "Create an account",
    description: "Enter your details below to create your account.",
    fields: {
      emailLabel: "Email address",
      emailPlaceholder: "name@example.com",
      passwordLabel: "Password",
      passwordPlaceholder: "••••••••",
      confirmPasswordLabel: "Confirm Password",
      confirmPasswordPlaceholder: "••••••••",
    },
    submitButton: "Register",
    signIn: {
      question: "Already have an account?",
      label: "Sign In",
      link: "/login",
    },
  },
  forgotPasswordPage: {
    title: "Forgot Password",
    description: "Enter your email address and we'll send you a link to reset your password.",
    fields: {
      emailLabel: "Email address",
      emailPlaceholder: "name@example.com",
    },
    submitButton: "Send Reset Link",
    signIn: {
      label: "Back to Sign In",
      link: "/login",
    },
  },
  updatePasswordPage: {
    title: "Update Password",
    description: "Enter your new secure password to finalize the reset process.",
    fields: {
      passwordLabel: "New Password",
      passwordPlaceholder: "••••••••",
      confirmPasswordLabel: "Confirm New Password",
      confirmPasswordPlaceholder: "••••••••",
    },
    submitButton: "Update Password",
    signIn: {
      label: "Go back to Sign In",
      link: "/login",
    },
  },
  messages: {
    success: 'Success!',
    failed: 'Whoops!',
    loginSuccess: 'You are successfully signed in.',
    loginError: 'Failed to sign in.',
    registerSuccess: 'Account created successfully! Check your email for confirmation.',
    registerError: 'Failed to create account.',
    resetLinkSent: 'Password reset link sent to your email.',
    resetLinkError: 'Failed to send reset link.',
    passwordUpdateSuccess: 'Password successfully updated. Please sign in.',
    passwordUpdateError: 'Failed to update password.',
  }
}
