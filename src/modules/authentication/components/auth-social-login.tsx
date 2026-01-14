import { GoogleLogoIcon } from '@phosphor-icons/react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export interface AuthSocialLoginProps {
  text?: string
  separatorText?: string
  isPending?: boolean
  onGoogleClick?: () => Promise<void>
}

export const AuthSocialLogin = ({ text, separatorText, isPending = false, onGoogleClick }: AuthSocialLoginProps) => (
  <div className='grid gap-6'>
    <Button
      type='button'
      variant='secondary'
      disabled={isPending}
      aria-busy={isPending}
      onClick={onGoogleClick}>
      <GoogleLogoIcon />
      {text}
    </Button>
    <div className='flex items-center gap-4'>
      <Separator className='flex-1' />
      <span className='text-sm text-muted-foreground'>{separatorText}</span>
      <Separator className='flex-1' />
    </div>
  </div>
)
