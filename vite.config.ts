import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    outDir: 'dist',
    ssr: 'src/entry.server.tsx',
    rollupOptions: {
      input: {
        client: path.resolve(__dirname, 'src/entry.client.tsx'),
      },
      output: {
        entryFileNames: 'entry.server.js',
      },
    },
  },

  ssr: {
    noExternal: ['@supabase/ssr', '@supabase/supabase-js'],
  },

  optimizeDeps: {
    include: ['@supabase/ssr', '@supabase/supabase-js'],
  },
})
