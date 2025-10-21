import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Use absolute paths so deep links load assets correctly
  server: {
    port: 8081, // Changed port to avoid conflict with our backend server
    host: '0.0.0.0', // Listen on all interfaces for IP access
    proxy: {
      // Proxy API requests to our logging server in development
      '/api': {
        target: 'http://localhost:8080', // The address of our logging server
        changeOrigin: true,
      },
    },
    fs: {
      allow: ['..']
    },
    middlewareMode: false
  },
  publicDir: 'public',
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg', '**/*.webp'],
  define: {
    global: 'globalThis',
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    target: 'esnext',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Aggressive code splitting for better INP performance
        manualChunks: (id) => {
          // Split vendor chunks by package
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            if (id.includes('scheduler')) {
              return 'react-vendor';
            }
            // Other node_modules go into separate vendor chunk
            return 'vendor';
          }
          // Split by route/page
          if (id.includes('src/pages/')) {
            const pageName = id.split('src/pages/')[1].split('.')[0];
            return `page-${pageName.toLowerCase()}`;
          }
          // Split utilities
          if (id.includes('src/utils/')) {
            return 'utils';
          }
          // Split components
          if (id.includes('src/components/')) {
            return 'components';
          }
        },
        // Optimize chunk file naming for better caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 500,
    // Minify options for better compression
    cssMinify: true,
  }
})
