import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { siteConfig } from './site.config.js';

export default defineConfig({
  site: siteConfig.siteUrl,
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/naver-site-verification.html')
    })
  ]
});
