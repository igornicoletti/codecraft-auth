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
    ssr: 'src/entry.server.tsx',
    outDir: 'dist',
    rollupOptions: {
      input: {
        client: path.resolve(__dirname, 'src/entry.client.tsx'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
  ssr: {
    noExternal: ['@supabase/ssr', '@supabase/supabase-js'],
  },
})
