import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  base: '/snake-game/',  
  plugins: [react()],
  resolve: {
    alias: {
      '@pkg': path.resolve(__dirname, '../pkg'),
    },
  },
  server: {
    fs: {
      allow: ['..'] // permite importar desde fuera del root
    }
  }
})
