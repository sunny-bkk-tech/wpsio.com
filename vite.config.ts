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
    rollupOptions: {
      output: {
        // Code splitting for better performance
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'utils': ['./src/utils/apiLogger.ts', './src/utils/useSEO.ts'],
        },
        // Optimize chunk file naming
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000,
  }
})
