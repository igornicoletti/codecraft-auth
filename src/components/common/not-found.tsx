import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { LineShadowText } from '@/components/ui/line-shadow-text'

export const NotFoundPage = () => (
  <div className='min-h-screen flex flex-col items-center justify-center px-4 py-8'>
    <div className='text-center space-y-6'>
      <h1 className='text-6xl font-semibold leading-none text-primary tracking-tighter'>
        <LineShadowText>Whoops!</LineShadowText>
      </h1>
      <p className='text-sm text-muted-foreground'>
        The page you&apos;re looking for isn&apos;t found, we suggest you back to home
      </p>
      <Button asChild variant='link'>
        <Link to='/'>Back to home page</Link>
      </Button>
    </div>
  </div>
)
