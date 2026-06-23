import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://fables.ryanzhu.dev',
  output: 'static',
  server: { host: '127.0.0.1', port: 4322 },
  vite: {
    build: { cssCodeSplit: true },
  },
});
