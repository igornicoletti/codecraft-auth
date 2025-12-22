import { router } from '@/features/route/router.client'
import '@/index.css'
import { AuthProvider } from '@/providers/auth-provider'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

ReactDOM.hydrateRoot(document.getElementById('root')!,
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)
