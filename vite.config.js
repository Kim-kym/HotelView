import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {  // 🔥 '/api'로 시작하는 요청을 자동으로 변환
        target: 'http://localhost:8050',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '') // '/api' 제거 후 요청 전송
      }
    }
  }
});
