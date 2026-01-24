import type { AuthContentMap } from '@/modules/authentication/types/auth-content.types'
import { ROUTE_PATHS } from '@/routes/configs/route-paths'

export const AUTH_CONTENT_MAP: AuthContentMap = {
  signIn: {
    title: 'Acesse sua conta CodeCraft',
    description: 'Conecte-se à sua conta para acessar os recursos da plataforma.',
    social: 'Continuar com Google',
    submit: 'Acessar conta',
    separator: 'ou',
    fields: {
      emailLabel: 'Endereço de e-mail',
      emailPlaceholder: 'seu@email.com',
      passwordLabel: 'Senha',
      passwordPlaceholder: 'Digite sua senha',
    },
    forgot: {
      text: 'Esqueceu sua senha?',
      link: ROUTE_PATHS.AUTH.FORGOT_PASSWORD,
    },
    actions: {
      text: 'Não possui uma conta?',
      label: 'Cadastre-se agora',
      link: ROUTE_PATHS.AUTH.SIGN_UP,
    },
  },
  signUp: {
    title: 'Crie sua conta CodeCraft',
    description: 'Registre-se e comece a utilizar todos os recursos disponíveis.',
    social: 'Cadastrar com Google',
    submit: 'Criar minha conta',
    separator: 'ou',
    fields: {
      emailLabel: 'Endereço de e-mail',
      emailPlaceholder: 'seu@email.com',
      passwordLabel: 'Senha',
      passwordPlaceholder: 'Mínimo 8 caracteres',
      confirmPasswordLabel: 'Confirmar senha',
      confirmPasswordPlaceholder: 'Repita sua senha',
    },
    actions: {
      text: 'Já possui uma conta?',
      label: 'Faça login',
      link: ROUTE_PATHS.AUTH.SIGN_IN,
    },
  },
  verifyEmail: {
    title: 'Verifique seu e-mail',
    description: 'Digite o código de 6 dígitos enviado para o endereço de e-mail.',
    submit: 'Confirmar código',
    fields: {
      otpLabel: 'Código de verificação',
    },
    resend: {
      text: 'Não recebeu o código?',
      label: 'Reenviar',
    },
    actions: {
      text: 'Utilizou o e-mail incorreto?',
      label: 'Retornar ao login',
      link: ROUTE_PATHS.AUTH.SIGN_IN,
    },
  },
  forgotPassword: {
    title: 'Redefinir sua senha',
    description: 'Informe seu endereço de e-mail para receber instruções de redefinição de senha.',
    submit: 'Enviar instruções',
    fields: {
      emailLabel: 'Endereço de e-mail',
      emailPlaceholder: 'seu@email.com',
    },
    actions: {
      text: 'Lembrou sua senha?',
      label: 'Voltar ao login',
      link: ROUTE_PATHS.AUTH.SIGN_IN,
    },
  },
  updatePassword: {
    title: 'Criar uma nova senha',
    description: 'Defina uma senha forte para proteger sua conta. Use letras, números e caracteres especiais.',
    submit: 'Atualizar senha',
    fields: {
      passwordLabel: 'Nova senha',
      passwordPlaceholder: 'Mínimo 8 caracteres',
      confirmPasswordLabel: 'Confirmar nova senha',
      confirmPasswordPlaceholder: 'Repita sua senha',
    },
    actions: {
      text: 'Deseja',
      label: 'voltar ao login',
      link: ROUTE_PATHS.AUTH.SIGN_IN,
    },
  },
}
