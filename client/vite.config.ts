import path from 'node:path'

import tailwindcss from '@tailwindcss/vite'
// import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // alias: [
    //   {
    //     find: 'shared',
    //     replacement: fileURLToPath(new URL('../shared', import.meta.url)),
    //   },
    //   {
    //     find: '@',
    //     replacement: fileURLToPath(new URL('./src', import.meta.url)),
    //   },
    // ],
    alias: {
      shared: path.resolve(__dirname, '../shared'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
