import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['@ionic/react', '@ionic/react-router', 'ionicons']
  },
  server: {
    port: 5174,
    host: true
  }
});
