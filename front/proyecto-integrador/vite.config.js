import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // PROXY: todo lo que el front pida a /api lo reenvia Vite al back (puerto 3000).
  // Para el navegador es el mismo origen (localhost:5173), asi que no hace falta
  // CORS en el back mientras desarrollamos. En produccion el back SI necesita cors().
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
