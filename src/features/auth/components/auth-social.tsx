// src/features/auth/components/auth-social.tsx
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { GoogleLogoIcon } from '@phosphor-icons/react'

interface AuthSocialProps {
  text: string
  separatorText: string
  isPending: boolean
  onGoogleClick: () => void
}

export const AuthSocial = ({ text, separatorText, isPending, onGoogleClick }: AuthSocialProps) => (
  <>
    <Button
      onClick={onGoogleClick}
      disabled={isPending}
      variant='secondary'
      className='w-full'>
      <GoogleLogoIcon />
      {text}
    </Button>
    <div className='flex items-center justify-center gap-2 overflow-hidden'>
      <Separator className='shrink' />
      <span className='text-sm text-muted-foreground min-w-fit'>{separatorText}</span>
      <Separator className='shrink' />
    </div>
  </>
)
