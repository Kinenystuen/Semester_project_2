import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/Semester_project_2/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        auctions: resolve(__dirname, 'html/pages/auctions.html'),
        profiles: resolve(__dirname, 'html/pages/profiles.html'),
        profile: resolve(__dirname, 'html/pages/profile.html'),
        listingitem: resolve(__dirname, 'html/pages/listingitem.html'),
        login: resolve(__dirname, 'html/auth/login.html'),
        signup: resolve(__dirname, 'html/auth/signup.html'),
      },
    },
  },
  server: {
    port: 8080,
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
