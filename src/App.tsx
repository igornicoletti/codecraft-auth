import { RouterProvider } from 'react-router-dom'

import { AppProvider } from '@/app/providers'
import { router } from '@/app/router'

export const App = () => (
  <AppProvider>
    <RouterProvider router={router} />
  </AppProvider>
)
