export const AUTH_CONTENT_MAP = {
  signIn: {
    title: 'Faça login na CodeCraft',
    description: 'Aumente sua produtividade e concentre-se no crescimento.',
    social: 'Continuar com o Google',
    separator: 'ou',
    fields: {
      emailLabel: 'E-mail',
      emailPlaceholder: 'seu@email.com',
      passwordLabel: 'Senha',
      passwordPlaceholder: '••••••••',
    },
    submit: 'Entrar',
    forgot: {
      question: 'Esqueceu a senha?',
      link: '/forgot-password',
    },
    actions: {
      question: 'Novo na CodeCraft?',
      label: 'Criar conta',
      link: '/sign-up',
    },
  },
  signUp: {
    title: 'Criar conta gratuita',
    description: 'Explore os principais recursos da CodeCraft.',
    social: 'Continuar com o Google',
    separator: 'ou',
    fields: {
      emailLabel: 'E-mail',
      emailPlaceholder: 'seu@email.com',
      passwordLabel: 'Senha',
      passwordPlaceholder: '••••••••',
      confirmPasswordLabel: 'Confirmar senha',
      confirmPasswordPlaceholder: '••••••••',
    },
    submit: 'Cadastrar',
    actions: {
      question: 'Já tem uma conta?',
      label: 'Entrar',
      link: '/sign-in',
    },
  },
  forgotPassword: {
    title: 'Redefinir senha',
    description: 'Digite o endereço de e-mail verificado da sua conta de usuário e lhe enviaremos um link para redefinição de senha.',
    message: 'Verifique seu e-mail em busca de um link para redefinir sua senha. Se não aparecer dentro de alguns minutos, verifique sua pasta de spam.',
    fields: {
      emailLabel: 'E-mail',
      emailPlaceholder: 'seu@email.com',
    },
    submit: 'Enviar',
    actions: {
      question: '',
      label: 'Voltar ao início',
      link: '/sign-in',
    },
  },
  updatePassword: {
    title: 'Atualizar senha',
    description: 'Escolha uma nova senha com no mínimo 8 caracteres, incluindo letras e números.',
    fields: {
      passwordLabel: 'Nova senha',
      passwordPlaceholder: '••••••••',
      confirmPasswordLabel: 'Confirmar nova senha',
      confirmPasswordPlaceholder: '••••••••',
    },
    submit: 'Atualizar',
    actions: {
      question: '',
      label: 'Voltar ao início',
      link: '/sign-in',
    },
  },
} as const
