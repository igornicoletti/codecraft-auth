import { Link } from "react-router-dom"

import { Button } from '@/components/ui/button'

export const NotFoundPage = () => {
  return (
    <div className='grid min-h-screen grid-cols-1 lg:grid-cols-2'>
      <div className='flex flex-col items-center justify-center px-4 py-8 text-center'>
        <h2 className='mb-6 text-5xl font-semibold'>Whoops!</h2>
        <h3 className='mb-1.5 text-3xl font-semibold'>Something went wrong</h3>
        <p className='text-muted-foreground mb-6 max-w-sm'>
          The page you&apos;re looking for isn&apos;t found, we suggest you back to home.
        </p>
        <Button asChild size='lg'>
          <Link to='/'>Back to home page</Link>
        </Button>
      </div>
    </div>
  )
}
