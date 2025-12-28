// src/features/auth/constants/auth-content.ts
export const AUTH_CONTENT = {
  login: {
    title: 'Faça login no CodeCraft',
    description: 'Aumente sua produtividade e concentre-se no crescimento.',
    social: 'Continue com o Google',
    separator: 'ou',
    fields: {
      emailLabel: 'E-mail',
      emailPlaceholder: 'seu@email.com',
      passwordLabel: 'Senha',
      passwordPlaceholder: '••••••••••',
    },
    submit: 'Entrar',
    forgot: {
      question: 'Esqueceu a senha?',
      link: '/forgot-password',
    },
    actions: {
      question: 'Novo no CodeCraft?',
      label: 'Criar conta',
      link: '/register',
    },
  },
  register: {
    title: 'Crie sua conta gratuita',
    description: 'Explore os principais recursos do CodeCraft.',
    social: 'Continue com o Google',
    separator: 'ou',
    fields: {
      emailLabel: 'E-mail',
      emailPlaceholder: 'seu@email.com',
      passwordLabel: 'Senha',
      passwordPlaceholder: '••••••••••',
      confirmPasswordLabel: 'Confirmar senha',
      confirmPasswordPlaceholder: '••••••••••',
    },
    submit: 'Criar conta',
    actions: {
      question: 'Já tem uma conta?',
      label: 'Entrar',
      link: '/login',
    },
  },
  forgotPassword: {
    title: 'Redefina sua senha',
    description: 'Digite o endereço de e-mail verificado da sua conta de usuário e lhe enviaremos um link para redefinição de senha.',
    message: 'Verifique seu e-mail em busca de um link para redefinir sua senha. Se não aparecer dentro de alguns minutos, verifique sua pasta de spam.',
    fields: {
      emailLabel: 'E-mail',
      emailPlaceholder: 'seu@email.com',
    },
    submit: 'Enviar e-mail de redefinição de senha',
    actions: {
      question: '',
      label: 'Voltar para login',
      link: '/login',
    },
  },
  updatePassword: {
    title: 'Alterar senha para',
    description: 'Certifique-se de que é pelo menos 8 caracteres incluindo um número e uma letra minúscula.',
    fields: {
      passwordLabel: 'Nova',
      passwordPlaceholder: '••••••••••',
      confirmPasswordLabel: 'Confirmar senha',
      confirmPasswordPlaceholder: '••••••••••',
    },
    submit: 'Atualizar senha',
    actions: {
      question: '',
      label: 'Voltar para login',
      link: '/login',
    },
  },
} as const
