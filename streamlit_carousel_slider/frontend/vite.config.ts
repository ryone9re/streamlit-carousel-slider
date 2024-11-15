import react from '@vitejs/plugin-react-swc';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: { host: "127.0.0.1" },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer]
    }
  }
})
