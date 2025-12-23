export const AUTH_CONTENT = {
  loginPage: {
    title: 'Sign in to your account',
    description: 'Welcome back. Please sign in to continue.',
    fields: {
      emailLabel: 'Email',
      emailPlaceholder: 'name@example.com',
      passwordLabel: 'Password',
      passwordPlaceholder: '••••••••',
    },
    submitButton: 'Sign in',
    forgotPassword: {
      question: 'Forgot your password?',
      link: '/forgot-password',
    },
    signUp: {
      question: 'Don’t have an account?',
      label: 'Sign up',
      link: '/register',
    },
  },
  registerPage: {
    title: 'Create your free account',
    description: 'Welcome. Please fill in your details to get started.',
    fields: {
      emailLabel: 'Email',
      emailPlaceholder: 'name@example.com',
      passwordLabel: 'Password',
      passwordPlaceholder: '••••••••',
      confirmPasswordLabel: 'Confirm password',
      confirmPasswordPlaceholder: '••••••••',
    },
    submitButton: 'Create account',
    signIn: {
      question: 'Already have an account?',
      label: 'Sign in',
      link: '/login',
    },
  },
  forgotPasswordPage: {
    title: 'Recover password',
    description: 'Enter your email to receive a password reset link.',
    fields: {
      emailLabel: 'Email',
      emailPlaceholder: 'name@example.com',
    },
    submitButton: 'Send reset link',
    signIn: {
      question: 'Remember your password?',
      label: 'Back to sign in',
      link: '/login',
    },
  },
  updatePasswordPage: {
    title: 'Set new password',
    description: 'Choose a new password to access your account.',
    fields: {
      passwordLabel: 'New password',
      passwordPlaceholder: '••••••••',
      confirmPasswordLabel: 'Confirm new password',
      confirmPasswordPlaceholder: '••••••••',
    },
    submitButton: 'Update password',
    signIn: {
      label: 'Back to sign in',
      link: '/login',
    },
  },
} as const
