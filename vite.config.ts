import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api-gamer': {
        target: 'https://www.gamerpower.com/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-gamer/, ''),
      },
    },
  },
})
