import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        manualChunks(id) {
          const normalizedId = id.replace(/\\/g, '/');
          if (normalizedId.includes('/node_modules/react/') || normalizedId.includes('/node_modules/react-dom/')) {
            return 'react-vendor';
          }
          if (normalizedId.includes('/node_modules/lucide-react/')) {
            return 'icons-vendor';
          }
          if (normalizedId.includes('/node_modules/')) {
            return 'vendor';
          }
        },
      },
    },
  },
});
