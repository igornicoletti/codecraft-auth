export const AUTH_CONTENT_MAP = {
  signIn: {
    title: ' Faça login no CodeCraft Auth',
    description: 'Envie mais rápido e concentre-se no crescimento',
    social: 'Faça login com o Google',
    separator: 'ou',
    fields: {
      emailLabel: 'E-mail',
      emailPlaceholder: 'seu@email.com',
      passwordLabel: 'Senha',
      passwordPlaceholder: '••••••••',
    },
    submit: 'Faça login no CodeCraft Auth',
    forgot: {
      question: 'Esqueceu sua senha?',
      link: '/forgot-password',
    },
    actions: {
      question: 'Novo em nossa plataforma?',
      label: 'Inscreva-se',
      link: '/sign-up',
    },
  },
  signUp: {
    title: 'Inscreva-se no CodeCraft Auth',
    description: 'Explore os principais recursos da nossa plataforma.',
    social: 'Inscreva-se com o Google',
    separator: 'ou',
    fields: {
      emailLabel: 'E-mail',
      emailPlaceholder: 'seu@email.com',
      passwordLabel: 'Senha',
      passwordPlaceholder: '••••••••',
      confirmPasswordLabel: 'Confirmar senha',
      confirmPasswordPlaceholder: '••••••••',
    },
    submit: 'Inscreva-se no CodeCraft Auth',
    actions: {
      question: 'Já tem uma conta?',
      label: 'Faça login',
      link: '/sign-in',
    },
  },
  forgotPassword: {
    title: 'Esqueceu sua senha?',
    description: 'Sem problemas! Insira seu e-mail abaixo e enviaremos um link para redefinir sua senha.',
    message: 'Se o e-mail existir em nosso sistema, você receberá um link de redefinição de senha em breve. Verifique sua caixa de entrada.',
    fields: {
      emailLabel: 'E-mail',
      emailPlaceholder: 'seu@email.com',
    },
    submit: 'Enviar link de redefinição',
    actions: {
      question: '',
      label: 'Voltar para login',
      link: '/sign-in',
    },
  },
  updatePassword: {
    title: 'Redefinir senha para,',
    description: 'Escolha uma nova senha para sua conta com no mínimo 8 caracteres, incluindo letras e números.',
    fields: {
      passwordLabel: 'Nova senha',
      passwordPlaceholder: '••••••••',
      confirmPasswordLabel: 'Confirmar nova senha',
      confirmPasswordPlaceholder: '••••••••',
    },
    submit: 'Atualizar senha',
    actions: {
      question: '',
      label: 'Voltar para login',
      link: '/sign-in',
    },
  },
} as const
