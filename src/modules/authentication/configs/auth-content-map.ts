import { ROUTE_PATHS } from '@/routes/configs/route-paths'

export const AUTH_CONTENT_MAP = {
  signIn: {
    title: ' Faça login na CodeCraft',
    description: 'Envie mais rápido e concentre-se no crescimento',
    social: 'Faça login com o Google',
    separator: 'ou',
    fields: {
      emailLabel: 'E-mail',
      emailPlaceholder: 'seu@email.com',
      passwordLabel: 'Senha',
      passwordPlaceholder: '••••••••',
    },
    submit: 'Faça login na CodeCraft',
    forgot: {
      question: 'Esqueceu sua senha?',
      link: ROUTE_PATHS.AUTH.FORGOT_PASSWORD,
    },
    actions: {
      question: 'Novo em nossa plataforma?',
      label: 'Inscreva-se',
      link: ROUTE_PATHS.AUTH.SIGN_UP,
    },
  },
  signUp: {
    title: 'Inscreva-se na CodeCraft',
    customTitle: 'Verifique seu e-mail',
    description: 'Explore os principais recursos da nossa plataforma.',
    customDescription: 'Um e-mail de verificação foi enviado para o endereço fornecido. Verifique sua caixa de entrada e spam.',
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
    submit: 'Inscreva-se na CodeCraft',
    actions: {
      question: 'Já tem uma conta?',
      label: 'Entrar',
      link: ROUTE_PATHS.AUTH.SIGN_IN,
    },
  },
  forgotPassword: {
    title: 'Esqueceu sua senha?',
    customTitle: 'Verifique seu e-mail',
    description: 'Sem problemas. Informe seu e-mail abaixo e enviaremos um link para redefinir sua senha.',
    customDescription: 'Um e-mail de redefinição de senha será enviado se houver uma conta associada ao endereço fornecido. Verifique sua caixa de entrada e spam.',
    fields: {
      emailLabel: 'E-mail',
      emailPlaceholder: 'seu@email.com',
    },
    submit: 'Enviar link de redefinição',
    actions: {
      question: 'Lembrou sua senha?',
      label: 'Entrar',
      link: ROUTE_PATHS.AUTH.SIGN_IN,
    },
  },
  updatePassword: {
    title: 'Redefinir sua senha',
    description: 'Escolha uma nova senha para sua conta com no mínimo 8 caracteres, incluindo letras e números.',
    fields: {
      passwordLabel: 'Nova senha',
      passwordPlaceholder: '••••••••',
      confirmPasswordLabel: 'Confirmar nova senha',
      confirmPasswordPlaceholder: '••••••••',
    },
    submit: 'Redefinir senha',
    actions: {
      question: 'Lembrou sua senha?',
      label: 'Entrar',
      link: ROUTE_PATHS.AUTH.SIGN_IN,
    },
  },
} satisfies Record<string, any>
