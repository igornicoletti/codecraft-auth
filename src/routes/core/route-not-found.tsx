import { Link } from 'react-router-dom'

export const RouteNotFound = () => (
  <main className='flex min-h-svh flex-col p-6'>
    <div className='flex flex-1 items-center justify-center'>
      <h1 className='text-nowrap'>Página não encontrada</h1>
      <div className='ml-4 pl-4 border-l-2'>
        <p className='text-sm text-muted-foreground'>
          A página que você está procurando não existe. Volte para a{' '}
          <Link to='/' className='text-primary underline-offset-4 hover:underline'>
            página inicial
          </Link>
        </p>
      </div>
    </div>
  </main>
)
