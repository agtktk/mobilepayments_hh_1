import { siteConfig } from '../../site.config.js';

export function GET() {
  return new Response(
    `User-agent: *
Allow: /
Sitemap: ${new URL('/sitemap-index.xml', siteConfig.siteUrl).toString()}
Sitemap: ${new URL('/sitemap.xml', siteConfig.siteUrl).toString()}
`,
    {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8'
      }
    }
  );
}
