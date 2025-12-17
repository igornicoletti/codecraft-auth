import { RouterProvider } from 'react-router-dom'

import { AppProvider } from '@/providers'
import { router } from '@/router'

export const App = () => (
  <AppProvider>
    <RouterProvider router={router} />
  </AppProvider>
)
