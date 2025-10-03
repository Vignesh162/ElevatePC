import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    host: true,   // expose to network
    port: 3000,   // run on port 3000
    strictPort: true,
    allowedHosts: [
      '2d0affb4ca2a.ngrok-free.app' // 👈 add your ngrok domain here
    ],
    hmr: {
      host: 'bb18444c9f64.ngrok-free.app ',
      clientPort: 443,
    }
  }
})
