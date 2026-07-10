import { siteConfig } from '../../site.config.js';
import { getAllPosts, getCategories, getPostUrl, getTags, normalizePathSegment } from '../lib/posts';

export async function GET() {
  const posts = await getAllPosts();
  const categories = getCategories(posts);
  const tags = getTags(posts);
  const paths = [
    '/',
    '/posts/',
    '/about/',
    '/contact/',
    ...posts.map((post) => getPostUrl(post.data.slug)),
    ...categories.map((category) => `/category/${normalizePathSegment(category)}/`),
    ...tags.map((tag) => `/tag/${normalizePathSegment(tag)}/`)
  ];

  const urls = paths
    .map((path) => `  <url><loc>${new URL(path, siteConfig.siteUrl).toString()}</loc></url>`)
    .join('\n');

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
}
