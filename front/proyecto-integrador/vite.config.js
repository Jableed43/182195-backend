import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // loadEnv lee los .env Y las variables del entorno (que es como las pasa Vercel)
  const env = loadEnv(mode, process.cwd(), "")

  // ⚠️ Sin esto, si falta VITE_API_URL el build sale BIEN y todos los fetch van
  //    a "undefinedlibros": la página desplegada no carga nada y no hay error
  //    en ningún lado. Mejor que falle el deploy, con el motivo escrito.
  if (!env.VITE_API_URL) {
    throw new Error(
      "\n\n  Falta VITE_API_URL.\n" +
      "  · En tu máquina: copiá .env.example a .env\n" +
      "  · En Vercel: Settings → Environment Variables\n"
    )
  }

  return {
    plugins: [react()],
    // PROXY: todo lo que el front pida a /api lo reenvia Vite al back (puerto 3000).
    // Para el navegador es el mismo origen (localhost:5173), asi que no hace falta
    // CORS en el back mientras desarrollamos. En produccion el back SI necesita cors().
    server: {
      proxy: {
        '/api': 'http://localhost:3000',
      },
    },
  }
})
