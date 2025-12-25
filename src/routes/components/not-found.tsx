// src/routes/components/not-found.tsx
import { Link } from 'react-router-dom'

export const NotFoundPage = () => {
  return (
    <main className='grid min-h-svh place-content-center p-6'>
      <div className='flex flex-wrap items-center gap-4'>
        <h1 className='text-nowrap'>Página não encontrada</h1>
        <div className='border-l-2 pl-4'>
          <p className='text-sm text-muted-foreground'>
            A página que você está procurando não foi encontrada, sugerimos que você{' '}
            <Link to='/' className='text-primary underline-offset-4 hover:underline'>
              voltar para a página inicial.
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
