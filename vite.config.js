// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Semester_project_2/',
  root: './',
  build: {
    outDir: 'dist',
  },
  server: {
    port: 8080,
    historyApiFallback: true, // Ensure proper routing for SPAs
  },
  preview: {
    port: 8080,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
