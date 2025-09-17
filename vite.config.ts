import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    base: '/ExpenseTracker/',
    optimizeDeps: {
      include: ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/analytics']
    },
    define: {
      global: 'globalThis',
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
    }
  }
})
