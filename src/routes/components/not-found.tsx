// src/routes/components/not-found.tsx
import { Link } from 'react-router-dom'

export const NotFoundPage = () => {
  return (
    <main className='grid min-h-svh place-content-center p-4'>
      <div className='flex items-center gap-4 md:gap-6'>
        <h1 className='text-xl tracking-tight text-nowrap'>Page Not Found</h1>
        <div className='border-l-2 pl-4 md:pl-6'>
          <p className='max-w-xs text-sm text-muted-foreground'>
            The page you&apos;re looking for isn&apos;t found, we suggest you{' '}
            <Link to='/' className='text-primary underline underline-offset-4'>
              back to home page
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
