// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: "https://shivamfabricon.in",
  integrations: [react(), tailwind(), vercel(), sitemap()],
  server: {
    host: true, 
  }
});