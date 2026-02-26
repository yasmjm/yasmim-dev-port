import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Isso permite que você use '@' para se referir à pasta raiz do projeto
      '@': path.resolve(__dirname, './'),
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
});